import { useState, useRef, useCallback, useEffect } from "react";

export interface TimerTime {
  hours: number;
  minutes: number;
  seconds: number;
}

interface UseTimerReturn {
  time: TimerTime;
  isRunning: boolean;
  toggle: () => void;
  pause: () => void;
  reset: () => void;
}

export function useTimer(): UseTimerReturn {
  const [time, setTime] = useState<TimerTime>({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (intervalRef.current) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds++;
        if (seconds >= 60) { seconds = 0; minutes++; }
        if (minutes >= 60) { minutes = 0; hours++; }
        return { hours, minutes, seconds };
      });
    }, 1000);
  }, []);

  const pause = useCallback(() => {
    clearTimer();
    setIsRunning(false);
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  }, [clearTimer]);

  const toggle = useCallback(() => {
    if (intervalRef.current) pause();
    else start();
  }, [start, pause]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  return { time, isRunning, toggle, pause, reset };
}
