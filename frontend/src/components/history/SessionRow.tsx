import { useState } from "react";
import type { Session } from "../../types/history";

interface SessionRowProps {
  session: Session;
  isPast?: boolean;
}

export default function SessionRow({ session, isPast }: SessionRowProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isPrimary = session.accentColor === "primary";
  const textAccent = isPrimary ? "text-primary" : "text-tertiary";
  const bgAccent = isPrimary ? "bg-primary" : "bg-tertiary";
  const hoverTint = isPrimary ? "hover:bg-primary/5" : "hover:bg-tertiary/5";
  const barShadow = isPrimary
    ? "0 0 10px rgba(156,255,147,0.5)"
    : "0 0 10px rgba(138,242,255,0.5)";

  return (
    <div
      className={`relative overflow-hidden transition-colors ${
        isPast ? "opacity-75 hover:opacity-100" : ""
      } ${isOpen ? "bg-surface-container-highest" : "bg-surface-container hover:bg-surface-container-highest"}`}
    >
      {/* Summary row */}
      <div
        className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:items-center p-6 relative cursor-pointer group/row ${hoverTint} transition-colors`}
        onClick={() => setIsOpen((o) => !o)}
      >
        {/* Left accent bar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 ${bgAccent} transition-opacity duration-200 ${
            isOpen ? "opacity-100" : "opacity-0 group-hover/row:opacity-100"
          }`}
        />

        {/* App */}
        <div className="md:col-span-3 flex items-center gap-3">
          <span className={`material-symbols-outlined ${textAccent} text-[20px]`}>
            {session.appIcon}
          </span>
          <span className="font-mono text-sm text-on-surface uppercase">{session.app}</span>
        </div>

        {/* Title */}
        <div className="md:col-span-4">
          <h3 className="font-body font-medium text-base text-on-surface truncate">{session.title}</h3>
        </div>

        {/* Duration */}
        <div className="md:col-span-2 font-mono text-sm text-on-surface-variant tabular-nums">
          {session.duration}
        </div>

        {/* Focus + action */}
        <div className="md:col-span-3 flex items-center justify-between pr-8">
          <div className={`font-mono text-sm ${textAccent} font-bold`}>
            {session.focus}% FOCUS
          </div>
          <div
            className={`flex gap-2 transition-all duration-200 ${
              isOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4 group-hover/row:opacity-100 group-hover/row:translate-x-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-8 h-8 flex items-center justify-center border border-primary/50 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary transition-colors ambient-glow-hover"
              title="REPLAY SESSION"
            >
              <span className="material-symbols-outlined text-[16px]">replay</span>
            </button>
          </div>
        </div>

        {/* Chevron */}
        <span
          className={`absolute right-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </div>

      {/* Detail panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="p-6 bg-surface border-t border-outline-variant/10 text-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Topic & Path */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <div className="text-[11px] font-mono text-on-surface-variant/80 uppercase mb-2 tracking-wider">
                  TOPIC / CATEGORY
                </div>
                <div className={`font-headline ${textAccent} text-base tracking-wide`}>
                  {session.topic}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-on-surface-variant/80 uppercase mb-2 tracking-wider">
                  ACTIVE PATH
                </div>
                <div className="flex items-center gap-3 font-mono text-xs bg-surface-container-low px-3 py-2 border border-outline-variant/20 overflow-hidden">
                  <span className={`material-symbols-outlined text-[16px] ${textAccent} shrink-0`}>
                    {session.pathIcon}
                  </span>
                  <span className="text-on-surface truncate">{session.path}</span>
                </div>
              </div>
            </div>

            {/* Session Notes */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="text-[11px] font-mono text-on-surface-variant/80 uppercase mb-2 tracking-wider">
                SESSION NOTES
              </div>
              <div className="bg-surface-container-low p-4 border border-outline-variant/20 flex-1">
                <p className="font-body text-on-surface-variant leading-relaxed">{session.notes}</p>
              </div>
            </div>

            {/* Cognitive Load */}
            <div className="lg:col-span-4 flex flex-col">
              <div className="text-[11px] font-mono text-on-surface-variant/80 uppercase mb-2 tracking-wider">
                COGNITIVE LOAD
              </div>
              <div className="bg-surface-container-low p-4 border border-outline-variant/20 space-y-4 flex-1">
                <div className="flex items-end justify-between">
                  <span className="font-headline text-2xl text-on-surface leading-none">
                    {session.cognitive.avg}%
                  </span>
                  <span className={`font-mono text-[10px] ${textAccent} tracking-widest`}>
                    {session.cognitive.label}
                  </span>
                </div>
                <div className="h-1.5 bg-surface-variant w-full overflow-hidden">
                  <div
                    className={`h-full ${bgAccent}`}
                    style={{ width: `${session.cognitive.avg}%`, boxShadow: barShadow }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[10px] text-on-surface-variant/70">
                  <span>BASE: {session.cognitive.base}%</span>
                  <span>PEAK: {session.cognitive.peak}%</span>
                </div>
                {session.cognitive.alignment !== undefined && (
                  <div className="pt-4 border-t border-outline-variant/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-mono text-on-surface-variant/60 uppercase">
                        FOCUS_ALIGNMENT
                      </span>
                      <span className={`font-mono text-xs ${textAccent}`}>
                        {session.cognitive.alignment}%
                      </span>
                    </div>
                    <div className="h-1 bg-primary/20 w-full">
                      <div
                        className={`h-full ${bgAccent}`}
                        style={{ width: `${session.cognitive.alignment}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
