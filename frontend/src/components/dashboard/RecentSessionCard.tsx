// Swap props with real API data when ready
export interface RecentSessionData {
  sessionNumber: number;
  title: string;
  duration: string; // e.g. "2h 15m"
  onViewLog?: () => void;
}

interface RecentSessionCardProps {
  session?: RecentSessionData;
}

const defaultSession: RecentSessionData = {
  sessionNumber: 429,
  title: "LeetCode — Graph Problems & Pathfinding",
  duration: "2h 15m",
};

export default function RecentSessionCard({
  session = defaultSession,
}: RecentSessionCardProps) {
  return (
    <div className="md:col-span-7 bg-surface-container p-8 flex flex-col justify-between relative group overflow-hidden border border-outline-variant/10">
      {/* Background icon */}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
        <span className="material-symbols-outlined text-8xl">schema</span>
      </div>

      {/* Top */}
      <div className="z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-label font-bold border border-primary/20">
            COMPLETED
          </span>
          <span className="text-[10px] font-label text-outline">
            SESSION_{session.sessionNumber}
          </span>
        </div>
        <h4 className="text-3xl md:text-4xl font-headline font-bold leading-tight max-w-md">
          {session.title}
        </h4>
      </div>

      {/* Bottom */}
      <div className="z-10 flex flex-wrap gap-4 items-end justify-between mt-8">
        <div className="flex gap-8">
          <div>
            <div className="text-[10px] font-label text-outline uppercase tracking-widest">
              Duration
            </div>
            <div className="text-xl font-headline font-bold">
              {session.duration}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-label text-outline uppercase tracking-widest">
              Stack
            </div>
            <div className="flex gap-2 mt-1">
              <span className="material-symbols-outlined text-lg">code</span>
              <span className="material-symbols-outlined text-lg">terminal</span>
            </div>
          </div>
        </div>

        <button
          onClick={session.onViewLog}
          className="bg-primary text-on-primary px-6 py-3 font-label text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-primary-fixed transition-all active:scale-95"
        >
          VIEW_FULL_LOG
          <span className="material-symbols-outlined text-sm">open_in_new</span>
        </button>
      </div>
    </div>
  );
}
