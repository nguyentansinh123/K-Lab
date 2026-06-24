import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getSessionBetweenAPI } from "../../features/studysessions/SessionSlice";
import type { StudySessionDTO } from "../../fetchLib/studysessionapi";
import { useAppDispatch } from "../../hooks/dispatch";

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

const formatLocalDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const createLastSevenDays = (sessions: StudySessionDTO[]): FocusDay[] => {
  const sessionByDate = new Map(sessions.map((session) => [session.date, session]));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));

    const session = sessionByDate.get(formatLocalDate(date));

    return {
      label:
        index === 6
          ? "TODAY"
          : date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      hours: Number(((session?.totalDurationSeconds ?? 0) / 3600).toFixed(2)),
      isToday: index === 6,
    };
  });
};

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
    <div className="rounded-[0.8rem] border border-white/10 bg-surface-container-highest px-3 py-2 shadow-xl">
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
  data,
  percentageChange = 12.4,
  minHours = 4,
  maxHours = 8.2,
}: FocusTrendsChartProps) {
  const dispatch = useAppDispatch();
  const [lastSevenDays, setLastSevenDays] = useState<FocusDay[]>(() =>
    createLastSevenDays([]),
  );

  useEffect(() => {
    if (data) return;

    let ignore = false;

    const fetchLastSevenDays = async () => {
      const today = new Date();
      const sixDaysAgo = new Date(today);
      sixDaysAgo.setDate(today.getDate() - 6);

      try {
        const sessions = await dispatch(
          getSessionBetweenAPI({
            dateStart: formatLocalDate(sixDaysAgo),
            dateEnd: formatLocalDate(today),
          }),
        ).unwrap();

        if (!ignore) {
          setLastSevenDays(createLastSevenDays(sessions));
        }
      } catch (error) {
        console.error("Fetching seven-day focus trend failed", error);
      }
    };

    fetchLastSevenDays();

    return () => {
      ignore = true;
    };
  }, [data, dispatch]);

  const focusData = data ?? lastSevenDays;
  const peak = Math.max(...focusData.map((day) => day.hours));
  const chartData = focusData.map((d) => ({
    ...d,
    fill: getBarColor(d.hours, d.isToday, peak),
  }));

  return (
    <div className="relative flex h-64 flex-col overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-white/[0.025] p-5 sm:p-6">
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

      <div className="mt-1 flex justify-between border-t border-white/[0.05] pt-3">
        <div className="text-[10px] font-label text-outline uppercase">Min: {minHours}h</div>
        <div className="text-[10px] font-label text-outline uppercase">Max: {maxHours}h</div>
      </div>
    </div>
  );
}
