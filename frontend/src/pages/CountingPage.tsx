import { useCallback, useEffect, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import StatusBadge from "../components/counting/StatusBadge";
import TimerDisplay from "../components/counting/TimerDisplay";
import TimerControls from "../components/counting/TimerControls";
import SessionDetailsPanel, {
  type SessionDetails,
} from "../components/counting/SessionDetailsPanel";
import EndSessionModal from "../components/counting/EndSessionModal";
import {
  getCurrentUserActivity,
  startActivities,
  startPausingActivity,
  stopActivitiies,
} from "../features/activities/ActivitySlice";
import { useAppDispatch } from "../hooks/dispatch";

// Todo: save current timer
// use currentActivity to check if any activity is running 
// block new activity if there is an activity is running

export default function CountingPage() {
  const { time, setTime, isRunning, toggle, pause, reset, start} = useTimer();
  const [showModal, setShowModal] = useState(false);
  const [wasRunning, setWasRunning] = useState(false);
  const [hasStartedActivity, setHasStartedActivity] = useState(false);
  const [isStartingActivity, setIsStartingActivity] = useState(false);
  const [activityDetails, setActivityDetails] = useState<SessionDetails>({
    title: "",
    appName: "",
    topic: "",
  });

  const dispatch = useAppDispatch();
  
  const getRecentCurrentActivity = useCallback(async () => {
    try {
      const myData = await dispatch(getCurrentUserActivity()).unwrap()
      console.log("The current Activities")
      console.log(myData)
      if (myData){
        const startTime = new Date(myData.activityStartAt).getTime()
        const currentTime = new Date().getTime()
        const diffMs = currentTime - startTime
        
        const diffSeconds = Math.floor(diffMs / 1000)
        setTime({
          hours: Math.floor(diffSeconds/3600),
          minutes: Math.floor((diffSeconds % 3600) / 60),
          seconds: diffSeconds % 60 
        })
        
        setHasStartedActivity(true)
        start()
      }
    } catch (error) {
      console.log(error)
      console.log("There is an error")
    }
  }, [dispatch, setTime, start])
  
  useEffect(()=> {
    
    getRecentCurrentActivity()

  }, [getRecentCurrentActivity])
  

  async function handleToggle() {
    if (isRunning) {
      pause();
      await dispatch(startPausingActivity()).unwrap();
      console.log("Successfully start pausing Activity");
      return;
    }
    if (!hasStartedActivity) {
      setIsStartingActivity(true);
      try {
        await dispatch(startActivities(activityDetails)).unwrap();
        setHasStartedActivity(true);
      } finally {
        setIsStartingActivity(false);
      }
    }
    toggle();
  }

  function handleStopClick() {
    setWasRunning(isRunning);
    if (isRunning) pause();
    setShowModal(true);
  }

  function handleResume() {
    setShowModal(false);
    if (wasRunning) toggle();
  }

  async function handleEndSession() {
    setShowModal(false);
    reset();
    setHasStartedActivity(false);
    setActivityDetails({ title: "", appName: "", topic: "" });

    try {
      await dispatch(stopActivitiies()).unwrap();
    } catch (err) {
      console.log(err);
    }
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
            isStartingActivity={isStartingActivity}
            onToggle={handleToggle}
            onStop={handleStopClick}
          />
        </div>
      </main>

      <SessionDetailsPanel
        details={activityDetails}
        onChange={setActivityDetails}
      />
    </div>
  );
}
