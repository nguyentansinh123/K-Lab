import type { ToolStat } from "../../types/history";

const TOOLS: ToolStat[] = [
  {
    name: "VS Code",
    icon: "terminal",
    accentColor: "primary",
    badge: "DOMINANT",
    thisWeek: "24h 12m",
    thisMonth: "98h 45m",
  },
  {
    name: "Chrome",
    icon: "public",
    accentColor: "tertiary",
    thisWeek: "12h 45m",
    thisMonth: "52h 10m",
  },
  {
    name: "Notion",
    icon: "description",
    accentColor: "primary",
    thisWeek: "8h 15m",
    thisMonth: "34h 50m",
  },
];

export default function ToolAnalytics() {
  return (
    <section className="mb-16 bg-surface-container border border-outline-variant/15 p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-primary text-sm">analytics</span>
        <h2 className="font-headline text-xs tracking-[0.2em] text-on-surface-variant uppercase">
          TOOL_ANALYTICS // AGGREGATED_USAGE
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TOOLS.map((tool) => {
          const textAccent = tool.accentColor === "primary" ? "text-primary" : "text-tertiary";
          return (
            <div key={tool.name} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined ${textAccent} text-[18px]`}>
                    {tool.icon}
                  </span>
                  <span className="font-mono text-xs text-on-surface uppercase">{tool.name}</span>
                </div>
                {tool.badge && (
                  <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5">
                    {tool.badge}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {(
                  [
                    ["THIS_WEEK", tool.thisWeek],
                    ["THIS_MONTH", tool.thisMonth],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="bg-surface-container-low p-3 border border-outline-variant/10">
                    <div className="text-[9px] font-mono text-on-surface-variant/60 uppercase mb-1">
                      {label}
                    </div>
                    <div className="font-mono text-sm text-on-surface">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
