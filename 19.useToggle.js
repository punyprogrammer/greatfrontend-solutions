/**
 * @param {boolean | undefined} defaultValue
 */
import React from "react";
export default function useToggle(defaultValue) {
  const [value, setValue] = React.useState(defaultValue ?? false);
  const toggle = () => setValue((prev) => !prev);
  return [value, toggle, setValue];
}
