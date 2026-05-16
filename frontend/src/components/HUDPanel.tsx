import { useCallback, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const WEEK_DATA = [
  { day: "M", hours: 5.2 },
  { day: "T", hours: 3.8 },
  { day: "W", hours: 6.4 },
  { day: "T", hours: 4.1 },
  { day: "F", hours: 7.2 },
  { day: "S", hours: 2.5 },
  { day: "S", hours: 4.8 },
];
const MAX_H = 8;
const CIRC = 2 * Math.PI * 54;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function HUDPanel({ visible }: { visible: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [m, setM] = useState({ x: 0, y: 0 });
  const [hovDay, setHovDay] = useState<number | null>(null);
  const [score, setScore] = useState(72);
  const [dragging, setDragging] = useState(false);
  const gaugeRef = useRef<SVGSVGElement>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setM({
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    });
  }, []);

  const onLeave = useCallback(() => setM({ x: 0, y: 0 }), []);

  // Gauge drag
  const dragGauge = useCallback((cx: number, cy: number) => {
    const svg = gaugeRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    let a = Math.atan2(cx - r.left - r.width / 2, -(cy - r.top - r.height / 2));
    if (a < 0) a += 2 * Math.PI;
    setScore(Math.max(0, Math.min(100, Math.round((a / (2 * Math.PI)) * 100))));
  }, []);

  const arcOff = CIRC - (CIRC * score) / 100;
  const arcColor = score > 66 ? "#00fc40" : score > 33 ? "#a0ed00" : "#ff7351";
  const totalH = WEEK_DATA.reduce((s, d) => s + d.hours, 0);

  // Parallax multipliers per layer
  const p = (depth: number) => ({
    transform: `translate(${m.x * depth}px, ${m.y * depth}px)`,
    transition: "transform 0.15s ease-out",
  });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full aspect-square cursor-default select-none"
    >
      {/* ---- Layer 0: Background glow ---- */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          ...p(5),
          background: `radial-gradient(ellipse at ${50 + m.x * 15}% ${50 + m.y * 15}%, rgba(0,252,64,0.12) 0%, transparent 60%)`,
        }}
      />

      {/* ---- Layer 1: Weekly bar chart (background layer) ---- */}
      <div
        className="absolute bottom-[10%] left-[4%] right-[4%] h-[44%]"
        style={p(8)}
      >
        <div className="relative w-full h-full bg-[#111111]/80 backdrop-blur-sm border border-[#222]/80 p-5 pt-4">
          {/* Chart header */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">
              This Week
            </span>
            <span className="text-sm text-primary-fixed font-bold tabular-nums">
              {totalH.toFixed(1)}h total
            </span>
          </div>

          {/* Bars */}
          <div className="flex items-end gap-[5%] h-[calc(100%-52px)]">
            {WEEK_DATA.map((d, i) => {
              const pct = (d.hours / MAX_H) * 100;
              const hovered = hovDay === i;
              const isToday = i === 2;

              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center justify-end h-full cursor-pointer"
                  onMouseEnter={() => setHovDay(i)}
                  onMouseLeave={() => setHovDay(null)}
                >
                  {/* Tooltip */}
                  <div
                    className={`mb-1.5 text-sm font-bold tabular-nums transition-all duration-150 ${
                      hovered ? "opacity-100 text-white -translate-y-0.5" : "opacity-0"
                    }`}
                  >
                    {d.hours}h
                  </div>

                  {/* Bar */}
                  <div
                    className="w-full relative overflow-hidden transition-all"
                    style={{
                      height: visible ? `${pct}%` : "0%",
                      transition: `height 0.7s ease-out ${0.2 + i * 0.06}s`,
                    }}
                  >
                    <div
                      className="absolute inset-0 transition-all duration-200"
                      style={{
                        background: hovered
                          ? "linear-gradient(to top, #00fc40, #00fc40cc)"
                          : isToday
                            ? "linear-gradient(to top, #00fc4030, #00fc40)"
                            : "linear-gradient(to top, #00fc4015, #00fc4080)",
                        boxShadow: hovered
                          ? "0 0 20px rgba(0,252,64,0.4), inset 0 0 10px rgba(0,252,64,0.2)"
                          : "none",
                      }}
                    />
                  </div>

                  {/* Day label */}
                  <span
                    className={`mt-2 text-xs uppercase tracking-wide font-medium ${
                      isToday
                        ? "text-primary-fixed font-bold"
                        : hovered
                          ? "text-white"
                          : "text-outline"
                    }`}
                  >
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---- Layer 2: Focus ring (mid layer) ---- */}
      <div
        className="absolute top-[3%] right-[3%] w-[44%] aspect-square"
        style={p(15)}
      >
        <div className="relative w-full h-full bg-[#0a0a0a]/90 backdrop-blur border border-[#222]/80 p-4 flex flex-col items-center justify-center">
          {/* Ring */}
          <div className="relative w-[82%] aspect-square">
            <svg
              ref={gaugeRef}
              viewBox="0 0 120 120"
              className={`w-full h-full ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
              onPointerDown={(e) => {
                setDragging(true);
                (e.target as HTMLElement).setPointerCapture(e.pointerId);
                dragGauge(e.clientX, e.clientY);
              }}
              onPointerMove={(e) => dragging && dragGauge(e.clientX, e.clientY)}
              onPointerUp={() => setDragging(false)}
            >
              <circle cx="60" cy="60" r="54" fill="none" stroke="#1a1a1a" strokeWidth="6" />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={arcColor}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={visible ? arcOff : CIRC}
                transform="rotate(-90 60 60)"
                style={{
                  transition: dragging
                    ? "stroke-dashoffset 0.05s, stroke 0.3s"
                    : "stroke-dashoffset 1s ease-out, stroke 0.3s",
                  filter: `drop-shadow(0 0 8px ${arcColor}80)`,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-4xl font-black text-white tabular-nums leading-none">
                  {score}
                  <span className="text-base" style={{ color: arcColor }}>%</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest mt-1 font-semibold" style={{ color: arcColor, opacity: 0.8 }}>
                  Focus
                </div>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-outline-variant uppercase tracking-wider mt-2 font-medium">
            Drag to explore
          </div>
        </div>
      </div>

      {/* ---- Layer 3: Today's stat card ---- */}
      <div
        className="absolute top-[5%] left-[2%] w-[50%]"
        style={p(20)}
      >
        <div className="bg-[#0a0a0a]/90 backdrop-blur border border-[#222]/80 p-5">
          <div className="text-xs text-primary-fixed/60 uppercase tracking-widest font-semibold mb-1.5">
            Today
          </div>
          <div className="text-4xl font-black text-white tracking-tight leading-none">
            6.4<span className="text-base text-primary-fixed font-semibold ml-1.5">hrs</span>
          </div>
          <div className="flex gap-4 mt-3">
            <MiniTag label="VS Code" time="3.2h" />
            <MiniTag label="Chrome" time="2.1h" />
            <MiniTag label="Notion" time="1.1h" />
          </div>
        </div>
      </div>

      {/* ---- Layer 3b: Streak card ---- */}
      <div
        className="absolute bottom-[58%] right-[1%] w-[30%]"
        style={p(25)}
      >
        <div className="bg-primary-container p-4">
          <div className="text-[10px] text-on-primary-container/60 uppercase tracking-widest font-semibold">
            Streak
          </div>
          <div className="text-3xl font-black text-on-primary-container tracking-tight leading-none mt-1">
            14<span className="text-sm font-semibold ml-1">days</span>
          </div>
        </div>
      </div>

      {/* ---- Layer 4: Floating pills ---- */}
      <div className="absolute top-[38%] left-[0%]" style={p(30)}>
        <div className="bg-[#111]/90 border border-[#222] px-3 py-2 flex items-center gap-2">
          <div className="w-2 h-2 bg-primary-fixed animate-pulse" />
          <span className="text-[11px] text-primary-fixed font-bold uppercase tracking-wider">
            Recording
          </span>
        </div>
      </div>

      <div className="absolute bottom-[4%] right-[2%]" style={p(22)}>
        <div className="bg-[#111]/90 border border-[#222] px-3 py-2">
          <span className="text-[11px] text-on-surface-variant uppercase tracking-wider">
            Avg <span className="text-white font-bold">4.9h</span>/day
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
function MiniTag({ label, time }: { label: string; time: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[11px] text-on-surface-variant">{label}</span>
      <span className="text-[11px] text-primary-fixed font-bold">{time}</span>
    </div>
  );
}
