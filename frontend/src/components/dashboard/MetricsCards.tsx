import { useEffect, useState } from "react";
import {
  calculateTotalTimeOfSessionWithTimeFrame,
  getCurrentStreakOfUser,
  getLongestStreakOfUser,
  getMonthlyTimeComparison,
} from "../../features/studysessions/SessionSlice";
import { useAppDispatch } from "../../hooks/dispatch";
import type { MonthlyTimeComparison } from "../../fetchLib/studysessionapi";

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

interface MetricsCardsProps {
  cards?: MetricCardData[];
}

const defaultCards: MetricCardData[] = [
  {
    icon: "schedule",
    iconColorClass: "text-primary",
    iconBgClass: "bg-primary/10",
    iconBorderClass: "border-primary/20",
    label: "Total Deep Work",
    value: "128.5h",
    subtext: "+18.4h vs last month",
    subtextColorClass: "text-primary",
  },
  {
    icon: "local_fire_department",
    iconColorClass: "text-error",
    iconBgClass: "bg-error/10",
    iconBorderClass: "border-error/20",
    label: "Current Streak",
    value: "14 days",
    subtext: "Best: 21 days",
    subtextColorClass: "text-outline",
  },
  {
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
    value: "2.3h",
    subtext: "+0.6h vs last month",
    subtextColorClass: "text-primary",
  },
];

export default function MetricsCards() {
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
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {cardData.map((card) => (
        <div
          key={card.label}
          className="bg-surface-container p-6 border border-outline-variant/10 flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 ${card.iconBgClass} flex items-center justify-center ${card.iconColorClass} border ${card.iconBorderClass}`}
            >
              <span className="material-symbols-outlined text-sm">
                {card.icon}
              </span>
            </div>
            <div className="text-[10px] font-label text-outline uppercase tracking-widest">
              {card.label}
            </div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-on-surface">
              {card.value}
            </div>
            <div
              className={`text-[10px] font-body mt-1 ${card.subtextColorClass}`}
            >
              {card.subtext}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
