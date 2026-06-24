import { useEffect, useMemo, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { useAppDispatch } from "../../hooks/dispatch";
import { getSessionBetweenAPI } from "../../features/studysessions/SessionSlice";
import type { StudySessionDTO } from "../../fetchLib/studysessionapi";
import ScrollRevealSection from "../ScrollRevealSection";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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
  const reduceMotion = useReducedMotion();
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
    <ScrollRevealSection className="space-y-8 rounded-[2rem] border border-white/[0.07] bg-black/40 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:p-8 lg:p-10">
      {/* Header row */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 w-fit rounded-[999px] bg-primary-fixed/[0.07] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.17em] text-primary-fixed">
            Learning signal
          </div>
          <h3 className="text-3xl font-bold tracking-[-0.04em] text-on-surface sm:text-4xl">
            Consistency Grid
          </h3>
        </div>
        <div className="rounded-[999px] border border-white/[0.06] bg-white/[0.03] px-4 py-2 text-[9px] font-body uppercase tracking-[0.13em] text-outline">
          Each square = 30 mins of deep work
        </div>
      </div>

      {/* Calendar */}
      <div className="flex flex-col items-stretch gap-3 lg:flex-row">
        <aside className="flex w-full shrink-0 rounded-[1.5rem] border border-white/[0.06] bg-white/[0.025] p-2 lg:w-32">
          <div className="hide-scrollbar flex w-full gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
            {YEARS.map((y) => {
              const isActive = y === year;

              return (
                <motion.button
                  key={y}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setYear(y)}
                  whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                  className={`relative flex h-12 min-w-24 flex-1 cursor-pointer items-center justify-center rounded-[999px] border border-transparent px-4 font-label text-sm font-bold outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/60 lg:min-w-0 ${
                    isActive
                      ? "text-primary"
                      : "border-transparent text-outline hover:bg-white/[0.04] hover:text-on-surface"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId={reduceMotion ? undefined : "active-dashboard-year"}
                      className="absolute inset-0 rounded-[999px] border border-primary/15 bg-primary/10 shadow-[0_8px_24px_rgba(0,252,64,0.06)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                        mass: 0.7,
                      }}
                    />
                  ) : null}
                  <span className="relative z-10">{y}</span>
                </motion.button>
              );
            })}
          </div>
        </aside>

        {/* Activity calendar */}
        <div className="hide-scrollbar min-w-0 flex-1 overflow-x-auto rounded-[1.75rem] border border-white/[0.06] bg-surface-container-lowest/55 p-5 sm:p-7 lg:overflow-hidden lg:p-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={year}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-max lg:min-w-0 lg:w-full"
            >
              <ActivityCalendar
                className="dashboard-activity-calendar"
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
                blockMargin={3}
                blockRadius={4}
                fontSize={12}
                style={{ color: "#777575" }}
              />

              {/* Custom legend */}
              <div className="mt-6 flex items-center gap-2 text-[10px] font-label text-outline">
                Less focus
                <div className="ml-2 mr-2 flex gap-[3px]">
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
                      className="h-[12px] w-[12px] rounded-[3px]"
                      style={{
                        backgroundColor: color,
                        boxShadow:
                          i === 5
                            ? "0 0 6px rgba(156,255,147,0.4)"
                            : undefined,
                      }}
                    />
                  ))}
                </div>
                More focus
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </ScrollRevealSection>
  );
}
