import { useMemo } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

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
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={`px-8 md:px-16 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="border-l-4 border-primary-container pl-6 mb-12">
        <h2 className="text-4xl font-bold tracking-tighter uppercase text-white">
          Commitment Chart
        </h2>
        <p className="text-outline uppercase text-xs tracking-widest mt-1">
          Daily study hours over the last 50 weeks
        </p>
      </div>

      <div className="bg-surface-container-lowest p-8 border border-outline-variant/15 relative">
        <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
          {cells.map((cell) => (
            <div
              key={cell.id}
              className={`w-3.5 h-3.5 ${cell.color} ${cell.glow} transition-all duration-150 hover:scale-125 hover:brightness-125 cursor-crosshair relative group`}
            >
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] font-bold text-primary-fixed bg-surface-container-lowest/95 border border-primary-fixed/20 px-1.5 py-0.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                {cell.hours}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-outline font-bold">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-surface-container-high" />
              No Study
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary/40" />
              1–3 hrs
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-container" />
              4+ hrs
            </span>
          </div>
          <div className="text-primary-fixed">Current Streak: 14 Days</div>
        </div>
      </div>
    </section>
  );
}
