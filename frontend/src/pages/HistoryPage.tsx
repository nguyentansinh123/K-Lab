import { useState, useMemo } from "react";
import type { DayLog } from "../types/history";
import PageHeader from "../components/history/PageHeader";
import ToolAnalytics from "../components/history/ToolAnalytics";
import SessionGroup from "../components/history/SessionGroup";

const DAY_LOGS: DayLog[] = [
  {
    date: "OCT_24_2024",
    totalFocus: "6h 42m",
    isPast: false,
    sessions: [
      {
        id: "s1",
        app: "VS Code",
        appIcon: "terminal",
        title: "React Component Optimization",
        duration: "1h 15m",
        focus: 96,
        topic: "Frontend Architecture",
        path: "/src/components/ui/SessionHistory.tsx",
        pathIcon: "folder",
        notes:
          "Optimized rendering cycles for the main list component. Reduced unnecessary re-renders by implementing React.memo and refining dependency arrays in useEffect hooks. Achieved consistent 60fps scrolling.",
        cognitive: { avg: 78.4, base: 45, peak: 92, label: "SUSTAINED", alignment: 92.4 },
        accentColor: "primary",
      },
      {
        id: "s2",
        app: "Chrome",
        appIcon: "public",
        title: "System Design Research (AWS Architecture)",
        duration: "2h 30m",
        focus: 82,
        topic: "Cloud Infrastructure",
        path: "aws.amazon.com/elasticloadbalancing/",
        pathIcon: "link",
        notes:
          "Investigating AWS load balancing strategies (ALB vs NLB) for microservices deployment. Comparing throughput constraints and latency metrics for upcoming migration.",
        cognitive: { avg: 64.2, base: 30, peak: 85, label: "VARIABLE" },
        accentColor: "tertiary",
      },
      {
        id: "s3",
        app: "Notion",
        appIcon: "description",
        title: "Drafting Q4 Objectives",
        duration: "45m",
        focus: 91,
        topic: "Q4 Planning",
        path: "workspace/Q4-Objectives-Draft",
        pathIcon: "draft",
        notes:
          "Aligning team objectives with company OKRs. Structuring sprints and milestones for the new product launch features.",
        cognitive: { avg: 52.1, base: 20, peak: 65, label: "LOW_STRESS" },
        accentColor: "primary",
      },
    ],
  },
  {
    date: "OCT_23_2024",
    totalFocus: "7h 12m",
    isPast: true,
    sessions: [
      {
        id: "s4",
        app: "VS Code",
        appIcon: "terminal",
        title: "API Route Refactoring",
        duration: "3h 20m",
        focus: 88,
        topic: "Backend Services",
        path: "/api/routes/userController.ts",
        pathIcon: "folder",
        notes:
          "Extracting common middleware functions and standardizing error responses across user API routes. Added extensive inline documentation for generated Swagger docs.",
        cognitive: { avg: 85, base: 50, peak: 98, label: "ELEVATED" },
        accentColor: "primary",
      },
      {
        id: "s5",
        app: "Chrome",
        appIcon: "public",
        title: "PostgreSQL Query Optimization",
        duration: "2h 05m",
        focus: 79,
        topic: "Database Performance",
        path: "postgresql.org/docs/current/performance-tips.html",
        pathIcon: "link",
        notes:
          "Researching index strategies for high-volume read queries. Evaluating BRIN vs B-tree indexes for time-series data patterns in the activity log table.",
        cognitive: { avg: 71, base: 35, peak: 89, label: "VARIABLE" },
        accentColor: "tertiary",
      },
      {
        id: "s6",
        app: "Notion",
        appIcon: "description",
        title: "Sprint Retrospective Notes",
        duration: "1h 47m",
        focus: 74,
        topic: "Team Process",
        path: "workspace/Sprint-24-Retro",
        pathIcon: "draft",
        notes:
          "Documenting sprint velocity blockers and action items. Identified three recurring bottlenecks in the review pipeline — will surface in tomorrow's standup.",
        cognitive: { avg: 44, base: 18, peak: 62, label: "LOW_STRESS" },
        accentColor: "primary",
      },
    ],
  },
];

export default function HistoryPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return DAY_LOGS;
    const q = search.toLowerCase();
    return DAY_LOGS.map((day) => ({
      ...day,
      sessions: day.sessions.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.app.toLowerCase().includes(q) ||
          s.topic.toLowerCase().includes(q)
      ),
    })).filter((day) => day.sessions.length > 0);
  }, [search]);

  return (
    <div className="h-screen pt-16 overflow-hidden dashboard-grid-bg">
      <main className="h-full overflow-y-auto hide-scrollbar">
        <div className="p-8 lg:p-16 max-w-7xl mx-auto min-h-full">
          <PageHeader search={search} onSearch={setSearch} />
          <ToolAnalytics />
          <div className="space-y-20">
            {filtered.map((group) => (
              <SessionGroup key={group.date} group={group} />
            ))}
            {filtered.length === 0 && (
              <p className="font-mono text-sm text-on-surface-variant text-center py-20 uppercase tracking-widest">
                &gt; No logs match "{search}"
              </p>
            )}
          </div>
          <div className="h-32" />
        </div>
      </main>
    </div>
  );
}
