import CognitiveSynthesis from "../components/dashboard/CognitiveSynthesis";
import CommitmentGrid from "../components/dashboard/CommitmentGrid";
import AISessionNotes from "../components/dashboard/AISessionNotes";
import OperationalStatus from "../components/dashboard/OperationalStatus";
import DashboardFooter from "../components/dashboard/DashboardFooter";

/**
 * Dashboard — composed from individual section components.
 *
 * API integration checklist (per section):
 *   • CognitiveSynthesis  → pass focusDays, resourceSlices, quickStats, insights from API
 *   • CommitmentGrid      → pass data (CommitDay[]) from API
 *   • AISessionNotes      → pass sessions (SessionNote[]) from API
 *   • OperationalStatus   → pass activeSession + recentSession from API / WebSocket
 *
 * Each child component ships with sensible placeholder defaults so the UI
 * renders immediately without any data.
 */
export default function Dashboard() {
  return (
    // pt-16 offsets the fixed NavBar (h-16)
    <div className="flex flex-col min-h-screen pt-16">
      <main className="flex-1 overflow-y-auto hide-scrollbar px-6 md:px-8 py-8 space-y-12">
        <CognitiveSynthesis />
        <CommitmentGrid />
        <AISessionNotes />
        <OperationalStatus />
      </main>

      <DashboardFooter />
    </div>
  );
}
