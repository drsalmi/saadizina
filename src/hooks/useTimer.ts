import { useState, useEffect, useCallback, useRef } from "react";

interface UseTimerReturn {
  timeLeft: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  progress: number;
}

export const useTimer = (
  initialSeconds: number,
  onTick?: () => void,
  onComplete?: () => void
): UseTimerReturn => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    setTimeLeft(initialSeconds);
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [initialSeconds]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          if (newTime > 0 && onTick) {
            onTick();
          }
          if (newTime === 0) {
            setIsRunning(false);
            if (onComplete) {
              onComplete();
            }
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, onTick, onComplete]);

  const progress = (timeLeft / initialSeconds) * 100;

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    progress,
  };
};
