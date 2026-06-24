import MetricsCards from "../components/dashboard/MetricsCards";
import CognitiveSynthesis from "../components/dashboard/CognitiveSynthesis";
import CommitmentGrid from "../components/dashboard/CommitmentGrid";
import AISessionNotes from "../components/dashboard/AISessionNotes";
import OperationalStatus from "../components/dashboard/OperationalStatus";
import DashboardFooter from "../components/dashboard/DashboardFooter";

export default function Dashboard() {
  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#0b0c0b] pt-16">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(234,255,222,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(234,255,222,0.018)_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_50%_-20%,rgba(0,252,64,0.1),transparent_60%)]" />
      <main className="hide-scrollbar relative z-10 w-full flex-1 overflow-y-auto p-3 pb-5 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[1240px] space-y-6 lg:space-y-8">
          <MetricsCards />
          <CommitmentGrid />
          <CognitiveSynthesis />
          <AISessionNotes />
          <OperationalStatus />
        </div>
      </main>
      <DashboardFooter />
    </div>
  );
}
