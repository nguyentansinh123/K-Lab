import type { DayLog } from "../../types/history";
import SessionRow from "./SessionRow";

interface SessionGroupProps {
  group: DayLog;
}

export default function SessionGroup({ group }: SessionGroupProps) {
  const lineColor = group.isPast ? "bg-outline-variant/30" : "bg-primary/30";
  const dateColor = group.isPast ? "text-on-surface-variant" : "text-on-surface";
  const focusColor = group.isPast ? "text-on-surface-variant" : "text-primary";

  return (
    <section>
      {/* Date header */}
      <div className="flex items-center gap-6 mb-6">
        <div className={`h-px ${lineColor} flex-1`} />
        <div className="flex items-center gap-8 bg-surface px-4 py-2 border border-outline-variant/15">
          <div className={`font-mono text-sm tracking-wider ${dateColor}`}>
            <span className={group.isPast ? "opacity-50" : "text-on-surface-variant"}>DATE:</span>{" "}
            [{group.date}]
          </div>
          <div className={`font-mono text-sm tracking-wider ${focusColor}`}>
            <span className={group.isPast ? "opacity-50" : "text-on-surface-variant"}>
              TOTAL_FOCUS:
            </span>{" "}
            [{group.totalFocus}]
          </div>
        </div>
        <div className={`h-px ${lineColor} flex-1`} />
      </div>

      {/* Table */}
      <div className="bg-surface-container border border-outline-variant/15">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-outline-variant/15 bg-surface-container-low font-headline text-xs tracking-widest text-on-surface-variant uppercase">
          <div className="col-span-3">App_Name</div>
          <div className="col-span-4">Title</div>
          <div className="col-span-2">Duration</div>
          <div className="col-span-3">Focus_Strength</div>
        </div>
        <div className="divide-y divide-outline-variant/10">
          {group.sessions.map((session) => (
            <SessionRow key={session.id} session={session} isPast={group.isPast} />
          ))}
        </div>
      </div>
    </section>
  );
}
