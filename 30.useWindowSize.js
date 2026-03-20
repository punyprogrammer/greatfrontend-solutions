/**
 * @typedef {Object} WindowSize
 * @property {number} height
 * @property {number} width
 */
/**
 * @returns {WindowSize}
 */

import React from "react";
export default function useWindowSize() {
  const [screen, setScreen] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  React.useEffect(() => {
    const updateScreen = () =>
      setScreen({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);
  return screen;
}
