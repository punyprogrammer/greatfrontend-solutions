import React from "react";

const DEFAULT_EVENTS = [
  "mousemove",
  "mousedown",
  "resize",
  "keydown",
  "touchstart",
  "wheel",
];

export default function useIdle(
  ms = 60_000,
  initialState = false,
  events = DEFAULT_EVENTS,
) {
  const [idle, setIdle] = React.useState(initialState);
  const idleTimerRef = React.useRef(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const onEventTrigger = () => {
      setIdle(false);

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      idleTimerRef.current = setTimeout(() => {
        setIdle(true);
      }, ms);
    };

    // Start timer immediately
    onEventTrigger();

    events.forEach((event) => window.addEventListener(event, onEventTrigger));
    // additional handling for visibility change
    document.addEventListener("visibilitychange", onEventTrigger);

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      events.forEach((event) =>
        window.removeEventListener(event, onEventTrigger),
      );
      document.removeEventListener("visibilitychange", onEventTrigger);
    };
  }, [ms, events]);

  return idle;
}
