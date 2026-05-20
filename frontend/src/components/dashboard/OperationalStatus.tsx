import ActiveFocusCard, { type ActiveSessionData } from "./ActiveFocusCard";
import RecentSessionCard, { type RecentSessionData } from "./RecentSessionCard";

interface OperationalStatusProps {
  activeSession?: ActiveSessionData;
  recentSession?: RecentSessionData;
}

export default function OperationalStatus({
  activeSession,
  recentSession,
}: OperationalStatusProps) {
  return (
    <section className="space-y-6 pb-8">
      <h3 className="text-xs font-label font-bold uppercase tracking-[0.4em] text-on-surface-variant">
        Operational_Status
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <ActiveFocusCard session={activeSession} />
        <RecentSessionCard session={recentSession} />
      </div>
    </section>
  );
}
