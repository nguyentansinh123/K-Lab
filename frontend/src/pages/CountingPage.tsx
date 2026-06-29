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
  getLatestPausingAct,
  startActivities,
  startPausingActivity,
  stopActivitiies,
  stopPausingActivity,
} from "../features/activities/ActivitySlice";
import { useAppDispatch } from "../hooks/dispatch";
import { updateTodaySession } from "../features/studysessions/SessionSlice";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import FocusAmbientBackground from "../components/counting/FocusAmbientBackground";
import Video from "../components/counting/Video";
import CountingSettingsTab, {
  type LofiTrack,
} from "../components/counting/CountingSettingsTab";
import LofiBackgroundPlayer from "../components/counting/LofiBackgroundPlayer";

// Todo: save current timer
// use currentActivity to check if any activity is running
// block new activity if there is an activity is running

//TODO: Activy started already so if it start set the state so it cant start again

export default function CountingPage() {
  const reduceMotion = useReducedMotion();
  const { time, setTime, isRunning, toggle, pause, reset, start } = useTimer();
  const [showModal, setShowModal] = useState(false);
  const [wasRunning, setWasRunning] = useState(false);
  const [hasStartedActivity, setHasStartedActivity] = useState(false);
  const [isStartingActivity, setIsStartingActivity] = useState(false);
  const [isSplit, setIsSplit] = useState(false);
  const [selectedLofi, setSelectedLofi] = useState<LofiTrack | null>(null);
  const [activityDetails, setActivityDetails] = useState<SessionDetails>({
    title: "",
    appName: "",
    topic: "",
  });

  const dispatch = useAppDispatch();

  const getRecentCurrentActivity = useCallback(async () => {
    try {
      const myData = await dispatch(getCurrentUserActivity()).unwrap();
      const checkIfIsCurrentLyPause = await dispatch(
        getLatestPausingAct("PAUSE"),
      ).unwrap();
      if (checkIfIsCurrentLyPause.activityPauses.length > 0) {
        setHasStartedActivity(true);
      }

      console.log(JSON.stringify(myData.activityPauses));
      console.log(myData);

      if (myData) {
        const totalPauseTime = myData.activityPauses.reduce((total, obj) => {
          let time = 0;
          if (obj.pauseTimeEnd == null) {
            time =
              new Date().getTime() - new Date(obj.pauseTimeStart).getTime();
          } else {
            time =
              new Date(obj.pauseTimeEnd).getTime() -
              new Date(obj.pauseTimeStart).getTime();
          }
          return total + time;
        }, 0);

        const startTime = new Date(myData.activityStartAt).getTime();
        const currentTime = new Date().getTime();
        const diffMs = currentTime - startTime - totalPauseTime;

        const diffSeconds = Math.floor(diffMs / 1000);
        setTime({
          hours: Math.floor(diffSeconds / 3600),
          minutes: Math.floor((diffSeconds % 3600) / 60),
          seconds: diffSeconds % 60,
        });

        if (checkIfIsCurrentLyPause.activityPauses.length > 0) {
          return;
        } else {
          setHasStartedActivity(true);
          start();
        }
      }
    } catch (error) {
      console.log(error);
      console.log("There is an error");
    }
  }, [dispatch, setTime, start]);

  useEffect(() => {
    getRecentCurrentActivity();
  }, [getRecentCurrentActivity]);

  async function handleToggle() {
    if (isRunning) {
      pause();
      await dispatch(startPausingActivity()).unwrap();
      return;
    }

    if (hasStartedActivity) {
      await dispatch(stopPausingActivity()).unwrap();
      start();
      return;
    }

    setIsStartingActivity(true);

    try {
      await dispatch(startActivities(activityDetails)).unwrap();
      setHasStartedActivity(true);
      start();
    } finally {
      setIsStartingActivity(false);
    }
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

    try {
      await dispatch(updateTodaySession())
    } catch (error) {
      console.log(error);
    }

  }

  const isLofiMode = selectedLofi !== null;

  return (
    <div className="relative h-screen overflow-hidden bg-[#080a08] pt-16">
      <LofiBackgroundPlayer src={selectedLofi?.link ?? null} />

      {showModal && (
        <EndSessionModal onResume={handleResume} onEnd={handleEndSession} />
      )}
      <motion.div
        className="relative z-10 grid h-full"
        animate={{ gridTemplateColumns: isSplit ? "1fr 1fr" : "1fr 0fr" }}
        transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <section
          className={`relative flex min-w-0 flex-col overflow-hidden border-r border-transparent data-[split=true]:border-white/[0.07] ${
            isLofiMode ? "bg-black/35" : "bg-[#0b0d0b]"
          }`}
          data-split={isSplit}
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(234,255,222,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(234,255,222,0.018)_1px,transparent_1px)] bg-[size:56px_56px]" />
          {!isLofiMode && <FocusAmbientBackground active={isRunning} />}

          <main className="relative z-10 flex flex-1 flex-col items-center justify-center">
            <div className="absolute inset-x-4 top-7 flex items-center justify-end sm:inset-x-7">
              <div className="absolute left-1/2 -translate-x-1/2">
                <StatusBadge isRunning={isRunning} />
              </div>

              <CountingSettingsTab
                selectedLofi={selectedLofi}
                onSelectLofi={setSelectedLofi}
              />
            </div>

            <motion.div
              layout
              className="flex flex-col items-center justify-center px-3"
              transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <TimerDisplay time={time} compact={isSplit} />
              <TimerControls
                isRunning={isRunning}
                isStartingActivity={isStartingActivity}
                isSplit={isSplit}
                compact={isSplit}
                onToggle={handleToggle}
                onStop={handleStopClick}
                onSplit={() => setIsSplit((split) => !split)}
              />
            </motion.div>
          </main>

          <SessionDetailsPanel
            details={activityDetails}
            onChange={setActivityDetails}
            contained={isSplit}
          />
        </section>

        <AnimatePresence initial={false}>
          {isSplit ? (
            <motion.aside
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.15 }}
              className=" min-w-0 overflow-hidden bg-black"
            >
              <Video/>
            </motion.aside>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
