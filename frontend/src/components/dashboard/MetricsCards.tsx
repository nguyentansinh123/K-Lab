import { useEffect, useState } from "react";
import {
  calculateTotalTimeOfSessionWithTimeFrame,
  getCurrentStreakOfUser,
  getLongestStreakOfUser,
  getMonthlyTimeComparison,
} from "../../features/studysessions/SessionSlice";
import { useAppDispatch } from "../../hooks/dispatch";
import type { MonthlyTimeComparison } from "../../fetchLib/studysessionapi";
import { motion, useReducedMotion } from "framer-motion";

export interface MetricCardData {
  icon: string;
  iconColorClass: string;
  iconBgClass: string;
  iconBorderClass: string;
  label: string;
  value: string;
  subtext: string;
  subtextColorClass: string;
}

export default function MetricsCards() {
  const reduceMotion = useReducedMotion();
  const dispatch = useAppDispatch();
  const [totalWorkTime30Days, setTotalWorkTime30Days] = useState<number>(0);
  const [comparison2months, setComparison2months] =
    useState<MonthlyTimeComparison>([0, 0]);
  const [currStreak, setCurrStreak] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);

  const compareM = (a: number, b: number): number => {
    a = a / 3600;
    b = b / 3600;

    if (Math.floor(a) == Math.floor(b)) {
      return 0;
    } else {
      if (b == 0) b = 1;
      return Math.floor(((a - b) / b) * 100);
    }
  };

  const compareAveBetween2Months = (a: number, b: number) => {
    const now = new Date();

    const currentMonthDaysElapsed = now.getDate();
    const lastMonthTotalDays = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
    ).getDate();

    const currentAverage = a / currentMonthDaysElapsed;
    const lastMonthAverage = b / lastMonthTotalDays;

    return (currentAverage - lastMonthAverage) / 3600;
  };

  const cardData = [
    {
      icon: "schedule",
      iconColorClass: "text-primary",
      iconBgClass: "bg-primary/10",
      iconBorderClass: "border-primary/20",
      label: "Total 30 Days Hours",
      value: `${(totalWorkTime30Days / 3600).toFixed(1)}h`,
      subtext: `${compareM(comparison2months[0], comparison2months[1]) > 0 ? "+" : "-"}${compareM(comparison2months[0], comparison2months[1])}% vs last month`,
      subtextColorClass: `${compareM(comparison2months[0], comparison2months[1]) > 0 ? "text-primary" : "text-red-500"}`,
    },
    {
      icon: "local_fire_department",
      iconColorClass: "text-error",
      iconBgClass: "bg-error/10",
      iconBorderClass: "border-error/20",
      label: "Current Streak",
      value: `${currStreak} days`,
      subtext: `Best: ${longestStreak} days`,
      subtextColorClass: `${currStreak < longestStreak ? "text-red-500" : "text-primary"}`,
    },
    {
      //Todo: Need to figure out a way to calculate this
      icon: "my_location",
      iconColorClass: "text-tertiary",
      iconBgClass: "bg-tertiary/10",
      iconBorderClass: "border-tertiary/20",
      label: "Focus Score",
      value: "86%",
      subtext: "+7% vs last month",
      subtextColorClass: "text-primary",
    },
    {
      icon: "trending_up",
      iconColorClass: "text-secondary",
      iconBgClass: "bg-secondary/10",
      iconBorderClass: "border-secondary/20",
      label: "Daily Average",
      value: `${(comparison2months[0] / new Date().getDate() / 3600).toFixed(2)}h`,
      subtext: `${compareAveBetween2Months(comparison2months[0], comparison2months[1]).toFixed(1)}h vs last month`,
      subtextColorClass:
        compareAveBetween2Months(comparison2months[0], comparison2months[1]) > 0
          ? "text-red-500"
          : "text-primary",
    },
  ];

  useEffect(() => {
    const getGeneralInfo = async () => {
      try {
        const ttdays = await dispatch(
          calculateTotalTimeOfSessionWithTimeFrame(30),
        ).unwrap();
        const crs = await dispatch(getMonthlyTimeComparison()).unwrap();
        const userCurrStreak = await dispatch(
          getCurrentStreakOfUser(),
        ).unwrap();
        const userLongestStreak = await dispatch(
          getLongestStreakOfUser(),
        ).unwrap();
        setCurrStreak(userCurrStreak);
        setLongestStreak(userLongestStreak);
        setTotalWorkTime30Days(ttdays.msg);
        //console.log("aaaa" + crs);
        setComparison2months(crs);
        //console.log(totalWorkTime30Days);
        //console.log(comparison2months);
      } catch (error) {
        console.log(error);
      }
    };

    const run = async () => {
      await getGeneralInfo();
    };

    run();
  }, [dispatch]);

  console.log(compareM(comparison2months[0], comparison2months[1]));

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[2rem] border border-white/[0.07] bg-black/40 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur-sm"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cardData.map((card, index) => (
          <motion.article
            key={card.label}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={reduceMotion ? undefined : { y: -4 }}
            transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.08 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-40 flex-col justify-between gap-5 rounded-[1.5rem] border border-white/[0.06] bg-white/[0.025] p-5 transition-[background-color,border-color,box-shadow] duration-300 hover:border-primary-fixed/15 hover:bg-primary-fixed/[0.03] hover:shadow-[0_16px_42px_rgba(0,0,0,0.22)]"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[999px] ${card.iconBgClass} ${card.iconColorClass} border ${card.iconBorderClass}`}
              >
                <span className="material-symbols-outlined block text-base leading-none">
                  {card.icon}
                </span>
              </div>
              <div className="text-[9px] font-label uppercase tracking-[0.15em] text-outline">
                {card.label}
              </div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold tracking-[-0.04em] text-on-surface">
                {card.value}
              </div>
              <div className={`mt-1 text-[10px] font-body ${card.subtextColorClass}`}>
                {card.subtext}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
