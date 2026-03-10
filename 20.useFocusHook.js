/**
 * @template T
 * @returns {[import("react").RefObject<T>, () => void]}
 */
import React from "react";
export default function useFocus() {
  const ref = React.useRef(null);
  const focus = () => ref.current.focus();
  return [ref,focus]
}
