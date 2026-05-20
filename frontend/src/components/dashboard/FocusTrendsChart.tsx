// Swap `data` prop with real API response when ready
export interface FocusDay {
  label: string;
  hours: number;
  isToday?: boolean;
}

interface FocusTrendsChartProps {
  data?: FocusDay[];
  percentageChange?: number;
  minHours?: number;
  maxHours?: number;
}

const defaultData: FocusDay[] = [
  { label: "MON", hours: 3 },
  { label: "TUE", hours: 4.5 },
  { label: "WED", hours: 3.5 },
  { label: "THU", hours: 6 },
  { label: "FRI", hours: 8.5 },
  { label: "SAT", hours: 7.5 },
  { label: "TODAY", hours: 9.5, isToday: true },
];

export default function FocusTrendsChart({
  data = defaultData,
  percentageChange = 12.4,
  minHours = 4,
  maxHours = 8.2,
}: FocusTrendsChartProps) {
  const peak = Math.max(...data.map((d) => d.hours));

  const getBarClass = (hours: number, isToday?: boolean) => {
    if (isToday) return "bg-primary glow-primary";
    const ratio = hours / peak;
    if (ratio > 0.8) return "bg-primary/50";
    if (ratio > 0.6) return "bg-primary/40";
    if (ratio > 0.35) return "bg-primary/30";
    return "bg-primary/20";
  };

  return (
    <div className="bg-surface-container p-6 border border-outline-variant/10 relative overflow-hidden h-64 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">
          Focus_Trends_7D
        </div>
        <span className="text-[10px] font-label text-primary">
          +{percentageChange}%
        </span>
      </div>

      <div className="flex-1 flex items-end gap-1 px-2">
        {data.map((day) => (
          <div
            key={day.label}
            className={`flex-1 group relative hover:brightness-125 transition-all cursor-help ${getBarClass(
              day.hours,
              day.isToday
            )}`}
            style={{ height: `${(day.hours / peak) * 95}%` }}
          >
            <div
              className={`absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-label text-primary whitespace-nowrap transition-opacity ${
                day.isToday
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {day.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-outline-variant/5 flex justify-between">
        <div className="text-[10px] font-label text-outline uppercase">
          Min: {minHours}h
        </div>
        <div className="text-[10px] font-label text-outline uppercase">
          Max: {maxHours}h
        </div>
      </div>
    </div>
  );
}
