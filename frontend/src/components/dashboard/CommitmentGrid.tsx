import { useEffect, useMemo, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { useAppDispatch, useAppSelector } from "../../hooks/dispatch";
import { getSessionBetweenAPI } from "../../features/studysessions/SessionSlice";

interface ActivityData {
  date: string;
  count: number;
  level: number;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2];

// grid heat data generator
function generateYearData(year: number): ActivityData[] {
  const data: ActivityData[] = [];
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const isFuture = d > today;
    const rand = Math.random();
    const level = isFuture
      ? 0
      : rand > 0.88
        ? 4
        : rand > 0.72
          ? 3
          : rand > 0.52
            ? 2
            : rand > 0.28
              ? 1
              : 0;
    data.push({ date: dateStr, count: level * 2, level });
  }
  return data;
}


// right chart data
const performanceMetrics = [
  {
    label: "Deep Work Capacity",
    value: "94% OPTIMAL",
    pct: 94,
    color: "bg-primary",
  },
  {
    label: "Cognitive Sync Rate",
    value: "0.98 INDEX",
    pct: 98,
    color: "bg-on-surface",
  },
  {
    label: "Weekly Milestone",
    value: "45/60 HRS",
    pct: 75,
    color: "bg-tertiary",
  },
];

export default function CommitmentGrid() {
  const [year, setYear] = useState(CURRENT_YEAR);
  const calendarData = useMemo(() => generateYearData(year), [year]);
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch()
  
  // Need fix because POST cant have body
  const testFunc = async () => {
    const t = await dispatch(getSessionBetweenAPI({
      dateStart: "2026-06-01",
      dateEnd: "2026-06-19",
    })).unwrap()
    return t
  }
  
  useEffect(()=>{
    
    const data = testFunc()
    console.log("This is session data")
    console.log(data);

  }, [])

  // user info
  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}` || "KL";
  const displayName = user
    ? `${user.firstName} ${user.lastName}`.toUpperCase()
    : "OPERATOR_01";

  return (
    <section className="space-y-6">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="flex items-center gap-4">
          <h3 className="text-xs font-label font-bold uppercase tracking-[0.4em] text-on-surface-variant">
            Consistency_Grid
          </h3>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="bg-surface-container border border-outline-variant/20 text-on-surface text-[10px] font-label py-1 px-2 focus:outline-none focus:border-primary"
          >
            {/* years drop down*/}
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y === CURRENT_YEAR ? "This Year" : y}
              </option>
            ))}
          </select>
        </div>
        <div className="text-[10px] font-body text-outline">
          Each square = 30 mins of deep work
        </div>
      </div>

      {/* Calendar + Profile card row */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* Activity calendar */}
        <div className="inline-block bg-surface-container p-6 lg:p-8 overflow-x-auto hide-scrollbar border border-outline-variant/10">
          <ActivityCalendar
            data={calendarData}
            theme={{
              dark: [
                "#1a1919",
                "rgba(156,255,147,0.2)",
                "rgba(156,255,147,0.45)",
                "rgba(156,255,147,0.7)",
                "#9cff93",
              ],
            }}
            colorScheme="dark"
            showWeekdayLabels
            showColorLegend={false}
            showTotalCount={false}
            blockSize={12}
            blockMargin={3}
            fontSize={11}
            style={{ color: "#777575" }}
          />

          {/* Custom legend */}
          <div className="mt-6 flex items-center gap-2 text-[10px] font-label text-outline">
            Less focus
            <div className="flex gap-[3px] ml-2 mr-2">
              {(
                [
                  "#1a1919",
                  "rgba(156,255,147,0.2)",
                  "rgba(156,255,147,0.4)",
                  "rgba(156,255,147,0.6)",
                  "rgba(156,255,147,0.8)",
                  "#9cff93",
                ] as string[]
              ).map((color, i) => (
                <div
                  key={i}
                  className="w-[12px] h-[12px]"
                  style={{
                    backgroundColor: color,
                    boxShadow:
                      i === 5 ? "0 0 6px rgba(156,255,147,0.4)" : undefined,
                  }}
                />
              ))}
            </div>
            More focus
          </div>
        </div>

        {/* Operator profile card */}
        <div className="bg-surface-container border border-outline-variant/10 flex flex-col overflow-hidden w-full xl:w-80 shrink-0 xl:self-stretch">
          {/* Profile top */}
          <div className="p-4 flex items-center gap-3 relative bg-surface-container-high/50 border-b border-outline-variant/10">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <div className="relative shrink-0">
              {user?.imgUrl ? (
                <img
                  src={user.imgUrl}
                  alt="Operator"
                  className="w-14 h-14 border-2 border-primary/50 object-cover grayscale contrast-150"
                />
              ) : (
                <div className="w-14 h-14 border-2 border-primary/50 bg-surface-container-highest flex items-center justify-center font-headline text-base font-black text-primary">
                  {initials}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-surface-container sync-pulse" />
            </div>
            <div className="flex-1 space-y-0.5 min-w-0">
              <div className="text-[9px] font-label text-outline uppercase tracking-widest">
                Active_Operator
              </div>
              <div className="text-sm font-headline font-black text-on-surface tracking-tighter truncate">
                {displayName}
              </div>
              <div className="inline-flex px-1.5 py-0.5 bg-primary/10 border border-primary/20 text-[9px] font-label text-primary font-bold tracking-widest uppercase">
                RANK: KINETIC_LEAD
              </div>
            </div>
          </div>

          {/* Performance metrics */}
          <div className="p-4 flex-1 flex flex-col justify-between gap-3">
            {performanceMetrics.map((m) => (
              <div key={m.label} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-label text-outline uppercase tracking-widest">
                    {m.label}
                  </span>
                  <span
                    className={`text-[10px] font-body uppercase font-bold ${
                      m.color === "bg-primary"
                        ? "text-primary"
                        : m.color === "bg-tertiary"
                          ? "text-tertiary"
                          : "text-on-surface"
                    }`}
                  >
                    {m.value}
                  </span>
                </div>
                <div className="h-1 w-full bg-surface-container-highest overflow-hidden">
                  <div
                    className={`h-full ${m.color} transition-all duration-700`}
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
