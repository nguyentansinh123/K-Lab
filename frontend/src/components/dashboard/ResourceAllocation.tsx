import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { getSessionBetweenAPI } from "../../features/studysessions/SessionSlice";
import type { StudySessionDTO } from "../../fetchLib/studysessionapi";
import { useAppDispatch } from "../../hooks/dispatch";

export interface ResourceSlice {
  label: string;
  percentage: number;
  colorClass: string;
  color?: string;
}

interface ResourceAllocationProps {
  slices?: ResourceSlice[];
  efficiency?: number;
}

type AllocationData = {
  slices: ResourceSlice[];
  activePercentage: number;
};

const emptyAllocation: AllocationData = {
  slices: [
    {
      label: "Active_Time",
      percentage: 0,
      colorClass: "bg-primary",
      color: "#9cff93",
    },
    {
      label: "Pause_Time",
      percentage: 0,
      colorClass: "bg-error",
      color: "#ffb4ab",
    },
  ],
  activePercentage: 0,
};

const formatLocalDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const calculateAllocation = (sessions: StudySessionDTO[]): AllocationData => {
  let activeSeconds = 0;
  let pauseSeconds = 0;

  sessions.forEach((session) => {
    session.activities.forEach((activity) => {
      const duration = Number(activity.duration);
      if (Number.isFinite(duration) && duration > 0) {
        activeSeconds += duration;
      }

      activity.activityPauses?.forEach((pause) => {
        if (!pause.pauseTimeStart || !pause.pauseTimeEnd) return;

        const start = new Date(pause.pauseTimeStart).getTime();
        const end = new Date(pause.pauseTimeEnd).getTime();
        const durationSeconds = (end - start) / 1000;

        if (Number.isFinite(durationSeconds) && durationSeconds > 0) {
          pauseSeconds += durationSeconds;
        }
      });
    });
  });

  const totalTrackedSeconds = activeSeconds + pauseSeconds;
  const activePercentage =
    totalTrackedSeconds === 0
      ? 0
      : Math.round((activeSeconds / totalTrackedSeconds) * 100);
  const pausePercentage = totalTrackedSeconds === 0 ? 0 : 100 - activePercentage;

  return {
    slices: [
      {
        label: "Active_Time",
        percentage: activePercentage,
        colorClass: "bg-primary",
        color: "#9cff93",
      },
      {
        label: "Pause_Time",
        percentage: pausePercentage,
        colorClass: "bg-error",
        color: "#ffb4ab",
      },
    ],
    activePercentage,
  };
};

export default function ResourceAllocation({
  slices,
  efficiency,
}: ResourceAllocationProps) {
  const dispatch = useAppDispatch();
  const [allocation, setAllocation] = useState<AllocationData>(emptyAllocation);

  useEffect(() => {
    if (slices && efficiency !== undefined) return;

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
          setAllocation(calculateAllocation(sessions));
        }
      } catch (error) {
        console.error("Fetching seven-day resource allocation failed", error);
      }
    };

    fetchLastSevenDays();

    return () => {
      ignore = true;
    };
  }, [dispatch, efficiency, slices]);

  const displayedSlices = slices ?? allocation.slices;
  const displayedEfficiency = efficiency ?? allocation.activePercentage;

  return (
    <div className="flex h-64 flex-col rounded-[1.5rem] border border-white/[0.06] bg-white/[0.025] p-5 sm:p-6">
      <div className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-6">
        Active_Vs_Pause_7D
      </div>

      <div className="flex-1 flex items-center justify-around">
        {/* Donut chart */}
        <div className="relative w-32 h-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={displayedSlices}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={56}
                dataKey="percentage"
                strokeWidth={0}
                startAngle={90}
                endAngle={-270}
                isAnimationActive={false}
              >
                {displayedSlices.map((slice, i) => (
                  <Cell key={i} fill={slice.color ?? "#9cff93"} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center label overlaid with absolute positioning */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-xl font-headline font-black">
              {displayedEfficiency}%
            </div>
            <div className="text-[8px] font-label text-outline uppercase">
              Active Time
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {displayedSlices.map((slice) => (
            <div key={slice.label} className="flex items-center gap-2">
              <div className={`h-2 w-2 shrink-0 rounded-full ${slice.colorClass}`} />
              <div className="text-[10px] font-label text-on-surface uppercase">
                {slice.label} ({slice.percentage}%)
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
