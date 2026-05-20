import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

const getBarColor = (hours: number, isToday: boolean | undefined, peak: number) => {
  if (isToday) return "#9cff93";
  const r = hours / peak;
  if (r > 0.8) return "rgba(156,255,147,0.5)";
  if (r > 0.6) return "rgba(156,255,147,0.4)";
  if (r > 0.35) return "rgba(156,255,147,0.3)";
  return "rgba(156,255,147,0.2)";
};

interface TooltipContentProps {
  active?: boolean;
  payload?: Array<{ payload: FocusDay }>;
}

const CustomTooltip = ({ active, payload }: TooltipContentProps) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-surface-container-highest border border-outline-variant/20 px-3 py-2">
      <div className="text-[10px] font-label text-primary uppercase">{d.label}</div>
      <div className="text-sm font-headline font-bold text-on-surface">{d.hours}h</div>
    </div>
  );
};

const BarShape = (props: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  isToday?: boolean;
}) => {
  const { x = 0, y = 0, width = 0, height = 0, fill, isToday } = props;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      filter={isToday ? "url(#barGlow)" : undefined}
    />
  );
};

export default function FocusTrendsChart({
  data = defaultData,
  percentageChange = 12.4,
  minHours = 4,
  maxHours = 8.2,
}: FocusTrendsChartProps) {
  const peak = Math.max(...data.map((d) => d.hours));
  const chartData = data.map((d) => ({
    ...d,
    fill: getBarColor(d.hours, d.isToday, peak),
  }));

  return (
    <div className="bg-surface-container p-6 border border-outline-variant/10 relative overflow-hidden h-64 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">
          Focus_Trends_7D
        </div>
        <span className="text-[10px] font-label text-primary">+{percentageChange}%</span>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 0, left: 0, bottom: 0 }} barCategoryGap="18%">
            <defs>
              <filter id="barGlow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#777575", fontSize: 9, fontFamily: "Space Grotesk" }}
            />
            <YAxis hide />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(156,255,147,0.05)" }}
            />
            <Bar dataKey="hours" shape={<BarShape />}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 pt-3 border-t border-outline-variant/5 flex justify-between">
        <div className="text-[10px] font-label text-outline uppercase">Min: {minHours}h</div>
        <div className="text-[10px] font-label text-outline uppercase">Max: {maxHours}h</div>
      </div>
    </div>
  );
}
