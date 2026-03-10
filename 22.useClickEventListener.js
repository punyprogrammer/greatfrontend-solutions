import React from "react";

/**
 * Detect clicks outside a referenced element.
 *
 * @template T
 * @param {import("react").RefObject<T>} ref
 * @param {(event: Event) => void} handler
 * @param {keyof DocumentEventMap} [eventType='pointerdown']
 * @param {boolean | AddEventListenerOptions} [eventListenerOptions]
 */
export default function useClickOutside(
  ref,
  handler,
  eventType = "pointerdown",
  eventListenerOptions
) {
  const handlerRef = React.useRef(handler);

  // Always keep the latest handler
  React.useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  React.useEffect(() => {
    function listener(event) {
      const el = ref.current;

      if (!el) return;

      // Ignore clicks inside the element
      if (el.contains(event.target)) return;

      handlerRef.current(event);
    }

    document.addEventListener(eventType, listener, eventListenerOptions);

    return () => {
      document.removeEventListener(eventType, listener, eventListenerOptions);
    };
  }, [ref, eventType, eventListenerOptions]);
}
