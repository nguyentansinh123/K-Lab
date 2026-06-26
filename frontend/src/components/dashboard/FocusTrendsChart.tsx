import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
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
  const peak = Math.max(1, ...focusData.map((day) => day.hours), maxHours);
  const chartData = focusData.map((d, index) => ({
    ...d,
    baseline: Math.max(0, d.hours - 0.85),
    index,
  }));
  const deltaPrefix = percentageChange >= 0 ? "+" : "";

  return (
    <div className="relative flex h-64 flex-col overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-white/[0.025] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] sm:p-6">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">
            Focus_Trends_7D
          </div>
          <div className="mt-1 font-headline text-2xl font-black tracking-tight text-white">
            {focusData.at(-1)?.hours.toFixed(1) ?? "0.0"}
            <span className="ml-1 text-sm text-primary">h</span>
          </div>
        </div>
        <span className="rounded-[999px] border border-primary/15 bg-primary/[0.06] px-3 py-1.5 text-[10px] font-label font-bold text-primary">
          {deltaPrefix}
          {percentageChange}%
        </span>
      </div>

      <div className="relative flex-1 min-h-0 min-w-0">
        <div className="pointer-events-none absolute bottom-8 left-2 top-2 w-px bg-gradient-to-b from-primary/35 via-white/[0.08] to-transparent" />
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -24, bottom: 0 }}
          >
            <defs>
              <linearGradient id="focusTrendArea" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#9cff93" stopOpacity="0.18" />
                <stop offset="58%" stopColor="#00fc40" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#00fc40" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="focusTrendLine" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#abfc00" />
                <stop offset="52%" stopColor="#9cff93" />
                <stop offset="100%" stopColor="#00fc40" />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="rgba(255,255,255,0.055)"
              strokeDasharray="3 8"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#777575", fontSize: 9, fontFamily: "Space Grotesk" }}
              tickMargin={10}
            />
            <YAxis domain={[0, peak]} hide />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "rgba(156,255,147,0.18)",
                strokeDasharray: "3 5",
              }}
            />
            <ReferenceLine
              y={minHours}
              stroke="rgba(222,255,171,0.22)"
              strokeDasharray="4 8"
              strokeWidth={1}
            />
            <Area
              activeDot={{
                fill: "#0e0e0e",
                r: 5,
                stroke: "#9cff93",
                strokeWidth: 2,
              }}
              dataKey="hours"
              dot={{
                fill: "#0e0e0e",
                r: 3,
                stroke: "#9cff93",
                strokeWidth: 1.5,
              }}
              fill="url(#focusTrendArea)"
              fillOpacity={1}
              isAnimationActive
              stroke="url(#focusTrendLine)"
              strokeLinecap="round"
              strokeWidth={3}
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex justify-between border-t border-white/[0.05] pt-3">
        <div className="text-[10px] font-label text-outline uppercase">Min: {minHours}h</div>
        <div className="text-[10px] font-label text-outline uppercase">Max: {maxHours}h</div>
      </div>
    </div>
  );
}
