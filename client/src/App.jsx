import React, { useState, useEffect, useRef } from "react";
import { getAvatarSVG } from "./utils/avatars";
import { playSound } from "./utils/synth";

const API_BASE_URL = "https://leet-code-gamification.vercel.app/api";

export default function App() {
  // Authentication state
  const [token, setToken] = useState(
    localStorage.getItem("lc_rpg_token") || null,
  );
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'register'
  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [authError, setAuthError] = useState(null);

  // App settings & Game State
  const [soundEnabled, setSoundEnabled] = useState(
    localStorage.getItem("lc_rpg_sound_enabled") !== "false",
  );
  const [progression, setProgression] = useState(null);
  const [quests, setQuests] = useState([]);
  const [categories, setCategories] = useState([]);

  // Syncing state
  const [leetcodeInput, setLeetcodeInput] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [syncStatusText, setSyncStatusText] = useState("");

  // Filters state
  const [filters, setFilters] = useState({
    search: "",
    difficulty: "ALL",
    category: "ALL",
  });

  // UI animations and overlays
  const [toasts, setToasts] = useState([]);
  const [floatingXPs, setFloatingXPs] = useState([]);
  const [levelUpData, setLevelUpData] = useState(null); // { level, rank }

  // Refs for tracking elements coordinates
  const syncBtnRef = useRef(null);

  // 1. Toast Notification system
  const addToast = (symbol, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, symbol, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  // 2. Floating XP Animation system
  const triggerFloatingXP = (amount) => {
    if (!syncBtnRef.current) return;
    const rect = syncBtnRef.current.getBoundingClientRect();
    const id = Date.now() + Math.random();

    // Position relative to window
    const newXP = {
      id,
      amount,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    };

    setFloatingXPs((prev) => [...prev, newXP]);
    setTimeout(() => {
      setFloatingXPs((prev) => prev.filter((xp) => xp.id !== id));
    }, 1000);
  };

  // 3. Audio toggle helper
  const handleSoundToggle = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    localStorage.setItem("lc_rpg_sound_enabled", String(nextVal));
    playSound("check", nextVal);
  };

  // 4. Fetch core data once authenticated
  const fetchGameData = async (authToken) => {
    try {
      const headers = { Authorization: `Bearer ${authToken}` };

      // Get profile info
      const meRes = await fetch(`${API_BASE_URL}/auth/me`, { headers });
      const meData = await meRes.json();
      if (!meRes.ok) throw new Error(meData.message);
      setUser(meData.user);

      // Get progression details
      const progRes = await fetch(`${API_BASE_URL}/progression`, { headers });
      const progData = await progRes.json();
      if (progRes.ok) {
        setProgression(progData.progression);
      }

      // Get verified cleared quests
      const probRes = await fetch(`${API_BASE_URL}/progression/solved`, {
        headers,
      });
      const probData = await probRes.json();
      if (probRes.ok) {
        setQuests(probData.quests);

        // Extract categories/topics from solved quests
        const cats = new Set();
        probData.quests.forEach((q) => {
          if (q.topics) {
            q.topics.forEach((t) => cats.add(t));
          }
        });
        setCategories(Array.from(cats).sort());
      }
    } catch (err) {
      console.error("Fetch data failed:", err.message);
      addToast("⚠️", "Failed to retrieve adventure log from archives.");
    }
  };

  // Initialize
  useEffect(() => {
    if (token) {
      fetchGameData(token);
    }
  }, [token]);

  // 5. Auth Handlers
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    try {
      const endpoint = authMode === "login" ? "/auth/login" : "/auth/register";
      const body =
        authMode === "login"
          ? { email: authForm.email, password: authForm.password }
          : {
              email: authForm.email,
              password: authForm.password,
              username: authForm.username,
            };

      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Authentication failed");

      localStorage.setItem("lc_rpg_token", data.token);
      setToken(data.token);
      setUser(data.user);
      addToast("🛡️", `WELCOME BACK, ${data.user.username.toUpperCase()}!`);
      playSound("check", soundEnabled);
    } catch (err) {
      setAuthError(err.message);
      playSound("uncheck", soundEnabled);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("lc_rpg_token");
    setToken(null);
    setUser(null);
    setProgression(null);
    setProblems([]);
    addToast("↩️", "LOGGED OUT. ADVENTURE PAUSED.");
    playSound("uncheck", soundEnabled);
  };

  // 6. Connect LeetCode profile
  const handleConnectLeetcode = async (e) => {
    e.preventDefault();
    if (!leetcodeInput.trim()) return;

    setSyncing(true);
    setSyncStatusText("VERIFYING ACCOUNT...");
    try {
      const res = await fetch(`${API_BASE_URL}/leetcode/connect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ leetcodeUsername: leetcodeInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      addToast("🏆", "LEETCODE PROFILE CONNECTED!");
      playSound("check", soundEnabled);
      fetchGameData(token); // refresh
    } catch (err) {
      addToast("⚠️", err.message);
      playSound("uncheck", soundEnabled);
    } finally {
      setSyncing(false);
      setSyncStatusText("");
    }
  };

  // 7. Sync LeetCode progression records
  const handleSyncProfile = async () => {
    if (syncing) return;
    setSyncing(true);
    setSyncStatusText("RETRIEVING SUBMISSIONS...");
    try {
      const res = await fetch(`${API_BASE_URL}/leetcode/sync`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      if (data.xpGained > 0) {
        triggerFloatingXP(data.xpGained);
        addToast("⚡", `SYNCED! +${data.xpGained} XP awarded!`);

        // Play levelup if triggered
        if (data.levelUp) {
          setLevelUpData({
            level: data.currentLevel,
            rank: data.syncedProblems[0]?.title || "ALGORITHM SCOUT",
          });
          playSound("levelup", soundEnabled);
        } else {
          playSound("check", soundEnabled);
        }
      } else {
        addToast("🔍", "NO NEW SOLVED PROBLEMS DETECTED.");
        playSound("check", soundEnabled);
      }

      fetchGameData(token);
    } catch (err) {
      addToast("⚠️", err.message);
      playSound("uncheck", soundEnabled);
    } finally {
      setSyncing(false);
      setSyncStatusText("");
    }
  };

  // 8. Reset Progress
  const handleResetProgress = async () => {
    if (
      window.confirm(
        "⚠️ WARNING: This will permanently wipe all completed quests, XP, level, and LeetCode link history. Do you wish to proceed?",
      )
    ) {
      try {
        const res = await fetch(`${API_BASE_URL}/progression/reset`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        addToast("⚙️", "QUEST LOG SCRUBBED. DATABASE HAS RESET.");
        playSound("uncheck", soundEnabled);
        fetchGameData(token);
      } catch (err) {
        addToast("⚠️", err.message);
      }
    }
  };

  // 9. Apply Filters locally to verified quests array
  const filteredQuests = quests.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      q.frontendQuestionId.toString() === filters.search;
    const matchesDifficulty =
      filters.difficulty === "ALL" || q.difficulty === filters.difficulty;

    // Check if category/topic filter matches any tag in q.topics
    const matchesCategory =
      filters.category === "ALL" ||
      (q.topics && q.topics.includes(filters.category));

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const resetAllFilters = () => {
    setFilters({
      search: "",
      difficulty: "ALL",
      category: "ALL",
    });
  };

  // Render Login/Register screen if not authenticated
  if (!token) {
    return (
      <div
        className="app-shell"
        style={{ maxWidth: "480px", marginTop: "40px" }}
      >
        <header className="app-header pixel-border">
          <div className="brand-title">
            <h1>ALGO QUEST</h1>
            <p className="tagline">LeetCode Retro RPG Journey</p>
          </div>
        </header>

        <div className="dashboard-card pixel-border">
          <div className="card-header">
            {authMode === "login" ? "USER LOGIN" : "CREATE ACCOUNT"}
          </div>
          <div className="card-content">
            <form onSubmit={handleAuthSubmit}>
              {authMode === "register" && (
                <div style={{ marginBottom: "12px" }}>
                  <label className="pixel-label">TRAINER NAME</label>
                  <input
                    type="text"
                    className="pixel-input"
                    value={authForm.username}
                    onChange={(e) =>
                      setAuthForm((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    placeholder="Enter display username..."
                    required
                  />
                </div>
              )}

              <div style={{ marginBottom: "12px" }}>
                <label className="pixel-label">EMAIL ADDRESS</label>
                <input
                  type="email"
                  className="pixel-input"
                  value={authForm.email}
                  onChange={(e) =>
                    setAuthForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Enter email..."
                  required
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label className="pixel-label">PASSWORD</label>
                <input
                  type="password"
                  className="pixel-input"
                  value={authForm.password}
                  onChange={(e) =>
                    setAuthForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="Enter password..."
                  required
                />
              </div>

              {authError && (
                <div
                  style={{
                    color: "#ff003c",
                    fontFamily: "Share Tech Mono",
                    marginBottom: "12px",
                    fontSize: "14px",
                  }}
                >
                  ❌ ERROR: {authError.toUpperCase()}
                </div>
              )}

              <button
                type="submit"
                className="pixel-btn"
                style={{ width: "100%", fontSize: "12px", padding: "10px" }}
              >
                {authMode === "login"
                  ? "ENTER THE ARCHIVES"
                  : "START QUEST JOURNEY"}
              </button>
            </form>

            <hr className="pixel-divider" style={{ margin: "16px 0" }} />

            <div
              style={{
                textAlign: "center",
                fontSize: "13px",
                fontFamily: "Share Tech Mono",
              }}
            >
              {authMode === "login" ? (
                <>
                  New adventurer?{" "}
                  <span
                    onClick={() => {
                      setAuthMode("register");
                      setAuthError(null);
                    }}
                    style={{
                      color: "var(--color-secondary)",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Register here
                  </span>
                </>
              ) : (
                <>
                  Already registered?{" "}
                  <span
                    onClick={() => {
                      setAuthMode("login");
                      setAuthError(null);
                    }}
                    style={{
                      color: "var(--color-secondary)",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Login here
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      {/* Toast Notification Container */}
      <div id="toast-container" className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast pixel-border">
            <span className="toast-symbol">{t.symbol}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Floating XP Container */}
      <div id="floating-xp-container" className="floating-xp-container">
        {floatingXPs.map((xp) => (
          <div
            key={xp.id}
            className="floating-xp positive"
            style={{ left: `${xp.x}px`, top: `${xp.y}px` }}
          >
            +{xp.amount} XP
          </div>
        ))}
      </div>

      {/* Header Panel */}
      <header className="app-header pixel-border">
        <div className="brand-title">
          <h1>ALGO QUEST</h1>
          <p className="tagline">LeetCode Retro RPG Journey</p>
        </div>
        <div className="header-controls">
          <button
            onClick={handleSoundToggle}
            className="sound-btn pixel-btn"
            aria-label="Toggle Sound"
          >
            {soundEnabled ? "🔊 SOUND ON" : "🔇 SOUND MUTED"}
          </button>
          {/* <button onClick={handleLogout} className="reset-btn pixel-btn" aria-label="Logout">
            PAUSE QUEST
          </button> */}
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="app-content-grid">
        {/* LEFT COLUMN: Profile HUD */}
        <aside className="sidebar-section" aria-label="Player Profile">
          {/* HUD Trainer Card */}
          <div className="dashboard-card pixel-border">
            <div className="card-header">TRAINER CARD</div>
            <div className="card-content">
              <div className="avatar-container">
                <div className="avatar-sprite">
                  {progression && getAvatarSVG(progression.rank)}
                </div>
              </div>

              <div className="trainer-details">
                <div className="trainer-name-row">
                  <span className="label">NAME:</span>
                  <span
                    className="value"
                    style={{ textTransform: "uppercase" }}
                  >
                    {user?.username || "ADVENTURER"}
                  </span>
                </div>
                <div className="trainer-rank-row">
                  <span className="label">RANK:</span>
                  <span className="value rank-text">
                    {progression?.rank || "ROOKIE CODER"}
                  </span>
                </div>
                <div className="trainer-level-row">
                  <span className="label">LEVEL:</span>
                  <span className="level-badge">
                    LV. {progression?.level || 1}
                  </span>
                </div>
              </div>

              {/* XP Progress Bar */}
              <div className="xp-bar-wrapper">
                <div className="xp-labels">
                  <span>EXP</span>
                  <span className="tech-font">
                    {progression
                      ? `${progression.xpEarnedInLevel} / ${progression.xpRequiredForNextLevel} XP`
                      : "0 / 50 XP"}
                  </span>
                </div>
                <div className="pixel-progress-bar">
                  <div
                    className="pixel-progress-fill"
                    style={{ width: `${progression?.percent || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Attributes Card */}
          <div className="dashboard-card pixel-border">
            <div className="card-header">ATTRIBUTES</div>
            <div className="card-content stats-list">
              <div className="stat-item">
                <span className="stat-label">QUESTS:</span>
                <div className="stat-value-group">
                  <span className="tech-font">
                    {progression ? `${progression.stats.totalCleared} ` : "0"}
                  </span>
                  <span className="tech-font stat-subtext">
                    (
                    {progression && progression.stats.grandTotal > 0
                      ? Math.round(
                          (progression.stats.totalCleared /
                            progression.stats.grandTotal) *
                            100,
                        )
                      : 0}
                    %)
                  </span>
                </div>
              </div>
              <div className="pixel-progress-bar min-bar">
                <div
                  className="pixel-progress-fill quests-color"
                  style={{
                    width: `${
                      progression && progression.stats.grandTotal > 0
                        ? (progression.stats.totalCleared /
                            progression.stats.grandTotal) *
                          100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>

              <div className="stat-item streak-item">
                <span className="stat-label">STREAK:</span>
                <span
                  className={`tech-font ${progression?.streak > 0 ? "active-streak" : ""}`}
                >
                  🔥 {progression?.streak || 0} DAY
                  {progression?.streak === 1 ? "" : "S"}
                </span>
              </div>

              <hr className="pixel-divider" />

              <div className="stat-sub-grid">
                <div className="difficulty-stat easy">
                  <span className="diff-title">EASY</span>
                  <span className="tech-font">
                    {progression ? `${progression.stats.easyCleared} ` : "0"}
                  </span>
                </div>
                <div className="difficulty-stat medium">
                  <span className="diff-title">MEDIUM</span>
                  <span className="tech-font">
                    {progression ? `${progression.stats.mediumCleared}` : "0"}
                  </span>
                </div>
                <div className="difficulty-stat hard">
                  <span className="diff-title">HARD</span>
                  <span className="tech-font">
                    {progression ? `${progression.stats.hardCleared}` : "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Connect & Sync LeetCode */}
          <div className="dashboard-card pixel-border">
            <div className="card-header">LEETCODE SYNC</div>
            <div className="card-content">
              {user?.leetcode?.username ? (
                <div>
                  <div
                    style={{
                      fontFamily: "Share Tech Mono",
                      fontSize: "14px",
                      marginBottom: "8px",
                    }}
                  >
                    LINKED ID:{" "}
                    <span
                      style={{
                        color: "var(--color-primary)",
                        fontWeight: "bold",
                      }}
                    >
                      {user.leetcode.username}
                    </span>
                  </div>
                  <button
                    ref={syncBtnRef}
                    onClick={handleSyncProfile}
                    className="pixel-btn sound-btn"
                    style={{ width: "100%", marginBottom: "8px" }}
                    disabled={syncing}
                  >
                    {syncing ? syncStatusText : "🔁 SYNC RECORDS"}
                  </button>
                  {user.leetcode.lastSyncedAt && (
                    <div
                      style={{
                        fontFamily: "Share Tech Mono",
                        fontSize: "11px",
                        color: "var(--color-text-gray)",
                        textAlign: "center",
                      }}
                    >
                      LAST SYNC:{" "}
                      {new Date(
                        user.leetcode.lastSyncedAt,
                      ).toLocaleTimeString()}
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleConnectLeetcode}>
                  <label className="pixel-label">LINK PROFILE USERNAME</label>
                  <input
                    type="text"
                    className="pixel-input"
                    value={leetcodeInput}
                    onChange={(e) => setLeetcodeInput(e.target.value)}
                    placeholder="Enter LeetCode username..."
                    disabled={syncing}
                    required
                    style={{ marginBottom: "8px" }}
                  />
                  <button
                    type="submit"
                    className="pixel-btn"
                    style={{ width: "100%" }}
                    disabled={syncing}
                  >
                    {syncing ? "VERIFYING..." : "⚔️ CONNECT PROFILE"}
                  </button>
                </form>
              )}

              <hr className="pixel-divider" style={{ margin: "12px 0" }} />

              {/* <button 
                onClick={handleResetProgress} 
                className="pixel-btn reset-btn" 
                style={{ width: '100%', padding: '6px', fontSize: '8px' }}
              >
                RESET ADVENTURE
              </button> */}
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: Quest Filters & Cards */}
        <main className="main-section" aria-label="Quest Tracker">
          {/* Filters Card */}
          <div className="dashboard-card pixel-border">
            <div className="card-header">QUEST FILTERS</div>
            <div className="card-content filters-grid">
              <div className="filter-group search-group">
                <label className="pixel-label">SEARCH QUEST</label>
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    className="pixel-input"
                    placeholder="Search by ID or Title..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                  />
                  {filters.search && (
                    <button
                      className="clear-search-btn"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, search: "" }))
                      }
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              <div className="filter-group">
                <label className="pixel-label">TOPIC AREA</label>
                <div className="pixel-select-wrapper">
                  <select
                    className="pixel-select"
                    value={filters.category}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                  >
                    <option value="ALL">ALL TOPICS</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="filter-group button-group-filter">
                <span className="pixel-label">DIFFICULTY</span>
                <div className="pixel-btn-group">
                  {["ALL", "Easy", "Medium", "Hard"].map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      className={`pixel-btn filter-btn ${filters.difficulty === diff ? "active" : ""}`}
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, difficulty: diff }))
                      }
                    >
                      {diff === "Medium" ? "MED" : diff.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-actions">
                <button
                  onClick={resetAllFilters}
                  className="pixel-btn reset-filters-btn"
                >
                  RESET FILTERS
                </button>
              </div>
            </div>
          </div>

          {/* Quest Board Board */}
          <div className="dashboard-card pixel-border">
            <div className="card-header flex-header">
              <span>CLEARED QUESTS</span>
              <span className="tech-font">
                {filteredQuests.length} VERIFIED CLEARS
              </span>
            </div>
            <div className="card-content quest-list-scroll">
              <div className="quest-list">
                {filteredQuests.map((q) => (
                  <div key={q.id} className="quest-item pixel-border cleared">
                    <div className="quest-main-content">
                      <div className="quest-row-1">
                        <span
                          className="quest-check-icon"
                          style={{
                            color: "var(--color-primary)",
                            marginRight: "8px",
                            fontFamily: "Press Start 2P",
                            fontSize: "10px",
                          }}
                        >
                          ✓
                        </span>
                        <div className="quest-title-container">
                          <a
                            href={`https://leetcode.com/problems/${q.titleSlug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="quest-title"
                            title="Click to open challenge on LeetCode"
                          >
                            #{q.frontendQuestionId} {q.title} ↗
                          </a>
                          <span className="cleared-stamp">CLEARED</span>
                        </div>
                      </div>
                      <div className="quest-row-2">
                        <span
                          className={`badge difficulty diff-${q.difficulty.toLowerCase()}`}
                        >
                          {q.difficulty.toUpperCase()}
                        </span>
                        {q.topics &&
                          q.topics.map((topic) => (
                            <span key={topic} className="badge category">
                              {topic}
                            </span>
                          ))}
                      </div>
                    </div>
                    <div className="quest-xp-container">
                      <span className="quest-xp">+{q.xpAwarded} XP</span>
                    </div>
                  </div>
                ))}

                {quests.length === 0 && (
                  <div className="no-results">
                    <span>🛡️</span>
                    {user?.leetcode?.username ? (
                      <>
                        NO CLEARED QUESTS YET.
                        <br />
                        Sync your LeetCode profile to discover your recent
                        Accepted solutions.
                      </>
                    ) : (
                      <>
                        CONNECT YOUR LEETCODE PROFILE
                        <br />
                        Link a public username to begin tracking verified
                        clears.
                      </>
                    )}
                  </div>
                )}

                {quests.length > 0 && filteredQuests.length === 0 && (
                  <div className="no-results">
                    <span>🔍</span>
                    NO QUESTS MATCH THE CURRENT FILTERS.
                    <br />
                    TRY ADJUSTING YOUR FILTER MATRIX.
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Level Up Fanfare Overlay */}
      {levelUpData && (
        <div className="level-up-overlay">
          <div className="level-up-box pixel-border">
            <h2 className="level-up-title blink">LEVEL UP!</h2>
            <div className="level-up-stars">⭐⭐⭐⭐</div>
            <div className="level-up-info">
              <p>YOU REACHED</p>
              <div className="level-up-badge">LV. {levelUpData.level}</div>
              <p className="level-up-rank">
                {getPlayerRankName(levelUpData.level)}
              </p>
            </div>
            <button
              onClick={() => setLevelUpData(null)}
              className="pixel-btn"
              style={{ padding: "8px 24px", fontSize: "10px" }}
            >
              CONTINUE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper to return player rank names on client
function getPlayerRankName(level) {
  if (level <= 2) return "ROOKIE CODER";
  if (level <= 4) return "BUG CATCHER";
  if (level <= 7) return "CODE TRAINER";
  if (level <= 10) return "ALGORITHM SCOUT";
  if (level <= 14) return "STACK WARRIOR";
  if (level <= 19) return "CODE ACE";
  return "ALGORITHM MASTER";
}
