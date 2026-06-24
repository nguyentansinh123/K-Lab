import ActiveFocusCard, { type ActiveSessionData } from "./ActiveFocusCard";
import RecentSessionCard, { type RecentSessionData } from "./RecentSessionCard";
import ScrollRevealSection from "../ScrollRevealSection";

interface OperationalStatusProps {
  activeSession?: ActiveSessionData;
  recentSession?: RecentSessionData;
}

export default function OperationalStatus({
  activeSession,
  recentSession,
}: OperationalStatusProps) {
  return (
    <ScrollRevealSection className="space-y-6 rounded-[2rem] border border-white/[0.07] bg-black/40 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:p-7 lg:p-8">
      <div>
        <div className="mb-3 w-fit rounded-[999px] bg-primary-fixed/[0.07] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.17em] text-primary-fixed">
          Live workspace
        </div>
        <h3 className="text-2xl font-bold tracking-[-0.035em] text-on-surface sm:text-3xl">
          Operational Status
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
        <ActiveFocusCard session={activeSession} />
        <RecentSessionCard session={recentSession} />
      </div>
    </ScrollRevealSection>
  );
}
