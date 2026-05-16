# StudyTracker Collector Script — Plan

## What it does

A background Node.js script that polls the active window every 2 seconds, deduplicates, tracks duration, classifies productivity, and saves to local SQLite. On startup, pulls user correction rules from the backend if an account ID is configured.

---

## Status

### Done
- [x] Poller — polls active window using get-windows
- [x] Deduper — skips duplicate entries, tracks duration
- [x] SQLite storage — saves activity logs locally
- [x] Productivity tagging — keyword lists for apps and titles
- [x] Session tracking

### TODO
- [ ] Scoring + browser-awareness classification (replace first-match-wins)
- [ ] User rules file — load correction rules from local JSON
- [ ] Startup sync — GET request to pull user rules from backend
- [ ] Push activity data to backend API
- [ ] Config file — poll interval, excluded apps, account ID
- [ ] Idle detection

---

## Architecture

```
ON STARTUP:
  Script → GET /api/rules/{userId} → save to rules.json locally

EVERY 2 SECONDS:
  Poll active window
    → Deduplicate (skip if same app + title)
    → Classify:
        1. Check rules.json (user corrections, always wins)
        2. Productive app? (VS Code, terminal, etc.) → productive
        3. Is browser? Check title keywords via scoring
        4. None match → unknown
    → Save to local SQLite

PERIODICALLY (when backend exists):
  Script → POST /api/activities → push new entries to backend
```

---

## Classification Logic (planned)

```
1. User rules (from rules.json)     → wins over everything
2. Productive app match              → productive (ignore title)
3. Browser detected? Use scoring:
     productive keyword in title     → +1
     unproductive keyword in title   → -1
     score > 0 → productive
     score < 0 → unproductive
     score = 0 → unknown
4. Non-browser, no app match         → unknown
```

---

## Data Shape

```json
{
  "app": "firefox",
  "title": "MIT 6.006 Lecture 4 — YouTube",
  "classification": "productive",
  "startTime": 1712567890000,
  "endTime": 1712567920000,
  "durationSeconds": 30,
  "platform": "linux"
}
```

---

## Rules Sync Flow

```
User corrects on website → backend saves rule to their account
        ↓
Script startup → GET /api/rules/{userId}
        ↓
Save to ~/.studytracker/rules.json
        ↓
Script reads rules.json before keyword lists when classifying
```

rules.json format:
```json
[
  { "title_pattern": "MIT", "classification": "productive" },
  { "title_pattern": "netflix", "classification": "unproductive" },
  { "title_pattern": "3Blue1Brown", "classification": "productive" }
]
```

---

## Project Structure

```
studytracker-collector/
├── src/
│   ├── index.ts           # Entry point, wires everything
│   ├── poller.ts          # Active window polling (get-windows)
│   ├── deduper.ts         # Deduplication + duration tracking
│   ├── savedata.ts        # SQLite read/write
│   ├── productivity.ts    # Keyword lists + classification logic
│   ├── sqlite.ts          # DB setup and schema
│   └── config.ts          # TODO: user config
├── package.json
├── tsconfig.json
└── plan.md
```

---

## Dependencies

- **get-windows** — active window detection (cross-platform)
- **better-sqlite3** — local database
- **tsx** — run TypeScript directly

---

## Next Steps (in order)

1. [ ] Implement scoring + browser-awareness in productivity.ts
2. [ ] Add rules.json loading — check rules before keyword lists
3. [ ] Add config.ts — account ID, poll interval, excluded apps
4. [ ] Add startup sync — fetch rules from backend when account ID is set
5. [ ] Add activity push — POST entries to backend periodically
6. [ ] Add idle detection — don't count AFK time
7. [ ] Package as installable CLI: `npx studytracker start`
