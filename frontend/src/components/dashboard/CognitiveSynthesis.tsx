import FocusTrendsChart, { type FocusDay } from "./FocusTrendsChart";
import ResourceAllocation, { type ResourceSlice } from "./ResourceAllocation";
import NeuralSyncDiagnostic from "./NeuralSyncDiagnostic";
import ScrollRevealSection from "../ScrollRevealSection";

export interface InsightBullet {
  prefix: string;
  highlight?: string;
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
  syncPct?: number;
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
  syncPct,
  insights = defaultInsights,
}: CognitiveSynthesisProps) {
  return (
    <ScrollRevealSection className="grid grid-cols-1 gap-5 rounded-[2rem] border border-white/[0.07] bg-black/40 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:p-7 lg:p-8 xl:grid-cols-12">
      {/* ── Left: charts + insights (8/9 cols on xl/2xl) ── */}
      <div className="flex flex-col space-y-6 xl:col-span-8 2xl:col-span-9">
        {/* Section header */}
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-[999px] bg-primary-fixed/[0.07] px-3 py-1.5 font-label text-[9px] uppercase tracking-[0.17em] text-primary">
              <span className="material-symbols-outlined block text-sm leading-none">psychology</span>
              AI_COGNITIVE_SYNTHESIS_REPORT
            </div>
            <h1 className="text-3xl font-headline font-black leading-none tracking-[-0.05em] sm:text-4xl md:text-5xl">
              SYSTEM_<span className="text-primary">INSIGHTS</span>
            </h1>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-[10px] font-label text-outline uppercase tracking-widest">
              Active_State
            </div>
            <div className="mt-1 rounded-[999px] border border-primary/15 bg-primary/[0.05] px-4 py-2 font-headline text-sm font-bold text-primary md:text-base">
              {activeState}
            </div>
          </div>
        </div>

        {/* Charts grid */}
        <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-2">
          <FocusTrendsChart
            data={focusDays}
            percentageChange={focusPercentageChange}
            minHours={focusMinHours}
            maxHours={focusMaxHours}
          />
          <ResourceAllocation slices={resourceSlices} efficiency={efficiency} />
        </div>

        {/* Insight bullets */}
        <div className="space-y-2 rounded-[1.5rem] border border-primary/10 bg-primary/[0.035] p-4 font-medium sm:p-5">
          {insights.map((insight, i) => (
            <div
              key={i}
              className={`flex gap-3 rounded-[1rem] px-3 py-2 text-sm ${
                insight.variant === "warning" ? "text-error" : "text-on-surface"
              }`}
            >
              <span className={insight.variant === "warning" ? "text-error" : "text-primary"} aria-hidden="true">→</span>
              <span>
                {insight.prefix}
                {insight.highlight && (
                  <span className={insight.variant === "warning" ? "text-error-dim" : "text-primary"}>
                    {insight.highlight}
                  </span>
                )}
                {insight.suffix}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Neural Sync Diagnostic (4/3 cols on xl/2xl) ── */}
      <div className="xl:col-span-4 2xl:col-span-3 flex flex-col">
        <NeuralSyncDiagnostic syncPct={syncPct} />
      </div>
    </ScrollRevealSection>
  );
}
