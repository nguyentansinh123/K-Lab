import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
// Replace with API response shape when ready
export interface SessionNote {
  id: number;
  date: string;        // e.g. "05_OCT_2024 // 09:45"
  sessionNumber: number;
  title: string;
  preview: string;
  category: string;
  focusScore: number;  // 0-100
  reflection: string;
  concepts: string[];
  bullets: string[];
}

interface AISessionNotesProps {
  sessions?: SessionNote[];
  onViewAll?: () => void;
}

// ── Default data ───────────────────────────────────────────────────────────
const defaultSessions: SessionNote[] = [
  {
    id: 1,
    date: "05_OCT_2024 // 09:45",
    sessionNumber: 429,
    title: "Graph Theory & BFS/DFS",
    preview: "Complex pattern recognition in adjacency lists...",
    category: "Algorithms",
    focusScore: 94,
    reflection:
      "Subject demonstrated high cognitive resonance during the implementation of Dijkstra's algorithm. Mental fatigue was non-existent during the first 90 minutes. Recommendation: Proceed to advanced heuristic-based search patterns (A*) in the next cycle.",
    concepts: ["Adjacency Lists", "Edge Weighting", "Priority Queues"],
    bullets: [
      "No significant interruptions recorded.",
      "Efficiency remains 15% above user baseline.",
      "Estimated retention half-life: 21 days.",
    ],
  },
  {
    id: 2,
    date: "04_OCT_2024 // 14:20",
    sessionNumber: 428,
    title: "React Concurrent Patterns",
    preview: "Exploring transitions and hook performance...",
    category: "Frontend",
    focusScore: 87,
    reflection:
      "Strong engagement with useTransition and useDeferredValue. Some context-switching overhead noted when switching between Suspense boundaries. Recommend deeper dive into concurrent rendering internals.",
    concepts: ["useTransition", "useDeferredValue", "Suspense"],
    bullets: [
      "2 browser tab switches detected (< 1 min total).",
      "Hook profiling shows 12% render reduction.",
      "Estimated retention half-life: 18 days.",
    ],
  },
  {
    id: 3,
    date: "03_OCT_2024 // 11:00",
    sessionNumber: 427,
    title: "System Design — Sharding",
    preview: "Database scaling strategies for high-throughput...",
    category: "System Design",
    focusScore: 91,
    reflection:
      "Excellent grasp of horizontal vs vertical sharding trade-offs. Consistent depth in analysing consistent hashing. Suggest practicing live system design with time constraints next session.",
    concepts: ["Consistent Hashing", "Shard Keys", "Replication"],
    bullets: [
      "No interruptions recorded.",
      "Cross-concept linking detected (aligns with CAP theorem from session #420).",
      "Estimated retention half-life: 25 days.",
    ],
  },
  {
    id: 4,
    date: "02_OCT_2024 // 08:30",
    sessionNumber: 426,
    title: "Rust Memory Safety",
    preview: "Ownership and borrowing deep-dive...",
    category: "Systems",
    focusScore: 79,
    reflection:
      "Ownership model clicked after 40 minutes of struggle. Lifetime annotations remain a friction point. High burnout risk—session ran 25 min over planned end. Recommend shorter 45-min sprints for Rust.",
    concepts: ["Ownership", "Borrowing", "Lifetimes"],
    bullets: [
      "Session exceeded target by 25 minutes.",
      "Burnout risk elevated — schedule buffer next session.",
      "Estimated retention half-life: 14 days.",
    ],
  },
];

// ── Component ──────────────────────────────────────────────────────────────
export default function AISessionNotes({
  sessions = defaultSessions,
  onViewAll,
}: AISessionNotesProps) {
  const [selectedId, setSelectedId] = useState<number>(sessions[0]?.id ?? 1);
  const selected = sessions.find((s) => s.id === selectedId) ?? sessions[0];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <h3 className="text-xs font-label font-bold uppercase tracking-[0.4em] text-on-surface-variant">
          AI_SESSION_NOTES
        </h3>
        <button
          onClick={onViewAll}
          className="text-[10px] font-label text-primary uppercase border border-primary/20 px-3 py-1 hover:bg-primary/10 transition-colors"
        >
          VIEW_ALL_LOGS
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[500px]">
        {/* ── List panel ── */}
        <div className="lg:col-span-4 bg-surface-container-low border border-outline-variant/10 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-outline-variant/10 bg-surface-container">
            <div className="text-[10px] font-label text-outline uppercase tracking-widest">
              Recent_Entries
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scroll-area">
            {sessions.map((session) => {
              const isActive = session.id === selectedId;
              return (
                <button
                  key={session.id}
                  onClick={() => setSelectedId(session.id)}
                  className={`w-full text-left p-4 border-b border-outline-variant/5 transition-colors group ${
                    isActive
                      ? "bg-primary/5 border-l-2 border-l-primary"
                      : "hover:bg-surface-container border-l-2 border-l-transparent"
                  }`}
                >
                  <div
                    className={`text-[9px] font-label uppercase mb-1 ${
                      isActive ? "text-primary" : "text-outline"
                    }`}
                  >
                    {session.date}
                  </div>
                  <div className="text-sm font-headline font-bold text-on-surface">
                    Session #{session.sessionNumber}: {session.title}
                  </div>
                  <div className="text-[10px] font-body text-outline mt-1 line-clamp-1">
                    {session.preview}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Detail panel ── */}
        {selected && (
          <div className="lg:col-span-8 bg-surface-container border border-outline-variant/10 p-8 flex flex-col">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h4 className="text-2xl font-headline font-black mb-1">
                  SESSION #{selected.sessionNumber} SUMMARY
                </h4>
                <div className="flex gap-4">
                  <span className="text-[10px] font-label text-outline uppercase">
                    Category:{" "}
                    <span className="text-primary">{selected.category}</span>
                  </span>
                  <span className="text-[10px] font-label text-outline uppercase">
                    Focus_Score:{" "}
                    <span className="text-primary">{selected.focusScore}%</span>
                  </span>
                </div>
              </div>
              <span className="px-2 py-1 bg-surface-container-highest border border-outline-variant/20 text-[10px] font-label text-on-surface-variant uppercase shrink-0">
                ARCHIVED_LOG
              </span>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto pr-2 scroll-area">
              {/* AI reflection */}
              <div className="bg-surface-container-high p-4 border-l-2 border-primary/50">
                <div className="text-[10px] font-label text-primary uppercase tracking-widest mb-2">
                  AI_REFLECTION
                </div>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  {selected.reflection}
                </p>
              </div>

              {/* Concepts */}
              <div className="space-y-4">
                <div className="text-[10px] font-label text-outline uppercase tracking-widest">
                  Key_Concepts_Retained
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.concepts.map((concept) => (
                    <span
                      key={concept}
                      className="px-3 py-1 bg-surface-container-highest border border-outline-variant/10 text-xs text-on-surface uppercase"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bullets */}
              <div className="text-xs font-label text-outline leading-loose border-t border-outline-variant/10 pt-6 space-y-1">
                {selected.bullets.map((bullet, i) => (
                  <div key={i} className="terminal-bullet">
                    {bullet}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
