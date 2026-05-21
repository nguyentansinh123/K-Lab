import { useState } from "react";
import { useTimer } from "../hooks/useTimer";
import StatusBadge from "../components/counting/StatusBadge";
import TimerDisplay from "../components/counting/TimerDisplay";
import TimerControls from "../components/counting/TimerControls";
import SessionDetailsPanel, {
  type SessionDetails,
} from "../components/counting/SessionDetailsPanel";
import EndSessionModal from "../components/counting/EndSessionModal";

export default function CountingPage() {
  const { time, isRunning, toggle, pause, reset } = useTimer();
  const [showModal, setShowModal] = useState(false);
  const [wasRunning, setWasRunning] = useState(false);
  const [sessionDetails, setSessionDetails] = useState<SessionDetails>({
    title: "",
    appName: "",
    topic: "",
  });

  function handleStopClick() {
    setWasRunning(isRunning);
    if (isRunning) pause();
    setShowModal(true);
  }

  function handleResume() {
    setShowModal(false);
    if (wasRunning) toggle();
  }

  function handleEndSession() {
    setShowModal(false);
    reset();
    setSessionDetails({ title: "", appName: "", topic: "" });
  }

  return (
    <div className="h-screen pt-16 flex flex-col overflow-hidden dashboard-grid-bg">
      {showModal && (
        <EndSessionModal onResume={handleResume} onEnd={handleEndSession} />
      )}

      <main className="flex-1 flex flex-col items-center justify-center relative">
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <StatusBadge isRunning={isRunning} />
        </div>

        <div className="flex flex-col items-center justify-center -mt-8 px-4">
          <TimerDisplay time={time} />
          <TimerControls
            isRunning={isRunning}
            onToggle={toggle}
            onStop={handleStopClick}
          />
        </div>
      </main>

      <SessionDetailsPanel details={sessionDetails} onChange={setSessionDetails} />
    </div>
  );
}
