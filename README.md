# Algo Quest: LeetCode Retro RPG Tracker

This project has been successfully migrated from a static client-side prototype to a full-stack web application. The retro pixel art aesthetic has been preserved and ported to React + Vite, while progression states, LeetCode fetching services, and AI complexity evaluation reside in the Node.js + Express backend.

## Project Structure

```text
D:\LeetCode\
├── client/                 # React + Vite Frontend
│   ├── src/
│   │   ├── components/     # UI elements (HUD, filters, boards)
│   │   ├── utils/          # Synth helper, SVG avatar generators
│   │   ├── App.jsx         # Main React controller
│   │   └── index.css       # Migrated stylesheet
│   └── package.json
├── server/                 # Node.js + Express Backend
│   ├── config/             # DB & API configs
│   ├── controllers/        # Express handlers (Auth, Sync, Problem, User)
│   ├── models/             # Mongoose schemas (User, Problem, UserSolvedProblem, SyncLog)
│   ├── routes/             # REST routes
│   ├── services/           # LeetCode GraphQL fetcher and Groq AI service
│   ├── utils/              # Progression calculations
│   └── .env                # App environment secrets (ignored)
```

---

## Running the Application

Both backend and frontend development servers are configured and active.

### 1. Start Backend Server
The server is currently running in the background on **Port 5000**.
If you ever need to run it manually:
```bash
cd server
npm run start
```
*Note: Make sure your `.env` contains the required keys (MongoDB URI and Groq API Key).*

### 2. Start Frontend Server
The client is currently running in the background on **Port 5173**.
If you ever need to run it manually:
```bash
cd client
npm run dev
```

---

## What We Built

1. **Vite + React Frontend**: Migrated the static Game Boy/handheld HUD styling into modular components:
   - Dynamic SVG avatar renderer maps player level/rank to pixel graphics.
   - Recreated Web Audio API synthesizer chimes.
   - Implemented responsive columns, filters, and list cards.
2. **Node.js + Express REST API**:
   - `/api/auth/register`, `/api/auth/login`, `/api/auth/me` with JWT authentication and salted passwords.
   - `/api/leetcode/connect` and `/api/leetcode/sync` utilizing LeetCode's public GraphQL endpoint.
   - `/api/problems` returning problem states (cleared/pending status joined on DB solve records).
   - `/api/progression` returning dynamic attributes, streaks, and progress stats.
3. **Mongoose Database Schema**:
   - `User`: Handles account security and sync logs.
   - `Problem`: Caches problem metadata (category, difficulty, slug, ID) to limit API dependencies.
   - `UserSolvedProblem`: Registers solved problems with compound unique indexes (`userId` + `titleSlug`) to enforce single-time XP rewards (idempotency).
4. **Scoring Engine with Groq AI**:
   - When a new LeetCode problem is solved and cached, the backend invokes Groq using `llama3-8b-8192` with structured JSON mode to rate coding complexity (impl, concept, edge-cases, depth) on a 1-10 scale.
   - Calculates final XP using a deterministic formula. If Groq is unavailable, it falls back to standard base XP levels (Easy: 25, Medium: 60, Hard: 120).
