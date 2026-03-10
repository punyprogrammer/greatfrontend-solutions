/**
 * @template T
 * @param {T} value
 * @param {number} delay
 */
import React from "react";
export default function useDebounce(value, delay) {
  // throw 'Not implemented';
  // use a ref that updates value after delay
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  let timerId = React.useRef();
  React.useEffect(() => {
    if (timerId.current) clearTimeout(timerId.current);

    timerId.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timerId.current);
  }, [value, delay]);
  return debouncedValue;
}
