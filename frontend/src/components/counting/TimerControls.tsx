interface TimerControlsProps {
  isRunning: boolean;
  isStartingActivity: boolean;
  isSplit: boolean;
  compact?: boolean;
  onToggle: () => void;
  onStop: () => void;
  onSplit: () => void;
}

export default function TimerControls({
  isRunning,
  isStartingActivity,
  isSplit,
  compact = false,
  onToggle,
  onStop,
  onSplit,
}: TimerControlsProps) {
  return (
    <div className={`mt-12 flex flex-row flex-wrap items-center justify-center opacity-55 transition-opacity duration-500 hover:opacity-100 ${compact ? "gap-2 sm:gap-3" : "gap-3 sm:gap-5"}`}>
      <button
        onClick={onToggle}
        disabled={isStartingActivity}
        className={`flex items-center gap-2 rounded-[999px] border px-4 py-2.5 font-mono text-[10px] font-light uppercase tracking-[0.2em] outline-none transition-all active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary/60 ${
          isRunning
            ? "border-tertiary/15 bg-tertiary/[0.06] text-tertiary hover:border-tertiary/30"
            : "border-primary/15 bg-primary/[0.06] text-primary hover:border-primary/30"
        } disabled:cursor-wait disabled:opacity-60`}
      >
        <span className="material-symbols-outlined block text-[1rem] leading-none">
          {isRunning ? "pause" : "play_arrow"}
        </span>
        {isStartingActivity ? "STARTING" : isRunning ? "PAUSE" : "START"}
      </button>

      <button
        onClick={onStop}
        className="flex items-center gap-2 rounded-[999px] border border-white/[0.07] bg-white/[0.035] px-4 py-2.5 font-mono text-[10px] font-light uppercase tracking-[0.2em] text-on-surface-variant outline-none transition-all hover:border-white/15 hover:text-on-surface active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-white/30"
      >
        <span className="material-symbols-outlined block text-[1rem] leading-none">stop</span>
        STOP
      </button>

      <button
        onClick={onSplit}
        aria-pressed={isSplit}
        className={`flex items-center gap-2 rounded-[999px] border px-4 py-2.5 font-mono text-[10px] font-light uppercase tracking-[0.2em] outline-none transition-all active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-primary/60 ${
          isSplit
            ? "border-primary/20 bg-primary/10 text-primary"
            : "border-white/[0.07] bg-white/[0.035] text-on-surface-variant hover:border-primary/15 hover:text-primary"
        }`}
      >
        <span className="material-symbols-outlined block text-[1rem] leading-none">
          {isSplit ? "collapse_content" : "splitscreen"}
        </span>
        {isSplit ? "Close Camera" : "Open Camera"}
      </button>
    </div>
  );
}
