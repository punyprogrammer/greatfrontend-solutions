import React from "react";

/**
 * @template T
 * @returns {[import("react").RefCallback<T>, boolean]}
 */
export default function useHover() {
  const [hovered, setHovered] = React.useState(false);
  const elementRef = React.useRef(null);

  const refCallback = React.useCallback((node) => {
    if (elementRef.current) {
      elementRef.current.removeEventListener("mouseenter", handleMouseEnter);
      elementRef.current.removeEventListener("mouseleave", handleMouseLeave);
    }

    if (node) {
      node.addEventListener("mouseenter", handleMouseEnter);
      node.addEventListener("mouseleave", handleMouseLeave);
    }

    elementRef.current = node;
  }, []);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return [refCallback, hovered];
}
