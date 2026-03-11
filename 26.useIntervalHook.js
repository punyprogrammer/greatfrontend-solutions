import React from "react";

/**
 * @param {() => void} callback
 * @param {number | null} delay
 */
export default function useInterval(callback, delay) {
  const callbackRef = React.useRef(callback);

  // Always keep latest callback
  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => {
      callbackRef.current();
    }, delay);

    return () => clearInterval(id);
  }, [delay]);
}
