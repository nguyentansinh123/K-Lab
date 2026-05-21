interface StatusBadgeProps {
  isRunning: boolean;
}

export default function StatusBadge({ isRunning }: StatusBadgeProps) {
  return (
    <div className="inline-flex items-center gap-4 px-6 py-2 border border-outline/10 bg-surface/50 backdrop-blur-sm rounded-full">
      <div className="flex items-center gap-3">
        <div
          className={`w-1.5 h-1.5 rounded-full ${
            isRunning ? "bg-primary animate-pulse opacity-70" : "bg-outline opacity-50"
          }`}
        />
        <span className="font-mono text-[11px] tracking-[0.25em] text-primary/80 uppercase">
          {isRunning ? "SESSION_ACTIVE" : "SYSTEM_CALIBRATED"}
        </span>
      </div>
      <div className="w-px h-3 bg-outline/20" />
      <span className="font-mono text-[11px] font-light tracking-[0.2em] text-on-surface-variant uppercase">
        {isRunning ? "FOCUS_MODE_ACTIVE" : "STANDBY"}
      </span>
    </div>
  );
}
