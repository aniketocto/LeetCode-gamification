const LEETCODE_PROBLEMS = [
  {
    "id": 1,
    "title": "Two Sum",
    "difficulty": "Easy",
    "category": "Array",
    "xp": 30
  },
  {
    "id": 2,
    "title": "Add Two Numbers",
    "difficulty": "Medium",
    "category": "Linked List",
    "xp": 60
  },
  {
    "id": 3,
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "category": "String",
    "xp": 65
  },
  {
    "id": 5,
    "title": "Longest Palindromic Substring",
    "difficulty": "Medium",
    "category": "String",
    "xp": 70
  },
  {
    "id": 13,
    "title": "Roman to Integer",
    "difficulty": "Easy",
    "category": "HashMap",
    "xp": 20
  },
  {
    "id": 14,
    "title": "Longest Common Prefix",
    "difficulty": "Easy",
    "category": "String",
    "xp": 25
  },
  {
    "id": 19,
    "title": "Remove Nth Node From End of List",
    "difficulty": "Medium",
    "category": "Linked List",
    "xp": 60
  },
  {
    "id": 20,
    "title": "Valid Parentheses",
    "difficulty": "Easy",
    "category": "String",
    "xp": 25
  },
  {
    "id": 21,
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "category": "Recursion",
    "xp": 25
  },
  {
    "id": 23,
    "title": "Merge k Sorted Lists",
    "difficulty": "Hard",
    "category": "Recursion",
    "xp": 120
  },
  {
    "id": 32,
    "title": "Longest Valid Parentheses",
    "difficulty": "Hard",
    "category": "Stack & Queue",
    "xp": 140
  },
  {
    "id": 33,
    "title": "Search in Rotated Sorted Array",
    "difficulty": "Medium",
    "category": "Searching & Sorting",
    "xp": 85
  },
  {
    "id": 34,
    "title": "Find First and Last Position of Element in Sorted Array",
    "difficulty": "Medium",
    "category": "Searching & Sorting",
    "xp": 60
  },
  {
    "id": 35,
    "title": "Search Insert Position",
    "difficulty": "Easy",
    "category": "Searching & Sorting",
    "xp": 25
  },
  {
    "id": 36,
    "title": "Valid Sudoku",
    "difficulty": "Medium",
    "category": "HashMap",
    "xp": 65
  },
  {
    "id": 49,
    "title": "Group Anagrams",
    "difficulty": "Medium",
    "category": "String",
    "xp": 55
  },
  {
    "id": 50,
    "title": "Pow(x, n)",
    "difficulty": "Medium",
    "category": "Recursion",
    "xp": 70
  },
  {
    "id": 53,
    "title": "Maximum Subarray",
    "difficulty": "Medium",
    "category": "Array",
    "xp": 55
  },
  {
    "id": 55,
    "title": "Jump Game",
    "difficulty": "Medium",
    "category": "Array",
    "xp": 75
  },
  {
    "id": 56,
    "title": "Merge Intervals",
    "difficulty": "Medium",
    "category": "Array",
    "xp": 60
  },
  {
    "id": 70,
    "title": "Climbing Stairs",
    "difficulty": "Easy",
    "category": "DP",
    "xp": 25
  },
  {
    "id": 71,
    "title": "Simplify Path",
    "difficulty": "Medium",
    "category": "Stack & Queue",
    "xp": 70
  },
  {
    "id": 75,
    "title": "Sort Colors",
    "difficulty": "Medium",
    "category": "Array",
    "xp": 60
  },
  {
    "id": 76,
    "title": "Minimum Window Substring",
    "difficulty": "Hard",
    "category": "String",
    "xp": 130
  },
  {
    "id": 77,
    "title": "Combinations",
    "difficulty": "Medium",
    "category": "Recursion",
    "xp": 60
  },
  {
    "id": 78,
    "title": "Subsets",
    "difficulty": "Medium",
    "category": "Recursion",
    "xp": 60
  },
  {
    "id": 79,
    "title": "Word Search",
    "difficulty": "Medium",
    "category": "Recursion",
    "xp": 75
  },
  {
    "id": 85,
    "title": "Maximal Rectangle",
    "difficulty": "Hard",
    "category": "Stack & Queue",
    "xp": 150
  },
  {
    "id": 88,
    "title": "Merge Sorted Array",
    "difficulty": "Easy",
    "category": "Array",
    "xp": 25
  },
  {
    "id": 94,
    "title": "Binary Tree Inorder Traversal",
    "difficulty": "Easy",
    "category": "Tree",
    "xp": 30
  },
  {
    "id": 98,
    "title": "Validate Binary Search Tree",
    "difficulty": "Medium",
    "category": "Recursion",
    "xp": 65
  },
  {
    "id": 100,
    "title": "Same Tree",
    "difficulty": "Easy",
    "category": "Tree",
    "xp": 20
  },
  {
    "id": 104,
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "Easy",
    "category": "Recursion",
    "xp": 20
  },
  {
    "id": 105,
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "difficulty": "Medium",
    "category": "Tree",
    "xp": 80
  },
  {
    "id": 110,
    "title": "Balanced Binary Tree",
    "difficulty": "Easy",
    "category": "Recursion",
    "xp": 25
  },
  {
    "id": 121,
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "Easy",
    "category": "Array",
    "xp": 25
  },
  {
    "id": 125,
    "title": "Valid Palindrome",
    "difficulty": "Easy",
    "category": "String",
    "xp": 20
  },
  {
    "id": 128,
    "title": "Longest Consecutive Sequence",
    "difficulty": "Medium",
    "category": "HashMap",
    "xp": 65
  },
  {
    "id": 133,
    "title": "Clone Graph",
    "difficulty": "Medium",
    "category": "Graph",
    "xp": 60
  },
  {
    "id": 134,
    "title": "Gas Station",
    "difficulty": "Medium",
    "category": "Searching & Sorting",
    "xp": 75
  },
  {
    "id": 138,
    "title": "Copy List with Random Pointer",
    "difficulty": "Medium",
    "category": "Linked List",
    "xp": 70
  },
  {
    "id": 139,
    "title": "Word Break",
    "difficulty": "Medium",
    "category": "DP",
    "xp": 80
  },
  {
    "id": 141,
    "title": "Linked List Cycle",
    "difficulty": "Easy",
    "category": "Linked List",
    "xp": 35
  },
  {
    "id": 144,
    "title": "Binary Tree Preorder Traversal",
    "difficulty": "Easy",
    "category": "Tree",
    "xp": 30
  },
  {
    "id": 148,
    "title": "Sort List",
    "difficulty": "Medium",
    "category": "Linked List",
    "xp": 75
  },
  {
    "id": 150,
    "title": "Evaluate Reverse Polish Notation",
    "difficulty": "Medium",
    "category": "Stack & Queue",
    "xp": 60
  },
  {
    "id": 152,
    "title": "Maximum Product Subarray",
    "difficulty": "Medium",
    "category": "Array",
    "xp": 65
  },
  {
    "id": 155,
    "title": "Min Stack",
    "difficulty": "Medium",
    "category": "Stack & Queue",
    "xp": 60
  },
  {
    "id": 198,
    "title": "House Robber",
    "difficulty": "Medium",
    "category": "DP",
    "xp": 60
  },
  {
    "id": 199,
    "title": "Binary Tree Right Side View",
    "difficulty": "Medium",
    "category": "Tree",
    "xp": 65
  },
  {
    "id": 200,
    "title": "Number of Islands",
    "difficulty": "Medium",
    "category": "Graph",
    "xp": 65
  },
  {
    "id": 202,
    "title": "Happy Number",
    "difficulty": "Easy",
    "category": "HashMap",
    "xp": 35
  },
  {
    "id": 203,
    "title": "Remove Linked List Elements",
    "difficulty": "Easy",
    "category": "Linked List",
    "xp": 30
  },
  {
    "id": 206,
    "title": "Reverse Linked List",
    "difficulty": "Easy",
    "category": "Recursion",
    "xp": 25
  },
  {
    "id": 207,
    "title": "Course Schedule",
    "difficulty": "Medium",
    "category": "Graph",
    "xp": 75
  },
  {
    "id": 210,
    "title": "Course Schedule II",
    "difficulty": "Medium",
    "category": "Graph",
    "xp": 80
  },
  {
    "id": 215,
    "title": "Kth Largest Element in an Array",
    "difficulty": "Medium",
    "category": "Searching & Sorting",
    "xp": 65
  },
  {
    "id": 217,
    "title": "Contains Duplicate",
    "difficulty": "Easy",
    "category": "Array",
    "xp": 20
  },
  {
    "id": 222,
    "title": "Count Complete Tree Nodes",
    "difficulty": "Easy",
    "category": "Tree",
    "xp": 35
  },
  {
    "id": 226,
    "title": "Invert Binary Tree",
    "difficulty": "Easy",
    "category": "Tree",
    "xp": 20
  },
  {
    "id": 234,
    "title": "Palindrome Linked List",
    "difficulty": "Easy",
    "category": "Linked List",
    "xp": 35
  },
  {
    "id": 238,
    "title": "Product of Array Except Self",
    "difficulty": "Medium",
    "category": "Array",
    "xp": 65
  },
  {
    "id": 242,
    "title": "Valid Anagram",
    "difficulty": "Easy",
    "category": "String",
    "xp": 20
  },
  {
    "id": 253,
    "title": "Meeting Rooms II",
    "difficulty": "Medium",
    "category": "Searching & Sorting",
    "xp": 70
  },
  {
    "id": 295,
    "title": "Find Median from Data Stream",
    "difficulty": "Hard",
    "category": "Heap",
    "xp": 135
  },
  {
    "id": 300,
    "title": "Longest Increasing Subsequence",
    "difficulty": "Medium",
    "category": "DP",
    "xp": 75
  },
  {
    "id": 322,
    "title": "Coin Change",
    "difficulty": "Medium",
    "category": "DP",
    "xp": 70
  },
  {
    "id": 323,
    "title": "Number of Connected Components in an Undirected Graph",
    "difficulty": "Medium",
    "category": "Graph",
    "xp": 65
  },
  {
    "id": 347,
    "title": "Top K Frequent Elements",
    "difficulty": "Medium",
    "category": "Heap",
    "xp": 70
  },
  {
    "id": 373,
    "title": "Find K Pairs with Smallest Sums",
    "difficulty": "Medium",
    "category": "Heap",
    "xp": 75
  },
  {
    "id": 378,
    "title": "Kth Smallest Element in a Sorted Matrix",
    "difficulty": "Medium",
    "category": "Heap",
    "xp": 70
  },
  {
    "id": 383,
    "title": "Ransom Note",
    "difficulty": "Easy",
    "category": "HashMap",
    "xp": 20
  },
  {
    "id": 387,
    "title": "First Unique Character in a String",
    "difficulty": "Easy",
    "category": "HashMap",
    "xp": 20
  },
  {
    "id": 416,
    "title": "Partition Equal Subset Sum",
    "difficulty": "Medium",
    "category": "DP",
    "xp": 75
  },
  {
    "id": 417,
    "title": "Pacific Atlantic Water Flow",
    "difficulty": "Medium",
    "category": "Graph",
    "xp": 75
  },
  {
    "id": 424,
    "title": "Longest Repeating Character Replacement",
    "difficulty": "Medium",
    "category": "String",
    "xp": 75
  },
  {
    "id": 435,
    "title": "Non-overlapping Intervals",
    "difficulty": "Medium",
    "category": "Searching & Sorting",
    "xp": 70
  },
  {
    "id": 496,
    "title": "Next Greater Element I",
    "difficulty": "Easy",
    "category": "Stack & Queue",
    "xp": 35
  },
  {
    "id": 518,
    "title": "Coin Change 2",
    "difficulty": "Medium",
    "category": "DP",
    "xp": 70
  },
  {
    "id": 543,
    "title": "Diameter of Binary Tree",
    "difficulty": "Easy",
    "category": "Tree",
    "xp": 35
  },
  {
    "id": 547,
    "title": "Number of Provinces",
    "difficulty": "Medium",
    "category": "Graph",
    "xp": 65
  },
  {
    "id": 567,
    "title": "Permutation in String",
    "difficulty": "Medium",
    "category": "String",
    "xp": 70
  },
  {
    "id": 621,
    "title": "Task Scheduler",
    "difficulty": "Medium",
    "category": "Heap",
    "xp": 85
  },
  {
    "id": 641,
    "title": "Design Circular Deque",
    "difficulty": "Medium",
    "category": "Stack & Queue",
    "xp": 70
  },
  {
    "id": 692,
    "title": "Top K Frequent Words",
    "difficulty": "Medium",
    "category": "HashMap",
    "xp": 70
  },
  {
    "id": 695,
    "title": "Max Area of Island",
    "difficulty": "Medium",
    "category": "Graph",
    "xp": 65
  },
  {
    "id": 704,
    "title": "Binary Search",
    "difficulty": "Easy",
    "category": "Searching & Sorting",
    "xp": 25
  },
  {
    "id": 739,
    "title": "Daily Temperatures",
    "difficulty": "Medium",
    "category": "Stack & Queue",
    "xp": 70
  },
  {
    "id": 767,
    "title": "Reorganize String",
    "difficulty": "Medium",
    "category": "Heap",
    "xp": 70
  },
  {
    "id": 785,
    "title": "Is Graph Bipartite?",
    "difficulty": "Medium",
    "category": "Graph",
    "xp": 70
  },
  {
    "id": 881,
    "title": "Boats to Save People",
    "difficulty": "Medium",
    "category": "Searching & Sorting",
    "xp": 70
  },
  {
    "id": 946,
    "title": "Validate Stack Sequences",
    "difficulty": "Medium",
    "category": "Stack & Queue",
    "xp": 70
  },
  {
    "id": 973,
    "title": "K Closest Points to Origin",
    "difficulty": "Easy",
    "category": "Heap",
    "xp": 35
  },
  {
    "id": 994,
    "title": "Rotting Oranges",
    "difficulty": "Medium",
    "category": "Graph",
    "xp": 70
  },
  {
    "id": 1143,
    "title": "Longest Common Subsequence",
    "difficulty": "Medium",
    "category": "DP",
    "xp": 75
  }
];


// ==========================================================================
// RETRO PIXEL RPG STATE & ENGINE LOGIC
// ==========================================================================

// Global state variables
let completedProblems = {}; // Maps string(id) -> string(completionDate YYYY-MM-DD)
let playerName = "Adventurer";
let soundEnabled = true;
let currentFilters = {
    search: "",
    difficulty: "ALL",
    status: "ALL",
    category: "ALL"
};

// Web Audio API Context for retro synthesizer
let audioCtx = null;

// Pixel Art Palette
const PALETTE = {
    '.': 'transparent',
    'k': '#000000', // Black Outline
    'w': '#ffffff', // White
    'g': '#38b764', // Green
    'r': '#ff003c', // Red
    'b': '#29adff', // Blue
    'y': '#ffcd75', // Gold / Yellow
    'o': '#ff7b00', // Orange
    'p': '#a23e8c', // Purple
    's': '#e2b27a', // Skin Tone
    'd': '#8b93af', // Light Gray
    'c': '#3a3f58', // Dark Gray
};

// 12x12 Pixel Art Grids for each player rank
const AVATARS = {
    "ROOKIE CODER": [
        "............",
        "....kkkk....",
        "..kkggggkk..",
        ".kggggggggk.",
        "kggggwggwggk",
        "kgggkkwkkwgk",
        "kggggggggggk",
        "kggggkkkkggk",
        ".kggggggggk.",
        "..kkggggkk..",
        "....kkkk....",
        "............"
    ],
    "BUG CATCHER": [
        "....kkkk....",
        "...krrwwk...",
        "..krrrrrrk..",
        ".kkrkrrkrkk.",
        "kk.kkkkkk.kk",
        "k.krrrrrrk.k",
        "..krrrrrrk..",
        "..k.kkkk.k..",
        "..kk....kk..",
        "............",
        "............",
        "............"
    ],
    "CODE TRAINER": [
        "....kkkk....",
        "...kbbbbk...",
        "..kbbbbbbk..",
        ".kbbwbbwbbk.",
        ".kbkkbkbkbbk",
        ".kbbbbbbbbk.",
        "kbbkkkkkkbbk",
        "k.kbbbbbbk.k",
        "..kk....kk..",
        "............",
        "............",
        "............"
    ],
    "ALGORITHM SCOUT": [
        "....kkkk....",
        "..kkggggkk..",
        ".kggggggggk.",
        "kggssssssggk",
        "kgskkskkskgk",
        "kggssssssggk",
        ".kggggggggk.",
        "..kkggggkk..",
        "....kkkk....",
        "............",
        "............",
        "............"
    ],
    "STACK WARRIOR": [
        "...kkkkkk...",
        "..kyyyyyykk.",
        ".kddddddddk.",
        "kddddddddddk",
        "kddwddddwddk",
        "kddkkkkkkddk",
        ".kddccccddk.",
        "..kkddddkk..",
        "....kkkk....",
        "............",
        "............",
        "............"
    ],
    "CODE ACE": [
        "....kkkk....",
        "...kppppk...",
        "..kppppppk..",
        ".kyyppppyyk.",
        "ksswppppwssk",
        "ksskkkkkkssk",
        ".kssppppssk.",
        "..kkppppkk..",
        "....kkkk....",
        "............",
        "............",
        "............"
    ],
    "ALGORITHM MASTER": [
        "..kyyyyyyk..",
        "..kykkkkyk..",
        "..kyyyyyyk..",
        ".kssssssssk.",
        "ksswsssswssk",
        "ksskkkkkkssk",
        ".kssyyyyssk.",
        "..kkyyyykk..",
        "....kkkk....",
        "............",
        "............",
        "............"
    ]
};

// ==========================================================================
// MATHEMATICAL CORE (LEVELS, RANKS & STREAKS)
// ==========================================================================

/**
 * Calculates current level details based on total XP using the quadratic progression.
 * Level 1 starts at 0 XP. Level 2 starts at 50 XP. Level 3 starts at 120 XP.
 * Cumulative XP for level L: CumXP(L) = 10 * (L^2 + 2L - 3)
 */
function getLevelInfo(totalXP) {
    // Inverse formula: L = Math.floor(-1 + Math.sqrt(4 + totalXP / 10))
    const derivedLevel = Math.floor(-1 + Math.sqrt(4 + totalXP / 10));
    const currentLevel = Math.max(1, derivedLevel);
    
    // XP marks
    const xpForCurrentLevel = 10 * (currentLevel * currentLevel + 2 * currentLevel - 3);
    const nextLevel = currentLevel + 1;
    const xpForNextLevel = 10 * (nextLevel * nextLevel + 2 * nextLevel - 3);
    
    const xpNeededForThisLevel = xpForNextLevel - xpForCurrentLevel;
    const xpEarnedInThisLevel = totalXP - xpForCurrentLevel;
    const percent = Math.min(100, Math.max(0, (xpEarnedInThisLevel / xpNeededForThisLevel) * 100));
    
    return {
        level: currentLevel,
        xpEarnedInLevel: xpEarnedInThisLevel,
        xpRequiredForNextLevel: xpNeededForThisLevel,
        percent: percent
    };
}

/**
 * Derives RPG rank title based on level
 */
function getPlayerRank(level) {
    if (level <= 2) return "ROOKIE CODER";
    if (level <= 4) return "BUG CATCHER";
    if (level <= 7) return "CODE TRAINER";
    if (level <= 10) return "ALGORITHM SCOUT";
    if (level <= 14) return "STACK WARRIOR";
    if (level <= 19) return "CODE ACE";
    return "ALGORITHM MASTER";
}

/**
 * Generates local date string in YYYY-MM-DD format
 */
function getLocalDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Calculates current active streak of consecutive days.
 * Traverses backward from today or yesterday to count consecutive active dates.
 */
function calculateStreak() {
    const dates = new Set(Object.values(completedProblems));
    if (dates.size === 0) return 0;
    
    const today = getLocalDateString();
    
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = getLocalDateString(yesterdayDate);
    
    let checkDate = new Date();
    
    // Decide start point: today or yesterday
    if (dates.has(today)) {
        checkDate = new Date();
    } else if (dates.has(yesterday)) {
        checkDate = yesterdayDate;
    } else {
        return 0; // Broken streak
    }
    
    let streak = 0;
    while (true) {
        const dateStr = getLocalDateString(checkDate);
        if (dates.has(dateStr)) {
            streak++;
            // Move back 1 day
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }
    return streak;
}

// ==========================================================================
// VISUAL RENDERING (DOM GENERATION & SVG AVATARS)
// ==========================================================================

/**
 * Renders the 12x12 pixel art avatar as inline SVG
 */
function getAvatarSVG(rank) {
    const matrix = AVATARS[rank] || AVATARS["ROOKIE CODER"];
    const pixelSize = 8;
    const height = matrix.length;
    const width = matrix[0].length;
    
    let rects = "";
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const char = matrix[y][x];
            if (char !== '.' && PALETTE[char]) {
                rects += `<rect x="${x * pixelSize}" y="${y * pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${PALETTE[char]}" />`;
            }
        }
    }
    
    return `<svg viewBox="0 0 ${width * pixelSize} ${height * pixelSize}" width="100%" height="100%" style="image-rendering: pixelated;" aria-hidden="true">${rects}</svg>`;
}

/**
 * Updates the user statistics, progress bars, ranks, and avatar on the HUD
 */
function updateDashboard() {
    // 1. Calculate XP from canonical list
    let totalXP = 0;
    let easyCleared = 0;
    let mediumCleared = 0;
    let hardCleared = 0;
    
    const completedIds = Object.keys(completedProblems);
    
    LEETCODE_PROBLEMS.forEach(p => {
        if (completedProblems[p.id]) {
            totalXP += p.xp;
            if (p.difficulty === "Easy") easyCleared++;
            else if (p.difficulty === "Medium") mediumCleared++;
            else if (p.difficulty === "Hard") hardCleared++;
        }
    });
    
    // 2. Derive Level Info
    const lvlInfo = getLevelInfo(totalXP);
    const rank = getPlayerRank(lvlInfo.level);
    
    // 3. Update Text Values
    document.getElementById("player-level").textContent = `LV. ${lvlInfo.level}`;
    document.getElementById("player-rank").textContent = rank;
    document.getElementById("xp-text").textContent = `${lvlInfo.xpEarnedInLevel} / ${lvlInfo.xpRequiredForNextLevel} XP (TOT: ${totalXP})`;
    
    // 4. Animate XP Progress Bar
    document.getElementById("xp-progress-fill").style.width = `${lvlInfo.percent}%`;
    
    // 5. Update Stats
    const totalProblems = LEETCODE_PROBLEMS.length;
    const completedCount = completedIds.length;
    const completionPct = totalProblems > 0 ? Math.round((completedCount / totalProblems) * 100) : 0;
    
    document.getElementById("stats-total-cleared").textContent = `${completedCount} / ${totalProblems}`;
    document.getElementById("stats-pct").textContent = `(${completionPct}%)`;
    document.getElementById("quests-progress-fill").style.width = `${completionPct}%`;
    
    // Streak
    const streak = calculateStreak();
    const streakEl = document.getElementById("stats-streak");
    streakEl.textContent = `🔥 ${streak} DAY${streak === 1 ? '' : 'S'}`;
    if (streak > 0) {
        streakEl.classList.add("active-streak");
    } else {
        streakEl.classList.remove("active-streak");
    }
    
    // Difficulties count
    let totalEasy = 0, totalMedium = 0, totalHard = 0;
    LEETCODE_PROBLEMS.forEach(p => {
        if (p.difficulty === "Easy") totalEasy++;
        else if (p.difficulty === "Medium") totalMedium++;
        else if (p.difficulty === "Hard") totalHard++;
    });
    
    document.getElementById("stats-easy-count").textContent = `${easyCleared} / ${totalEasy}`;
    document.getElementById("stats-medium-count").textContent = `${mediumCleared} / ${totalMedium}`;
    document.getElementById("stats-hard-count").textContent = `${hardCleared} / ${totalHard}`;
    
    // 6. Update Avatar
    document.getElementById("avatar-sprite").innerHTML = getAvatarSVG(rank);
}

/**
 * Dynamically populated topic selector
 */
function renderCategoryDropdown() {
    const select = document.getElementById("category-select");
    const categories = new Set();
    
    LEETCODE_PROBLEMS.forEach(p => {
        if (p.category) categories.add(p.category);
    });
    
    // Clear and keep "ALL"
    select.innerHTML = '<option value="ALL">ALL TOPICS</option>';
    
    // Sort topics alphabetically
    Array.from(categories).sort().forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat.toUpperCase();
        select.appendChild(option);
    });
}

/**
 * Renders the filtered problem cards
 */
function renderProblems() {
    const listContainer = document.getElementById("quest-list");
    listContainer.innerHTML = "";
    
    let matchCount = 0;
    
    LEETCODE_PROBLEMS.forEach(p => {
        // Apply Filters
        const matchesSearch = p.title.toLowerCase().includes(currentFilters.search.toLowerCase()) || 
                             p.id.toString() === currentFilters.search;
        const matchesDifficulty = currentFilters.difficulty === "ALL" || p.difficulty === currentFilters.difficulty;
        const matchesCategory = currentFilters.category === "ALL" || p.category === currentFilters.category;
        
        const isCompleted = !!completedProblems[p.id];
        let matchesStatus = true;
        if (currentFilters.status === "PENDING") matchesStatus = !isCompleted;
        if (currentFilters.status === "COMPLETED") matchesStatus = isCompleted;
        
        if (matchesSearch && matchesDifficulty && matchesCategory && matchesStatus) {
            matchCount++;
            
            // Generate Card Element
            const item = document.createElement("div");
            item.className = `quest-item pixel-border ${isCompleted ? 'cleared' : ''}`;
            item.setAttribute("role", "listitem");
            item.setAttribute("data-id", p.id);
            
            item.innerHTML = `
                <div class="quest-main-content">
                    <div class="quest-row-1">
                        <label class="checkbox-container" aria-label="Mark problem #${p.id} ${p.title} as completed">
                            <input type="checkbox" data-id="${p.id}" ${isCompleted ? 'checked' : ''}>
                            <span class="checkmark"></span>
                        </label>
                        <div class="quest-title-container">
                            <span class="quest-title">#${p.id} ${p.title}</span>
                            ${isCompleted ? '<span class="cleared-stamp">CLEARED</span>' : ''}
                        </div>
                    </div>
                    <div class="quest-row-2">
                        <span class="badge difficulty diff-${p.difficulty.toLowerCase()}">${p.difficulty.toUpperCase()}</span>
                        <span class="badge category">${p.category}</span>
                    </div>
                </div>
                <div class="quest-xp-container">
                    <span class="quest-xp">+${p.xp} XP</span>
                </div>
            `;
            
            listContainer.appendChild(item);
        }
    });
    
    // Update counter
    document.getElementById("quest-count").textContent = `${matchCount} / ${LEETCODE_PROBLEMS.length} VISIBLE`;
    
    if (matchCount === 0) {
        listContainer.innerHTML = `
            <div class="no-results">
                <span>🔍</span>
                NO QUESTS FOUND IN ARCHIVES.<br>
                TRY ADJUSTING YOUR FILTER MATRIX.
            </div>
        `;
    }
}

// ==========================================================================
// TOASTS & FLOATING ANIMATIONS
// ==========================================================================

/**
 * Triggers a flying "+XP" or "-XP" animation from the target elements coordinate
 */
function triggerFloatingXP(targetEl, xp, positive = true) {
    if (!targetEl) return;
    
    const rect = targetEl.getBoundingClientRect();
    const container = document.getElementById("floating-xp-container");
    const containerRect = container.getBoundingClientRect();
    
    // Center of target relative to container
    const x = rect.left - containerRect.left + (rect.width / 2);
    const y = rect.top - containerRect.top;
    
    const floatEl = document.createElement("div");
    floatEl.className = `floating-xp ${positive ? 'positive' : 'negative'}`;
    floatEl.style.left = `${x}px`;
    floatEl.style.top = `${y}px`;
    floatEl.textContent = `${positive ? '+' : '-'}${xp} XP`;
    
    container.appendChild(floatEl);
    
    // Remove element when animation ends
    setTimeout(() => {
        floatEl.remove();
    }, 1000);
}

/**
 * Spawns a non-intrusive game notification toast at the bottom of the screen
 */
function showNotification(symbol, message) {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast pixel-border";
    
    toast.innerHTML = `
        <span class="toast-symbol">${symbol}</span>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Remove toast after 3.5 seconds
    setTimeout(() => {
        toast.style.animation = "toast-slide-up 0.3s reverse forwards";
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ==========================================================================
// RETRO SOUNDS (WEB AUDIO API SYNTHESIZER)
// ==========================================================================

function playSound(type) {
    if (!soundEnabled) return;
    
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === "suspended") {
            audioCtx.resume();
        }
        
        const now = audioCtx.currentTime;
        
        if (type === "check") {
            // Upbeat retro double chime
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = "triangle";
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
            
            osc.start(now);
            osc.stop(now + 0.22);
        } 
        else if (type === "uncheck") {
            // Descending buzz / de-buff
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = "sawtooth";
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.frequency.setValueAtTime(220, now); // A3
            osc.frequency.exponentialRampToValueAtTime(130, now + 0.25); // C3
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            
            osc.start(now);
            osc.stop(now + 0.25);
        } 
        else if (type === "levelup") {
            // Classic fanfare chime sweep: C4 -> E4 -> G4 -> C5 -> E5 -> G5 -> C6
            const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
            const noteDuration = 0.07;
            
            notes.forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = (idx === notes.length - 1) ? "square" : "triangle";
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                
                const time = now + idx * noteDuration;
                const duration = idx === notes.length - 1 ? 0.35 : noteDuration;
                
                osc.frequency.setValueAtTime(freq, time);
                gain.gain.setValueAtTime(0.06, time);
                gain.gain.exponentialRampToValueAtTime(0.001, time + duration - 0.01);
                
                osc.start(time);
                osc.stop(time + duration);
            });
        }
    } catch (err) {
        console.warn("Sound generation failed or blocked:", err);
    }
}

// ==========================================================================
// GAME ACTION & EVENT CONTROLLERS
// ==========================================================================

/**
 * Core toggle problem state logic
 */
function toggleProblem(id, checked, eventTarget = null) {
    const problem = LEETCODE_PROBLEMS.find(p => p.id === id);
    if (!problem) return;
    
    // Get old XP and Level to detect level up
    let oldXP = 0;
    LEETCODE_PROBLEMS.forEach(p => {
        if (completedProblems[p.id]) oldXP += p.xp;
    });
    const oldLvlInfo = getLevelInfo(oldXP);
    
    if (checked) {
        // Complete challenge
        completedProblems[id] = getLocalDateString();
        triggerFloatingXP(eventTarget, problem.xp, true);
        playSound("check");
        showNotification("🏆", `QUEST CLEARED: ${problem.title}! (+${problem.xp} XP)`);
    } else {
        // Revoke challenge
        delete completedProblems[id];
        triggerFloatingXP(eventTarget, problem.xp, false);
        playSound("uncheck");
        showNotification("↩️", `QUEST REVOKED: ${problem.title}! (-${problem.xp} XP)`);
    }
    
    // Save completion state
    localStorage.setItem("lc_rpg_completed_problems", JSON.stringify(completedProblems));
    
    // Calculate new XP and Level
    let newXP = 0;
    LEETCODE_PROBLEMS.forEach(p => {
        if (completedProblems[p.id]) newXP += p.xp;
    });
    const newLvlInfo = getLevelInfo(newXP);
    
    // Check level shift
    if (newLvlInfo.level > oldLvlInfo.level) {
        // LEVEL UP!
        triggerLevelUpOverlay(newLvlInfo.level, getPlayerRank(newLvlInfo.level));
    } else if (newLvlInfo.level < oldLvlInfo.level) {
        // LEVEL DOWN!
        showNotification("⚠️", `LEVEL DOWN! You are now Level ${newLvlInfo.level}.`);
    }
    
    // Refresh GUI
    updateDashboard();
    renderProblems();
}

/**
 * Shows the fullscreen level up screen
 */
function triggerLevelUpOverlay(level, rank) {
    playSound("levelup");
    
    // Flash Screen Effect
    const screen = document.querySelector(".console-screen");
    screen.style.transition = "none";
    screen.style.backgroundColor = "#ffffff";
    setTimeout(() => {
        screen.style.transition = "background-color 0.4s ease";
        screen.style.backgroundColor = "var(--color-screen-bg)";
    }, 50);
    
    // Update elements
    document.getElementById("overlay-level-badge").textContent = `LV. ${level}`;
    document.getElementById("overlay-rank-badge").textContent = rank;
    
    // Show overlay
    const overlay = document.getElementById("level-up-overlay");
    overlay.classList.remove("hidden");
}

/**
 * Resets local database
 */
function resetProgress() {
    if (confirm("⚠️ WARNING: This will permanently delete all completed quests, XP, level, and player name details. Do you wish to proceed?")) {
        completedProblems = {};
        playerName = "Adventurer";
        
        localStorage.removeItem("lc_rpg_completed_problems");
        localStorage.removeItem("lc_rpg_player_name");
        
        document.getElementById("player-name").textContent = playerName;
        
        showNotification("⚙️", "QUEST LOG SCRUBBED. DATABASE HAS RESET.");
        playSound("uncheck");
        
        updateDashboard();
        renderProblems();
    }
}

// ==========================================================================
// LOCAL STORAGE & INITIAL LOADERS
// ==========================================================================

function loadProgress() {
    // Completed Problems
    const storedCompleted = localStorage.getItem("lc_rpg_completed_problems");
    if (storedCompleted) {
        try {
            completedProblems = JSON.parse(storedCompleted);
        } catch(e) {
            completedProblems = {};
        }
    } else {
        completedProblems = {};
    }
    
    // Player Name
    const storedName = localStorage.getItem("lc_rpg_player_name");
    playerName = storedName || "ADVENTURER";
    document.getElementById("player-name").textContent = playerName;
    
    // Sound settings
    const storedSound = localStorage.getItem("lc_rpg_sound_enabled");
    soundEnabled = storedSound !== "false";
    updateSoundBtnState();
}

function updateSoundBtnState() {
    const btn = document.getElementById("sound-toggle");
    if (soundEnabled) {
        btn.innerHTML = `<span class="icon">🔊</span> SOUND ON`;
        btn.classList.add("sound-btn");
        btn.style.backgroundColor = "#388cb7";
    } else {
        btn.innerHTML = `<span class="icon">🔇</span> SOUND MUTED`;
        btn.classList.remove("sound-btn");
        btn.style.backgroundColor = "#555";
    }
}

// ==========================================================================
// SETUP INITIALIZERS & BINDINGS
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initial State Hydration
    loadProgress();
    renderCategoryDropdown();
    updateDashboard();
    renderProblems();
    
    // 2. Set event listeners for search and filters
    const searchInput = document.getElementById("search-input");
    const clearSearchBtn = document.getElementById("clear-search");
    
    searchInput.addEventListener("input", (e) => {
        currentFilters.search = e.target.value;
        if (e.target.value) {
            clearSearchBtn.classList.remove("hidden");
        } else {
            clearSearchBtn.classList.add("hidden");
        }
        renderProblems();
    });
    
    clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        currentFilters.search = "";
        clearSearchBtn.classList.add("hidden");
        renderProblems();
    });
    
    // Category Selector
    document.getElementById("category-select").addEventListener("change", (e) => {
        currentFilters.category = e.target.value;
        renderProblems();
    });
    
    // Difficulty Buttons
    const difficultyGroup = document.querySelector('[aria-label="Difficulty Filter"]');
    difficultyGroup.addEventListener("click", (e) => {
        if (e.target.classList.contains("filter-btn")) {
            // Deactivate others
            difficultyGroup.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
            
            // Activate clicked
            e.target.classList.add("active");
            currentFilters.difficulty = e.target.getAttribute("data-difficulty");
            renderProblems();
        }
    });
    
    // Status Buttons
    const statusGroup = document.querySelector('[aria-label="Status Filter"]');
    statusGroup.addEventListener("click", (e) => {
        if (e.target.classList.contains("filter-btn")) {
            statusGroup.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
            currentFilters.status = e.target.getAttribute("data-status");
            renderProblems();
        }
    });
    
    // Reset Filters Button
    document.getElementById("clear-filters").addEventListener("click", () => {
        searchInput.value = "";
        clearSearchBtn.classList.add("hidden");
        
        currentFilters = {
            search: "",
            difficulty: "ALL",
            status: "ALL",
            category: "ALL"
        };
        
        // Reset button active classes
        difficultyGroup.querySelectorAll(".filter-btn").forEach(btn => {
            if (btn.getAttribute("data-difficulty") === "ALL") btn.classList.add("active");
            else btn.classList.remove("active");
        });
        
        statusGroup.querySelectorAll(".filter-btn").forEach(btn => {
            if (btn.getAttribute("data-status") === "ALL") btn.classList.add("active");
            else btn.classList.remove("active");
        });
        
        document.getElementById("category-select").value = "ALL";
        
        renderProblems();
    });
    
    // 3. Quest Checklist delegation
    document.getElementById("quest-list").addEventListener("change", (e) => {
        if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
            const id = parseInt(e.target.getAttribute("data-id"));
            toggleProblem(id, e.target.checked, e.target.nextElementSibling);
        }
    });
    
    // 4. Sound toggler
    document.getElementById("sound-toggle").addEventListener("click", () => {
        soundEnabled = !soundEnabled;
        localStorage.setItem("lc_rpg_sound_enabled", soundEnabled);
        updateSoundBtnState();
        if (soundEnabled) {
            playSound("check");
        }
    });
    
    // 5. Reset progress data
    document.getElementById("reset-data").addEventListener("click", resetProgress);
    
    // 6. Level Up overlay close
    document.getElementById("close-level-up").addEventListener("click", () => {
        document.getElementById("level-up-overlay").classList.add("hidden");
    });
    
    // 7. Player Name inline edit
    const playerNameEl = document.getElementById("player-name");
    const playerNameInput = document.getElementById("player-name-input");
    
    playerNameEl.addEventListener("click", () => {
        playerNameEl.classList.add("hidden");
        playerNameInput.classList.remove("hidden");
        playerNameInput.value = playerName;
        playerNameInput.focus();
    });
    
    playerNameInput.addEventListener("blur", () => {
        saveName();
    });
    
    playerNameInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            saveName();
        }
        if (e.key === "Escape") {
            playerNameInput.classList.add("hidden");
            playerNameEl.classList.remove("hidden");
        }
    });
    
    function saveName() {
        const value = playerNameInput.value.trim().toUpperCase();
        if (value) {
            playerName = value;
            localStorage.setItem("lc_rpg_player_name", playerName);
            playerNameEl.textContent = playerName;
            showNotification("🛡️", `NAME REGISTERED: ${playerName}`);
        }
        playerNameInput.classList.add("hidden");
        playerNameEl.classList.remove("hidden");
    }
});
