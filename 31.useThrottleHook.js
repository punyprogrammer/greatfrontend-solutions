/**
 * @template T
 * @param {T} value
 * @param {number} interval
 */

import React from "react";
export default function useThrottle(value, interval = 500) {
  // value will will only be changed
  const [throttledValue, setThrottledValue] = React.useState(value);
  const lastExecutedRef = React.useRef(Date.now());
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    const now = Date.now();
    const remaining = interval - (now - lastExecutedRef.current);
    if (remaining <= 0) {
      setThrottledValue(value);
      lastExecutedRef.current = now;
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setThrottledValue(value);
        lastExecutedRef.current = Date.now();
      }, interval);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value]);
  return throttledValue;
}
