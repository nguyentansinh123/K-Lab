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
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-white/[0.025] p-6 md:col-span-7 sm:p-7">
      {/* Background icon */}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
        <span className="material-symbols-outlined text-8xl">schema</span>
      </div>

      {/* Top */}
      <div className="z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="rounded-[999px] border border-primary/15 bg-primary/[0.07] px-3 py-1.5 text-[9px] font-label font-bold text-primary">
            COMPLETED
          </span>
          <span className="text-[10px] font-label text-outline">
            SESSION_{session.sessionNumber}
          </span>
        </div>
        <h4 className="max-w-md text-3xl font-headline font-bold leading-tight tracking-[-0.04em] md:text-4xl">
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
              <span className="material-symbols-outlined block text-lg leading-none">code</span>
              <span className="material-symbols-outlined block text-lg leading-none">terminal</span>
            </div>
          </div>
        </div>

        <button
          onClick={session.onViewLog}
          className="flex items-center gap-2 rounded-[999px] bg-primary px-5 py-3 font-label text-[10px] font-black uppercase tracking-[0.15em] text-on-primary outline-none transition-all hover:bg-primary-fixed active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary-fixed/70"
        >
          VIEW_FULL_LOG
          <span className="material-symbols-outlined block text-sm leading-none">open_in_new</span>
        </button>
      </div>
    </div>
  );
}
