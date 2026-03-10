import React from "react";

/**
 * Returns the current breakpoint name based on window width.
 */
function getBreakpoint(breakpoints) {
  if (typeof window === "undefined") return null;

  const width = window.innerWidth;

  // Sort breakpoints by size
  const sorted = Object.entries(breakpoints).sort(
    ([, a], [, b]) => a - b
  );

  let current = sorted[0][0];

  for (const [name, size] of sorted) {
    if (width >= size) {
      current = name;
    }
  }

  return current;
}

/**
 * React hook that tracks current responsive breakpoint.
 *
 * @param {Object<string, number>} breakpoints
 * Example:
 * {
 *   mobile: 0,
 *   tablet: 768,
 *   desktop: 1024
 * }
 */
export default function useBreakpoint(breakpoints) {
  const [breakpoint, setBreakpoint] = React.useState(() =>
    getBreakpoint(breakpoints)
  );

  React.useEffect(() => {
    function handleResize() {
      setBreakpoint(getBreakpoint(breakpoints));
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoints]);

  return ()=>breakpoint;
}
