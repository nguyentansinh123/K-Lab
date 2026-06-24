// Swap props with real API / WebSocket data when ready
export interface ActiveSessionData {
  subject: string;
  elapsed: string;    // formatted "MM:SS"
  target: string;     // formatted "MM:SS"
  attentionPct: number;
  distraction?: string; // e.g. "Chrome (3 mins)"
}

interface ActiveFocusCardProps {
  session?: ActiveSessionData;
}

const defaultSession: ActiveSessionData = {
  subject: "ACTIVE_FOCUS",
  elapsed: "45:12",
  target: "60:00",
  attentionPct: 88,
  distraction: "Chrome (3 mins)",
};

export default function ActiveFocusCard({
  session = defaultSession,
}: ActiveFocusCardProps) {
  return (
    <div className="relative flex flex-col rounded-[1.5rem] border border-tertiary/15 bg-tertiary/[0.025] p-6 md:col-span-5 sm:p-7">
      {/* Live badge */}
      <div className="absolute right-4 top-4">
        <div className="flex items-center gap-2 rounded-[999px] border border-tertiary/10 bg-tertiary/[0.05] px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary" />
          </span>
          <span className="text-[10px] font-label text-tertiary font-bold tracking-widest">
            LIVE_TRACKING
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="mb-8">
        <div className="text-[10px] font-label text-tertiary uppercase tracking-widest mb-1">
          Session_Active
        </div>
        <h4 className="text-3xl font-headline font-black uppercase">
          {session.subject}
        </h4>
      </div>

      {/* Body */}
      <div className="space-y-6 flex-1">
        {/* Attention meter */}
        <div>
          <div className="text-[10px] font-label text-outline uppercase mb-2">
            Attention_Meter
          </div>
          <div className="h-2 w-full overflow-hidden rounded-[999px] border border-white/[0.06] bg-surface-container-highest p-[1px]">
            <div
              className="h-full rounded-[999px] bg-gradient-to-r from-tertiary/40 to-tertiary transition-all duration-700"
              style={{
                width: `${session.attentionPct}%`,
                boxShadow: "0 0 10px rgba(222,255,171,0.4)",
              }}
            />
          </div>
          <div className="mt-1 text-right text-[10px] font-label text-tertiary">
            {session.attentionPct}% SYNC
          </div>
        </div>

        {/* Timer tiles */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-[1.15rem] border border-white/[0.06] bg-white/[0.025] p-4">
            <div className="text-[10px] font-label text-outline uppercase">
              Elapsed
            </div>
            <div className="text-2xl font-headline font-bold text-on-surface">
              {session.elapsed}
            </div>
          </div>
          <div className="rounded-[1.15rem] border border-white/[0.06] bg-white/[0.025] p-4">
            <div className="text-[10px] font-label text-outline uppercase">
              Target
            </div>
            <div className="text-2xl font-headline font-bold text-on-surface">
              {session.target}
            </div>
          </div>
        </div>

        {/* Distraction warning */}
        {session.distraction && (
          <div className="flex items-center gap-3 rounded-[1rem] border border-error/15 bg-error/[0.045] p-3 text-xs font-label text-error-dim">
            <span className="material-symbols-outlined block text-sm leading-none">warning</span>
            <span>
              Detected distractions:{" "}
              <strong className="text-error">{session.distraction}</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
