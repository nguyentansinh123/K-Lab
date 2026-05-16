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
      className={`px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {activities.map((activity, i) => (
        <div
          key={activity.title}
          className="cursor-pointer bg-surface-container-low p-6 border-l-2 border-primary-fixed hover:border-primary-container hover:bg-surface-variant hover:-translate-y-1 card-glow transition-all duration-200 group"
          style={{ transitionDelay: isVisible ? `${i * 80}ms` : "0ms" }}
        >
          <div className="flex justify-between items-start mb-6">
            <span className="material-symbols-outlined text-primary-fixed text-3xl group-hover:scale-110 transition-transform duration-200">
              {activity.icon}
            </span>
            <span
              className={`text-[10px] font-bold ${activity.statusColor} ${activity.statusBg} px-2 py-0.5 uppercase`}
            >
              {activity.status}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            {activity.title}
          </h3>
          <p className="text-sm text-on-surface-variant mb-6">
            {activity.description}
          </p>

          <div className="flex justify-between text-[10px] uppercase tracking-widest text-on-surface-variant">
            <span>{activity.metaLeft}</span>
            <span>{activity.metaRight}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
