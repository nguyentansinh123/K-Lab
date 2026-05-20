import FocusTrendsChart, { type FocusDay } from "./FocusTrendsChart";
import ResourceAllocation, { type ResourceSlice } from "./ResourceAllocation";
import QuickStats, { type QuickStatsData } from "./QuickStats";

export interface InsightBullet {
  /** Plain text prefix */
  prefix: string;
  /** Highlighted span text (shown in primary or error color) */
  highlight?: string;
  /** Plain text suffix after highlight */
  suffix?: string;
  variant?: "default" | "warning";
}

interface CognitiveSynthesisProps {
  activeState?: string;
  focusDays?: FocusDay[];
  focusPercentageChange?: number;
  focusMinHours?: number;
  focusMaxHours?: number;
  resourceSlices?: ResourceSlice[];
  efficiency?: number;
  quickStats?: QuickStatsData;
  insights?: InsightBullet[];
}

const defaultInsights: InsightBullet[] = [
  {
    prefix: "Focus peak detected during ",
    highlight: "09:00–11:00",
    suffix: " deep-work block",
  },
  {
    prefix: "Retention forecast: ",
    highlight: "+12% improvement",
    suffix: " in Graph Theory concepts",
  },
  {
    prefix: "Risk: Potential burnout detected in Rust sessions—suggesting ",
    highlight: "shorter intervals",
    variant: "warning",
  },
];

export default function CognitiveSynthesis({
  activeState = "A+ PEAK_PERFORMANCE",
  focusDays,
  focusPercentageChange,
  focusMinHours,
  focusMaxHours,
  resourceSlices,
  efficiency,
  quickStats,
  insights = defaultInsights,
}: CognitiveSynthesisProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* ── Left: charts + insights ── */}
      <div className="lg:col-span-9 space-y-8">
        {/* Section header */}
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-primary font-label text-xs tracking-[0.3em] uppercase">
              <span className="material-symbols-outlined text-sm">psychology</span>
              AI_COGNITIVE_SYNTHESIS_REPORT
            </div>
            <h1 className="text-5xl font-headline font-black tracking-tighter leading-none">
              SYSTEM_
              <span className="text-primary glow-text-primary">INSIGHTS</span>
            </h1>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-[10px] font-label text-outline uppercase tracking-widest">
              Active_State
            </div>
            <div className="text-xl font-headline font-bold text-primary">
              {activeState}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FocusTrendsChart
            data={focusDays}
            percentageChange={focusPercentageChange}
            minHours={focusMinHours}
            maxHours={focusMaxHours}
          />
          <ResourceAllocation slices={resourceSlices} efficiency={efficiency} />
        </div>

        {/* Insight bullets */}
        <div className="space-y-3 text-sm border-l-2 border-primary/30 pl-6 py-2">
          {insights.map((insight, i) => (
            <div
              key={i}
              className={`terminal-bullet font-medium ${
                insight.variant === "warning" ? "text-error" : "text-on-surface"
              }`}
            >
              {insight.prefix}
              {insight.highlight && (
                <span
                  className={
                    insight.variant === "warning"
                      ? "text-error-dim"
                      : "text-primary"
                  }
                >
                  {insight.highlight}
                </span>
              )}
              {insight.suffix}
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: quick stats ── */}
      <div className="lg:col-span-3">
        <QuickStats data={quickStats} />
      </div>
    </section>
  );
}
