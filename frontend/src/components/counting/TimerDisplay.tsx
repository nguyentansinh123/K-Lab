import type { TimerTime } from "../../hooks/useTimer";

interface TimerDisplayProps {
  time: TimerTime;
}

function Digit({ value }: { value: number }) {
  return (
    <div className="font-display text-[5rem] sm:text-[8rem] md:text-[13rem] lg:text-[17rem] font-light text-primary leading-none tracking-tight neon-glow-subtle">
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

export default function TimerDisplay({ time }: TimerDisplayProps) {
  return (
    <div className="flex items-center justify-center gap-4 md:gap-10 lg:gap-14 animate-breathe">
      <Digit value={time.hours} />
      <Separator />
      <Digit value={time.minutes} />
      <Separator />
      <Digit value={time.seconds} />
    </div>
  );
}
