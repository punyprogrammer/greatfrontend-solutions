/**
 * Creates a throttled function that invokes `func`
 * at most once every `wait` milliseconds.
 *
 * Leading execution only (no trailing call).
 *
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
export default function throttle(func, wait) {

  // Indicates whether we are currently inside the throttle window
  let inThrottle = false;

  return function (...args) {

    // If not throttled → run immediately
    if (!inThrottle) {

      func.apply(this, args);

      // Enter throttle window
      inThrottle = true;

      // After wait time, allow next execution
      setTimeout(() => {
        inThrottle = false;
      }, wait);
    }

    // If already throttled → ignore the call
  };
}
