/**
 * @param {Object} options
 * @param {number} options.countStart
 * @param {number} [options.countStop=0]
 * @param {number} [options.intervalMs=1000]
 * @param {boolean} [options.isIncrement=false]
 */
import React from "react";
export default function useCountdown({
  countStart,
  countStop = 0,
  intervalMs = 1000,
  isIncrement = false,
}) {
  const [count, setCount] = React.useState(countStart);
  const [running, setRunning] = React.useState(false);
  let timerId = React.useRef(null);
  const start = () => {
    setRunning(true);
  };
  const stop = () => {
    setRunning(false);
    clearInterval(timerId.current);
  };
  const reset = () => {
    stop();
    setCount(countStart);
  };
  React.useEffect(() => {
    if (!running) return;
    if (running) {
      timerId.current = setInterval(() => {
        setCount((count) =>
          count !== countStop
            ? isIncrement
              ? count + 1
              : count - 1
            : countStop,
        );
      }, intervalMs);
    }
    return () => clearInterval(timerId.current);
  }, [running, intervalMs, countStop, isIncrement]);
  return { start, stop, count, reset };
}
