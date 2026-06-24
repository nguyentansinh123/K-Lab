import type { TimerTime } from "../../hooks/useTimer";

interface TimerDisplayProps {
  time: TimerTime;
  compact?: boolean;
}

function Digit({ value, compact }: { value: number; compact: boolean }) {
  return (
    <div
      className={`w-[2.05ch] shrink-0 text-center font-display font-light leading-none tracking-[-0.065em] tabular-nums text-primary neon-glow-subtle ${
        compact
          ? "text-[3.2rem] sm:text-[4.5rem] lg:text-[6rem] xl:text-[7.5rem]"
          : "text-[5rem] sm:text-[8rem] md:text-[13rem] lg:text-[17rem]"
      }`}
    >
      {value.toString().padStart(2, "0")}
    </div>
  );
}

function Separator() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 self-center pb-2 md:pb-4">
      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary/40 rounded-full" />
      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary/40 rounded-full" />
    </div>
  );
}

export default function TimerDisplay({ time, compact = false }: TimerDisplayProps) {
  return (
    <div className={`flex items-center justify-center animate-breathe ${compact ? "gap-2 sm:gap-3 lg:gap-5" : "gap-4 md:gap-10 lg:gap-14"}`}>
      <Digit value={time.hours} compact={compact} />
      <Separator />
      <Digit value={time.minutes} compact={compact} />
      <Separator />
      <Digit value={time.seconds} compact={compact} />
    </div>
  );
}
