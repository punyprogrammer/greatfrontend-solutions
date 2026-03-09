import React from "react";

export default function useTimeout(callback, delay) {
  const callbackRef = React.useRef(callback);
  const timerRef = React.useRef(null);

  // Always store the latest callback
  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  React.useEffect(() => {
    // If delay is null, cancel the timeout
    if (delay === null) {
      clearTimeout(timerRef.current);
      return;
    }

    timerRef.current = setTimeout(() => {
      callbackRef.current();
    }, delay);

    // Cleanup when delay changes or component unmounts
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [delay]);
}
