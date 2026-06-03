import { useScrollReveal } from "../hooks/useScrollReveal";

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
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={`grid grid-cols-1 gap-8 border-t border-outline-variant/30 pt-10 md:grid-cols-3 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {activities.map((activity, i) => (
        <div
          key={activity.title}
          className="cursor-pointer border border-outline-variant/25 bg-surface-container-lowest/70 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary-fixed/40 hover:bg-surface-container-low group"
          style={{ transitionDelay: isVisible ? `${i * 80}ms` : "0ms" }}
        >
          <div className="flex justify-between items-start mb-6">
            <span className="material-symbols-outlined text-outline text-3xl group-hover:text-primary-fixed transition-colors duration-200">
              {activity.icon}
            </span>
            <span
              className={`text-[10px] font-bold ${activity.statusColor} ${activity.statusBg} px-2 py-0.5 uppercase tracking-[0.18em]`}
            >
              {activity.status}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-3">
            {activity.title}
          </h3>
          <p className="text-sm text-on-surface-variant/75 leading-6 mb-7">
            {activity.description}
          </p>

          <div className="flex justify-between gap-4 border-t border-outline-variant/20 pt-4 text-[10px] uppercase tracking-widest text-outline">
            <span>{activity.metaLeft}</span>
            <span>{activity.metaRight}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
