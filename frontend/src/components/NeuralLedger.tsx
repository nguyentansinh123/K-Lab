import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ScrollRevealSection from "./ScrollRevealSection";

function generateCells(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const opacity = Math.random();
    let color: string;
    let glow = "";
    let hours: string;

    if (opacity > 0.8) {
      color = "bg-primary-container";
      glow = "shadow-[0_0_8px_rgba(0,252,64,0.4)]";
      hours = `${(4 + Math.random() * 4).toFixed(1)}h`;
    } else if (opacity > 0.4) {
      color = "bg-primary/40";
      hours = `${(1 + Math.random() * 3).toFixed(1)}h`;
    } else {
      color = "bg-surface-container-high";
      hours = opacity > 0.15 ? `${(Math.random() * 1).toFixed(1)}h` : "0h";
    }

    return { id: i, color, glow, hours };
  });
}

export default function NeuralLedger() {
  const cells = useMemo(() => generateCells(350), []);
  const reduceMotion = useReducedMotion();

  return (
    <ScrollRevealSection
      className="overflow-hidden rounded-[2rem] border border-white/[0.07] bg-black/45 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-sm sm:p-8 md:p-10"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-[999px] bg-primary-fixed/[0.07] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-primary-fixed">
            <span className="h-1.5 w-1.5 rounded-[999px] bg-primary-fixed" />
            Learning signal
          </div>
          <h2 className="text-3xl font-bold tracking-[-0.045em] text-white sm:text-4xl">
            Commitment Chart
          </h2>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-outline">
            Daily study hours over the last 50 weeks
          </p>
        </div>
        <div className="w-fit rounded-[999px] border border-primary-fixed/15 bg-primary-fixed/[0.055] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-primary-fixed">
          Current Streak: 14 Days
        </div>
      </div>

      <div className="relative rounded-[1.5rem] border border-white/[0.06] bg-surface-container-lowest/70 p-5 sm:p-7">
        <div className="flex flex-wrap justify-center gap-1.5 md:justify-start">
          {cells.map((cell) => (
            <motion.div
              key={cell.id}
              whileHover={reduceMotion ? undefined : { scale: 1.45, zIndex: 10 }}
              transition={{ duration: 0.12 }}
              className={`group relative h-3.5 w-3.5 cursor-crosshair rounded-[3px] ${cell.color} ${cell.glow}`}
            >
              <div className="pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-[999px] border border-primary-fixed/20 bg-surface-container-lowest/95 px-2 py-1 text-[8px] font-bold text-primary-fixed opacity-0 transition-opacity group-hover:opacity-100">
                {cell.hours}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-7 flex flex-col items-start justify-between gap-4 text-[9px] font-bold uppercase tracking-[0.16em] text-outline sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-[2px] bg-surface-container-high" />
              No Study
            </span>
            <span className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-[2px] bg-primary/40" />
              1–3 hrs
            </span>
            <span className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-[2px] bg-primary-container" />
              4+ hrs
            </span>
          </div>
          <div>350-day activity window</div>
        </div>
      </div>
    </ScrollRevealSection>
  );
}
