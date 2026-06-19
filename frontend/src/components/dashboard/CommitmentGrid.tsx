import { useEffect, useMemo, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { useAppDispatch, useAppSelector } from "../../hooks/dispatch";
import { getSessionBetweenAPI } from "../../features/studysessions/SessionSlice";
import type { StudySessionDTO } from "../../fetchLib/studysessionapi";

interface ActivityData {
  date: string;
  count: number;
  level: number;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2];

const dateStartAndDateEnd = (years: Array<number>): Array<string> => {
  return [`${years[years.length - 1]}-01-01`, `${years[0]}-12-31`];
};

// grid heat data generator mock
// function generateYearData(year: number): ActivityData[] {
//   const data: ActivityData[] = [];
//   const today = new Date();
//   today.setHours(23, 59, 59, 999);

//   const start = new Date(year, 0, 1);
//   const end = new Date(year, 11, 31);

//   for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
//     const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
//     const isFuture = d > today;
//     const rand = Math.random();
//     const level = isFuture
//       ? 0
//       : rand > 0.88
//         ? 4
//         : rand > 0.72
//           ? 3
//           : rand > 0.52
//             ? 2
//             : rand > 0.28
//               ? 1
//               : 0;
//     data.push({ date: dateStr, count: level * 2, level });
//   }
//   return data;
// }

//TODO: need adjustment less than 1 mins should still be shown as long as u show up
const decidingLevel = (mins: number): number => {
  if (mins <= 0) {
    return 0;
  }
  if (mins < 30) {
    return 1;
  }
  if (mins < 180) {
    return 2;
  }
  if (mins < 240) {
    return 3;
  }

  return 4;
};

const heatDateGenerator = (
  year: number,
  sessions: StudySessionDTO[],
): ActivityData[] => {
  const sessionByDate = new Map(sessions.map((ss) => [ss.date, ss]));

  const data: ActivityData[] = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

    const session = sessionByDate.get(date);
    const mins = session ? Math.round(session.totalDurationSeconds / 60) : 0;

    data.push({ date, count: mins, level: decidingLevel(mins) });
  }

  return data;
};

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
  const [sessions, setSessions] = useState<StudySessionDTO[]>([]);
  const calendarData = useMemo(
    () => heatDateGenerator(year, sessions),
    [year, sessions],
  );
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    //const testFunc = async () => {
    //const t = await dispatch(
    //getSessionBetweenAPI({
    //dateStart: "2026-06-01",
    //dateEnd: "2026-06-19",
    //}),
    //).unwrap();
    //return t;
    //};

    const getDateForHeatMap = async () => {
      const fromTo = dateStartAndDateEnd(YEARS);
      const sessionsWithActivities = await dispatch(
        getSessionBetweenAPI({
          dateStart: fromTo[0],
          dateEnd: fromTo[1],
        }),
      ).unwrap();
      console.log("fromto" + fromTo);
      return sessionsWithActivities;
    };

    const run = async () => {
      const data = await getDateForHeatMap();
      if (data) {
        setSessions(data);
      }

      console.log("This is session data");
      console.log(data);
    };

    run();
  }, [dispatch]);

  //console.log("testing");
  //const mylog = heatDateGenerator(year);

  // user info
  // const initials =
  //   `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}` || "KL";
  // const displayName = user
  //   ? `${user.firstName} ${user.lastName}`.toUpperCase()
  //   : "OPERATOR_01";

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

      {/* Calendar */}
      <div className="flex flex-col xl:flex-row gap-6 items-center justify-center">
        {/* Activity calendar */}
        <div className="inline-block bg-surface-container p-6 lg:p-8 overflow-x-auto hide-scrollbar border border-outline-variant/10">
          <ActivityCalendar
            data={calendarData}
            theme={{
              dark: [
                "#1a1919", //level 0
                "rgba(156,255,147,0.2)", //level 1
                "rgba(156,255,147,0.45)", //level 2
                "rgba(156,255,147,0.7)", //level 3
                "#9cff93", //level 4
              ],
            }}
            colorScheme="dark"
            showWeekdayLabels
            showColorLegend={false}
            showTotalCount={false}
            blockSize={15}
            blockMargin={5}
            fontSize={13}
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
      </div>
    </section>
  );
}
