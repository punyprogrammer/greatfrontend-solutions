import React from "react";

/**
 * useEventListener
 * ----------------
 * A reusable React hook for attaching an event listener to either:
 *  - a DOM element (via a ref)
 *  - the global `window` object (default fallback)
 *
 * This hook ensures:
 * 1. The event listener is properly added when the component mounts.
 * 2. The listener is removed when the component unmounts.
 * 3. The latest handler function is always called without needing to
 *    re-register the event listener on every render.
 *
 * Using a ref to store the handler avoids a common "stale closure"
 * problem where the event listener continues to reference an outdated
 * version of the handler function.
 *
 * @template T
 *
 * @param {keyof WindowEventMap} eventName
 * Name of the event to listen for (e.g. "click", "resize", "keydown").
 *
 * @param {(event: Event) => void} handler
 * Function that will be called whenever the event fires.
 *
 * @param {import("react").RefObject<T>} [element]
 * Optional React ref pointing to the DOM element that should receive
 * the event listener. If not provided, the listener will be attached
 * to the `window` object.
 *
 * @param {boolean | AddEventListenerOptions} [options]
 * Optional configuration passed directly to `addEventListener`.
 * Examples:
 *  - `{ passive: true }`
 *  - `{ capture: true }`
 */
export default function useEventListener(eventName, handler, element, options) {
  /**
   * Ref that stores the most recent version of the handler.
   *
   * Why we need this:
   * If we directly used `handler` inside the event listener,
   * React would require us to re-attach the event listener
   * every time the handler changes.
   *
   * By storing the handler in a ref, the event listener remains
   * stable while still calling the newest handler.
   */
  const savedHandler = React.useRef(handler);

  /**
   * Update the ref whenever the handler changes.
   *
   * This ensures the event listener always calls the latest handler
   * without needing to detach and reattach the event listener.
   */
  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  /**
   * Effect responsible for attaching and cleaning up the event listener.
   */
  React.useEffect(() => {
    /**
     * Determine the event target.
     *
     * Priority:
     * 1. If a ref is provided and has a current value → use that element
     * 2. Otherwise → fallback to the global window object
     */
    const target = element?.current ?? window;

    /**
     * Guard against invalid targets.
     *
     * This can happen if:
     * - the ref has not been attached yet
     * - the target does not support event listeners
     */
    if (!target?.addEventListener) return;

    /**
     * Wrapper listener function.
     *
     * Instead of calling `handler` directly, we call the function stored
     * in the ref so that we always execute the latest handler.
     */
    const listener = (event) => savedHandler.current(event);

    /**
     * Attach the event listener.
     */
    target.addEventListener(eventName, listener, options);

    /**
     * Cleanup function.
     *
     * React automatically runs this when:
     *  - the component unmounts
     *  - dependencies change
     *
     * This prevents memory leaks and duplicate listeners.
     */
    return () => {
      target.removeEventListener(eventName, listener, options);
    };
  }, [eventName, element, options]);
}
