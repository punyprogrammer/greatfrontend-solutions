/**
 * @callback callback
 * @param {KeyboardEvent} e
 */

/**
 * @typedef {Object} UseKeyPressOptions
 * @property {'keyup' | 'keydown'} event
 * @property {EventTarget} target
 */

/**
 * @param {string} key
 * @param {callback} callback
 * @param {UseKeyPressOptions} options
 */

import React from "react";
export default function useKeyPress(
  key,
  callback,
  { event = "keydown", target = window } = {
    event: "keydown",
    target: window,
  },
) {
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === key) {
        callbackRef.current(e);
      }
    };
    if (!target || !target.addEventListener) return;
    if (target?.addEventListener) {
      target.addEventListener(event, handleKeyPress);
    }
    return () => target.removeEventListener(event, handleKeyPress);
  }, [target, event, key]);
}
