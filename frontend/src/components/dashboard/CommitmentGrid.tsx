import { useEffect, useMemo, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { useAppDispatch } from "../../hooks/dispatch";
import { getSessionBetweenAPI } from "../../features/studysessions/SessionSlice";
import type { StudySessionDTO } from "../../fetchLib/studysessionapi";

interface ActivityData {
  date: string;
  count: number;
  level: number;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [
  CURRENT_YEAR,
  CURRENT_YEAR - 1,
  CURRENT_YEAR - 2,
  CURRENT_YEAR - 3,
  CURRENT_YEAR - 4,
];

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
    const mins = session ? Math.floor(session.totalDurationSeconds / 60) : 0;

    data.push({ date, count: mins, level: decidingLevel(mins) });
  }

  return data;
};

export default function CommitmentGrid() {
  const [year, setYear] = useState(CURRENT_YEAR);
  const [sessions, setSessions] = useState<StudySessionDTO[]>([]);
  const calendarData = useMemo(
    () => heatDateGenerator(year, sessions),
    [year, sessions],
  );

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
        </div>
        <div className="text-[10px] font-body text-outline">
          Each square = 30 mins of deep work
        </div>
      </div>

      {/* Calendar */}
      <div className="flex flex-col xl:flex-row gap-6 items-center xl:items-stretch justify-center">
        <aside className="flex w-full shrink-0 bg-surface-container border border-outline-variant/10 p-3 xl:w-36">
          <div className="flex w-full gap-2 overflow-x-auto hide-scrollbar xl:flex-col">
            {YEARS.map((y) => {
              const isActive = y === year;

              return (
                <button
                  key={y}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setYear(y)}
                  className={`cursor-pointer relative flex h-11 min-w-24 w-full items-center border px-3 text-left font-label text-sm font-bold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 xl:min-w-0 ${
                    isActive
                      ? "border-primary/25 bg-primary/10 text-primary"
                      : "border-transparent text-outline hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  <span>{y}</span>
                  {isActive && (
                    <span className="absolute inset-y-2 right-2 w-px bg-primary/70" />
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Activity calendar */}
        <div className="inline-block bg-surface-container p-6 lg:p-8 overflow-x-auto hide-scrollbar border border-outline-variant/10">
          <ActivityCalendar
            data={calendarData}
            theme={{
              dark: [
                "#1a1919",
                "rgba(156,255,147,0.2)",
                "rgba(156,255,147,0.4)",
                "rgba(156,255,147,0.6)",
                "rgba(156,255,147,0.8)",
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
