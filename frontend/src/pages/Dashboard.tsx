import MetricsCards from "../components/dashboard/MetricsCards";
import CognitiveSynthesis from "../components/dashboard/CognitiveSynthesis";
import CommitmentGrid from "../components/dashboard/CommitmentGrid";
import AISessionNotes from "../components/dashboard/AISessionNotes";
import OperationalStatus from "../components/dashboard/OperationalStatus";
import DashboardFooter from "../components/dashboard/DashboardFooter";

export default function Dashboard() {
  return (
    <div className="dashboard-grid-bg h-screen pt-16 flex flex-col overflow-hidden">
      <main className="flex-1 w-full overflow-y-auto hide-scrollbar p-4 sm:p-6 lg:p-8 pb-4">
        <div className="max-w-[1400px] max-w-7xl mx-auto space-y-8 lg:space-y-12">
        <MetricsCards />
        <CognitiveSynthesis />
        <CommitmentGrid />
        <AISessionNotes />
        <OperationalStatus />
        </div>
      </main>
      <DashboardFooter />
    </div>
  );
}
