import { useState, useEffect } from 'react';

/**
 * Returns the last moment (23:59:59.999) of the current month in Argentina time (GMT-3).
 * If that moment has already passed, returns end of next month.
 */
function getEndOfMonth(): Date {
  // Current date in Argentina (UTC-3)
  const nowUtc = Date.now();
  const argOffset = -3 * 60 * 60 * 1000; // GMT-3
  const argNow = new Date(nowUtc + argOffset + new Date().getTimezoneOffset() * 60 * 1000);

  let year = argNow.getFullYear();
  let month = argNow.getMonth(); // 0-indexed

  // Last day of this month, 23:59:59 Argentina time
  // Day 0 of next month = last day of current month
  const lastDay = new Date(year, month + 1, 0).getDate();

  // Build target date in Argentina time: YYYY-MM-DD 23:59:59
  // Convert to UTC: add 3 hours
  const targetArgMs = Date.UTC(year, month, lastDay, 23 + 3, 59, 59, 0);

  // If already past, jump to next month
  if (targetArgMs <= nowUtc) {
    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
    const nextLastDay = new Date(year, month + 1, 0).getDate();
    return new Date(Date.UTC(year, month, nextLastDay, 23 + 3, 59, 59, 0));
  }

  return new Date(targetArgMs);
}

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Countdown hook that ticks every second towards the end of the current month
 * (23:59 Argentina time, GMT-3). Automatically resets to next month's end when
 * the countdown reaches zero — evergreen monthly.
 */
export function useCountdown(): CountdownValues {
  const [target, setTarget] = useState(() => getEndOfMonth());
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      const current = Date.now();
      setNow(current);

      // If past target, recalculate
      if (current >= target.getTime()) {
        setTarget(getEndOfMonth());
      }
    }, 1000);

    return () => clearInterval(id);
  }, [target]);

  const diff = Math.max(0, target.getTime() - now);
  const totalSec = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
  };
}
