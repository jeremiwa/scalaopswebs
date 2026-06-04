import { useState, useEffect } from 'react';

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLast24h: boolean;
}

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const STORAGE_KEY = 'sentinel_offer_start';

export function useCountdown(): CountdownValues {
  const [target, setTarget] = useState<number>(0);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const initTarget = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      const currentTime = Date.now();
      
      let start = stored ? parseInt(stored, 10) : currentTime;
      
      // If invalid or already expired, reset cycle
      if (isNaN(start) || currentTime >= start + SEVEN_DAYS_MS) {
        start = currentTime;
        localStorage.setItem(STORAGE_KEY, start.toString());
      } else if (!stored) {
        localStorage.setItem(STORAGE_KEY, start.toString());
      }
      
      return start + SEVEN_DAYS_MS;
    };

    setTarget(initTarget());
  }, []);

  useEffect(() => {
    if (target === 0) return;

    const id = setInterval(() => {
      const current = Date.now();
      setNow(current);

      if (current >= target) {
        // Reset cycle automatically
        const newStart = current;
        localStorage.setItem(STORAGE_KEY, newStart.toString());
        setTarget(newStart + SEVEN_DAYS_MS);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [target]);

  // If target is 0, return defaults while loading
  if (target === 0) {
    return { days: 7, hours: 0, minutes: 0, seconds: 0, isLast24h: false };
  }

  const diff = Math.max(0, target - now);
  const totalSec = Math.floor(diff / 1000);
  
  // Never show 00:00:00:00, if diff is exactly 0 it will reset on next tick
  // but just in case, we don't need to do anything special because totalSec won't be 0 for long.
  const isLast24h = diff <= 24 * 60 * 60 * 1000 && diff > 0;

  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
    isLast24h,
  };
}
