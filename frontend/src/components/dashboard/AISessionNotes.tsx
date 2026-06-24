import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ScrollRevealSection from "../ScrollRevealSection";

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
  const reduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<number>(sessions[0]?.id ?? 1);
  const selected = sessions.find((s) => s.id === selectedId) ?? sessions[0];

  return (
    <ScrollRevealSection className="space-y-6 rounded-[2rem] border border-white/[0.07] bg-black/40 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:p-7 lg:p-8">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="mb-3 w-fit rounded-[999px] bg-primary-fixed/[0.07] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.17em] text-primary-fixed">
            AI archive
          </div>
          <h3 className="text-2xl font-bold tracking-[-0.035em] text-on-surface sm:text-3xl">
            Session Notes
          </h3>
        </div>
        <button
          onClick={onViewAll}
          className="rounded-[999px] border border-primary/15 bg-primary/[0.04] px-4 py-2 text-[9px] font-label uppercase tracking-[0.14em] text-primary outline-none transition-colors hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          VIEW_ALL_LOGS
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:min-h-[500px] lg:grid-cols-12">
        {/* ── List panel ── */}
        <div className="flex flex-col overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-white/[0.025] lg:col-span-5 lg:max-h-[500px] xl:col-span-4">
          <div className="border-b border-white/[0.06] px-4 py-3">
            <div className="text-[9px] font-label uppercase tracking-[0.15em] text-outline">
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
                  className={`group m-1.5 block w-[calc(100%_-_0.75rem)] rounded-[1rem] border px-4 py-3.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/60 ${
                    isActive
                      ? "border-primary/12 bg-primary/[0.07]"
                      : "border-transparent hover:bg-white/[0.035]"
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
        <AnimatePresence mode="wait">
          {selected && (
          <motion.div
            key={selected.id}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            className="flex flex-col rounded-[1.5rem] border border-white/[0.06] bg-white/[0.025] p-5 sm:p-7 lg:col-span-7 lg:max-h-[500px] xl:col-span-8"
          >
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
              <span className="shrink-0 rounded-[999px] border border-white/[0.07] bg-white/[0.035] px-3 py-1.5 text-[9px] font-label uppercase tracking-[0.12em] text-on-surface-variant">
                ARCHIVED_LOG
              </span>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto pr-2 scroll-area">
              {/* AI reflection */}
              <div className="rounded-[1.15rem] border border-primary/10 bg-primary/[0.035] p-4">
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
                      className="rounded-[999px] border border-white/[0.07] bg-white/[0.035] px-3 py-1.5 text-[10px] uppercase text-on-surface"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bullets */}
              <div className="space-y-1 border-t border-white/[0.06] pt-5 text-xs font-label leading-loose text-outline">
                {selected.bullets.map((bullet, i) => (
                  <div key={i} className="terminal-bullet">
                    {bullet}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </ScrollRevealSection>
  );
}
