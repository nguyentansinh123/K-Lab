interface TimerControlsProps {
  isRunning: boolean;
  isStartingActivity: boolean;
  onToggle: () => void;
  onStop: () => void;
}

export default function TimerControls({
  isRunning,
  isStartingActivity,
  onToggle,
  onStop,
}: TimerControlsProps) {
  return (
    <div className="flex flex-row gap-12 mt-16 opacity-40 hover:opacity-100 transition-opacity duration-500">
      <button
        onClick={onToggle}
        disabled={isStartingActivity}
        className={`bg-transparent font-mono font-light py-2 tracking-[0.3em] text-xs uppercase transition-all active:scale-95 flex items-center gap-3 border-b border-transparent ${
          isRunning
            ? "text-tertiary hover:drop-shadow-[0_0_8px_rgba(222,255,171,0.5)] hover:border-tertiary/50"
            : "text-primary hover:drop-shadow-[0_0_8px_rgba(156,255,147,0.5)] hover:border-primary/50"
        } disabled:cursor-wait disabled:opacity-60`}
      >
        <span className="material-symbols-outlined text-[1rem]">
          {isRunning ? "pause" : "play_arrow"}
        </span>
        {isStartingActivity ? "STARTING" : isRunning ? "PAUSE" : "START"}
      </button>

      <button
        onClick={onStop}
        className="bg-transparent text-on-surface-variant font-mono font-light py-2 tracking-[0.3em] text-xs uppercase transition-all hover:text-on-surface hover:drop-shadow-[0_0_8px_rgba(240,241,235,0.3)] active:scale-95 flex items-center gap-3 border-b border-transparent hover:border-on-surface/30"
      >
        <span className="material-symbols-outlined text-[1rem]">stop</span>
        STOP
      </button>
    </div>
  );
}
