import { motion, useReducedMotion } from "framer-motion";
import ScrollRevealSection from "./ScrollRevealSection";

interface Activity {
  icon: string;
  status: string;
  statusColor: string;
  statusBg: string;
  title: string;
  description: string;
  metaLeft: string;
  metaRight: string;
}

const activities: Activity[] = [
  {
    icon: "code",
    status: "Completed",
    statusColor: "text-primary-fixed",
    statusBg: "bg-primary-container/10",
    title: "LeetCode — Graph Problems",
    description:
      "Solved 4 medium graph traversal problems. BFS/DFS patterns. AI flagged a 20-min idle gap mid-session.",
    metaLeft: "Duration: 2h 14m",
    metaRight: "VS Code + Chrome",
  },
  {
    icon: "menu_book",
    status: "In Progress",
    statusColor: "text-tertiary-fixed",
    statusBg: "bg-tertiary-container/10",
    title: "System Design — Chapter 8",
    description:
      "Reading DDIA distributed storage chapter. 82% focus score so far. Notion + PDF reader active.",
    metaLeft: "Uptime: 1h 35m",
    metaRight: "Notion + Preview",
  },
  {
    icon: "school",
    status: "Queued",
    statusColor: "text-outline",
    statusBg: "bg-outline/10",
    title: "AWS Cert — Practice Exam",
    description:
      "Scheduled practice test for Solutions Architect Associate. 65 questions, timed session.",
    metaLeft: "Est. Time: 1h 30m",
    metaRight: "Browser",
  },
];

export default function ActivityCards() {
  const reduceMotion = useReducedMotion();

  return (
    <ScrollRevealSection
      className="rounded-[2rem] border border-white/[0.07] bg-black/40 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-4"
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {activities.map((activity, i) => (
          <motion.article
            key={activity.title}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={reduceMotion ? undefined : { y: -5 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group cursor-pointer rounded-[1.5rem] border border-white/[0.06] bg-white/[0.025] p-6 transition-[background-color,border-color,box-shadow] duration-300 hover:border-primary-fixed/15 hover:bg-primary-fixed/[0.035] hover:shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
          >
            <div className="mb-7 flex items-start justify-between">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[999px] border border-white/[0.07] bg-black/35 text-outline transition-colors duration-200 group-hover:border-primary-fixed/15 group-hover:text-primary-fixed">
                <span className="material-symbols-outlined block text-xl leading-none">
                  {activity.icon}
                </span>
              </span>
              <span
                className={`rounded-[999px] px-3 py-1.5 text-[9px] font-bold ${activity.statusColor} ${activity.statusBg} uppercase tracking-[0.16em]`}
              >
                {activity.status}
              </span>
            </div>

            <h3 className="mb-3 text-lg font-bold tracking-[-0.02em] text-white">
              {activity.title}
            </h3>
            <p className="mb-7 text-sm leading-6 text-on-surface-variant/75">
              {activity.description}
            </p>

            <div className="flex justify-between gap-4 border-t border-white/[0.06] pt-4 text-[9px] uppercase tracking-[0.13em] text-outline">
              <span>{activity.metaLeft}</span>
              <span className="text-right">{activity.metaRight}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </ScrollRevealSection>
  );
}
