# StudyTracker Frontend — Plan

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS** — styling
- **Recharts** — charts and graphs
- **React Router** — page routing
- **Zustand** — state management (tiny, no boilerplate)
- **Axios** — API calls

---

## Setup

```bash
npm create vite@latest studytracker-web -- --template react-ts
cd studytracker-web
npm install tailwindcss @tailwindcss/vite
npm install recharts react-router-dom zustand axios lucide-react
```

---

## Pages

```
/                → Dashboard (main view, today's stats)
/weekly          → Weekly analytics
/monthly         → Monthly overview + calendar heatmap
/timeline        → Activity feed (scrollable log)
/settings        → Rules management, account, preferences
```

---

## Component Architecture (Divide & Conquer)

Build each component in isolation. Every component is self-contained with its own data fetching, types, and styles. AI can generate one at a time without needing context from the rest of the app.

```
src/
├── pages/
│   ├── Dashboard.tsx
│   ├── Weekly.tsx
│   ├── Monthly.tsx
│   ├── Timeline.tsx
│   └── Settings.tsx
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx            # Navigation sidebar
│   │   ├── TopBar.tsx             # Header with date, user info
│   │   └── AppShell.tsx           # Layout wrapper (sidebar + content)
│   │
│   ├── dashboard/
│   │   ├── TodayProgress.tsx      # Circular ring — hours vs goal
│   │   ├── FocusScore.tsx         # Focus percentage card
│   │   ├── SessionCount.tsx       # Sessions completed today
│   │   ├── StreakCard.tsx         # Current day streak
│   │   ├── ActiveTimer.tsx        # Live timer showing current session
│   │   └── TopAppsToday.tsx       # Top 5 apps used today
│   │
│   ├── weekly/
│   │   ├── StudyHoursChart.tsx    # Line chart Mon-Sun
│   │   ├── DailyFocusBars.tsx     # Bar chart per day
│   │   ├── WeeklyStats.tsx        # Study time, break time, active days
│   │   └── BestDayCard.tsx        # Which day was most productive
│   │
│   ├── monthly/
│   │   ├── CalendarHeatmap.tsx    # Calendar with color intensity
│   │   ├── DayDetail.tsx          # Selected day breakdown
│   │   ├── MonthlyStats.tsx       # Total hours, sessions, avg/day
│   │   └── SubjectBreakdown.tsx   # Donut chart by subject/category
│   │
│   ├── timeline/
│   │   ├── ActivityFeed.tsx       # Scrollable list of activities
│   │   ├── ActivityCard.tsx       # Single activity entry
│   │   └── ActivityFilter.tsx     # Filter by app, category, date
│   │
│   ├── settings/
│   │   ├── RulesManager.tsx       # View/add/delete correction rules
│   │   ├── AccountSettings.tsx    # Account ID, API connection
│   │   ├── GoalSettings.tsx       # Daily study goal
│   │   └── ExcludedApps.tsx       # Apps to ignore
│   │
│   └── shared/
│       ├── StatCard.tsx           # Reusable stat display (number + label)
│       ├── ProgressRing.tsx       # Circular progress component
│       ├── CategoryBadge.tsx      # Colored badge (productive/unproductive/unknown)
│       └── TimeDisplay.tsx        # Formats seconds into "Xh Ym"
│
├── hooks/
│   ├── useActivities.ts           # Fetch activities from API
│   ├── useDashboardStats.ts       # Fetch today's summary
│   ├── useWeeklyStats.ts          # Fetch weekly data
│   └── useMonthlyStats.ts         # Fetch monthly data
│
├── stores/
│   └── useAppStore.ts             # Zustand store (selected date, filters, user)
│
├── api/
│   └── client.ts                  # Axios instance, base URL, auth headers
│
├── types/
│   └── index.ts                   # All TypeScript interfaces
│
├── utils/
│   ├── time.ts                    # Duration formatting helpers
│   └── colors.ts                  # Category → color mapping
│
├── App.tsx                        # Router setup
├── main.tsx                       # Entry point
└── index.css                      # Tailwind base
```

---

## Types (src/types/index.ts)

```typescript
interface Activity {
  id: number;
  app: string;
  title: string;
  classification: "productive" | "unproductive" | "unknown";
  category: string;
  startTime: number;
  endTime: number;
  durationSeconds: number;
  platform: string;
}

interface DailySummary {
  date: string;
  totalSeconds: number;
  productiveSeconds: number;
  unproductiveSeconds: number;
  unknownSeconds: number;
  sessions: number;
  topApps: AppSummary[];
}

interface AppSummary {
  app: string;
  totalSeconds: number;
  classification: string;
  entries: number;
}

interface WeeklySummary {
  days: DailySummary[];
  totalStudyHours: number;
  activeDays: number;
  bestDay: string;
  averagePerDay: number;
}

interface UserRule {
  id: number;
  titlePattern: string;
  classification: "productive" | "unproductive";
  createdAt: string;
}
```

---

## Build Order

Build each component independently. Test with mock data first, connect to real API later.

### Phase 1 — Layout + Shared Components
1. [ ] Setup project: Vite + React + TS + Tailwind
2. [ ] AppShell.tsx — sidebar + content layout
3. [ ] Sidebar.tsx — navigation links
4. [ ] StatCard.tsx — reusable number + label card
5. [ ] ProgressRing.tsx — circular progress SVG
6. [ ] CategoryBadge.tsx — productive/unproductive badge
7. [ ] TimeDisplay.tsx — format seconds to "Xh Ym"

### Phase 2 — Dashboard Page
8. [ ] TodayProgress.tsx — circular ring with study hours
9. [ ] FocusScore.tsx — percentage card
10. [ ] SessionCount.tsx — sessions done today
11. [ ] StreakCard.tsx — day streak
12. [ ] TopAppsToday.tsx — top apps list
13. [ ] Dashboard.tsx — compose all dashboard components

### Phase 3 — Weekly Page
14. [ ] StudyHoursChart.tsx — line chart
15. [ ] DailyFocusBars.tsx — bar chart
16. [ ] WeeklyStats.tsx — summary cards
17. [ ] Weekly.tsx — compose weekly components

### Phase 4 — Monthly Page
18. [ ] CalendarHeatmap.tsx — calendar with colors
19. [ ] DayDetail.tsx — selected day info
20. [ ] MonthlyStats.tsx — month summary
21. [ ] SubjectBreakdown.tsx — donut chart
22. [ ] Monthly.tsx — compose monthly components

### Phase 5 — Timeline Page
23. [ ] ActivityCard.tsx — single entry
24. [ ] ActivityFilter.tsx — filter controls
25. [ ] ActivityFeed.tsx — scrollable list
26. [ ] Timeline.tsx — compose timeline components

### Phase 6 — Settings Page
27. [ ] RulesManager.tsx — CRUD for correction rules
28. [ ] GoalSettings.tsx — daily goal
29. [ ] ExcludedApps.tsx — excluded apps list
30. [ ] Settings.tsx — compose settings components

### Phase 7 — Connect to Backend
31. [ ] api/client.ts — axios instance
32. [ ] hooks — replace mock data with real API calls
33. [ ] stores — global state with zustand

---

## AI Prompting Strategy

Each component can be built with a single AI prompt. Template:

```
Build [ComponentName].tsx for my StudyTracker app.

Tech: React + TypeScript + Tailwind CSS
Theme: Dark mode, dark navy/slate background, accent colors for productive (green/cyan) and unproductive (red/orange)

Props: [list props and types]
Behavior: [what it does]
Mock data: [example data to render]

Make it a single self-contained component. No external dependencies except Tailwind and [Recharts if chart].
```

This way each component is built in isolation, tested with mock data, and assembled into pages later.

---

## Design Direction

- Dark theme (like the reference screenshots)
- Background: slate-900 / slate-950
- Productive: emerald/cyan accents
- Unproductive: red/orange accents
- Unknown: gray/neutral
- Cards: slate-800 with subtle borders
- Font: system default or one clean sans-serif
- Minimal, data-dense, no clutter
