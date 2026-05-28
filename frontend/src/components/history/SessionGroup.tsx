import type { DayLog, Session } from "../../types/history";
import type { ActivityDTO, StudySessionDTO } from "../../fetchLib/studysessionapi";
import SessionRow from "./SessionRow";

interface SessionGroupProps {
  group?: DayLog;
  historyData?: StudySessionDTO | null;
  search?: string;
}

const formatSeconds = (seconds: string | number | null) => {
  const totalSeconds = Number(seconds ?? 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

const activityToSession = (activity: ActivityDTO, index: number): Session => ({
  id: `${activity.activityStartAt}-${activity.title}-${index}`,
  app: activity.appName,
  appIcon: "terminal",
  title: activity.title,
  duration: formatSeconds(activity.duration),
  focus: 80,
  topic: activity.topic,
  path: "studytracker/session",
  pathIcon: "folder",
  notes: "No session notes captured yet.",
  cognitive: {
    avg: 72,
    base: 40,
    peak: 88,
    label: "SUSTAINED",
  },
  accentColor: index % 2 === 0 ? "primary" : "tertiary",
});

const studySessionToDayLog = (historyData: StudySessionDTO): DayLog => ({
  date: historyData.date,
  totalFocus: formatSeconds(historyData.totalDurationSeconds),
  isPast: false,
  sessions: historyData.activities.map(activityToSession),
});

export default function SessionGroup({ group, historyData, search = "" }: SessionGroupProps) {
  const displayGroup = historyData ? studySessionToDayLog(historyData) : group;

  if (!displayGroup) return null;

  const q = search.toLowerCase().trim();
  const sessions = q
    ? displayGroup.sessions.filter(
        (session) =>
          session.title.toLowerCase().includes(q) ||
          session.app.toLowerCase().includes(q) ||
          session.topic.toLowerCase().includes(q),
      )
    : displayGroup.sessions;

  const lineColor = displayGroup.isPast ? "bg-outline-variant/30" : "bg-primary/30";
  const dateColor = displayGroup.isPast ? "text-on-surface-variant" : "text-on-surface";
  const focusColor = displayGroup.isPast ? "text-on-surface-variant" : "text-primary";

  return (
    <section>
      {/* Date header */}
      <div className="flex items-center gap-6 mb-6">
        <div className={`h-px ${lineColor} flex-1`} />
        <div className="flex items-center gap-8 bg-surface px-4 py-2 border border-outline-variant/15">
          <div className={`font-mono text-sm tracking-wider ${dateColor}`}>
            <span className={displayGroup.isPast ? "opacity-50" : "text-on-surface-variant"}>DATE:</span>{" "}
            [{displayGroup.date}]
          </div>
          <div className={`font-mono text-sm tracking-wider ${focusColor}`}>
            <span className={displayGroup.isPast ? "opacity-50" : "text-on-surface-variant"}>
              TOTAL_FOCUS:
            </span>{" "}
            [{displayGroup.totalFocus}]
          </div>
        </div>
        <div className={`h-px ${lineColor} flex-1`} />
      </div>

      {/* Table */}
      <div className="bg-surface-container border border-outline-variant/15">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-outline-variant/15 bg-surface-container-low font-headline text-xs tracking-widest text-on-surface-variant uppercase">
          <div className="col-span-3">App_Name</div>
          <div className="col-span-4">Title</div>
          <div className="col-span-2">Duration</div>
          <div className="col-span-3">Focus_Strength</div>
        </div>
        <div className="divide-y divide-outline-variant/10">
          {sessions.map((session) => (
            <SessionRow key={session.id} session={session} isPast={displayGroup.isPast} />
          ))}
        </div>
      </div>
    </section>
  );
}
