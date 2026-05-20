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
    <div className="md:col-span-5 bg-surface-container p-8 flex flex-col border border-tertiary/30 relative">
      {/* Live badge */}
      <div className="absolute top-0 right-0 p-4">
        <div className="flex items-center gap-2">
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
          <div className="h-2 bg-surface-container-highest w-full border border-outline-variant/10 p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-tertiary/40 to-tertiary transition-all duration-700"
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
          <div className="bg-surface-container-high p-4 border border-outline-variant/10">
            <div className="text-[10px] font-label text-outline uppercase">
              Elapsed
            </div>
            <div className="text-2xl font-headline font-bold text-on-surface">
              {session.elapsed}
            </div>
          </div>
          <div className="bg-surface-container-high p-4 border border-outline-variant/10">
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
          <div className="text-xs font-label text-error-dim bg-error/5 border border-error/20 p-3 flex items-center gap-3">
            <span className="material-symbols-outlined text-sm">warning</span>
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
