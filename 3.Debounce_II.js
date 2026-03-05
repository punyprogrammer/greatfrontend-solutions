/**
 * Creates a debounced version of a function.
 * Debouncing ensures that the function is only executed
 * after it has not been called for a specified delay.
 *
 * Common use cases:
 * - Search input (wait until user stops typing)
 * - Window resize events
 * - Scroll handlers
 *
 * @param {Function} func - The original function to debounce
 * @param {number} wait - Delay time in milliseconds
 * @return {Function} - Debounced version of the function
 */
export default function debounce(func, wait) {

  // Stores the current timer ID for the debounce delay
  let timerId = null;

  // Stores the last "this" context used to call the function
  // Needed so we can correctly invoke func with the same context later
  let lastThis = null;

  // Stores the latest arguments passed to the debounced function
  let lastArgs = null;

  /**
   * The debounced wrapper function
   * This function is returned and replaces the original function
   */
  function debounced(...args) {

    // Save the latest arguments and context
    lastArgs = args;
    lastThis = this;

    // If a timer is already running, cancel it
    // This resets the debounce delay
    if (timerId) {
      clearTimeout(timerId);
    }

    // Start a new timer
    // The function will execute only after `wait` milliseconds
    timerId = setTimeout(() => {

      // Call the original function with the correct context and arguments
      func.apply(lastThis, lastArgs);

      // Reset timerId after execution
      timerId = null;

    }, wait);
  }

  /**
   * Cancels any pending debounced execution.
   * Useful if you want to prevent the function from running.
   */
  debounced.cancel = function () {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  /**
   * Immediately executes the pending debounced function
   * instead of waiting for the remaining delay.
   */
  debounced.flush = function () {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;

      // Execute immediately with the latest arguments and context
      func.apply(lastThis, lastArgs);
    }
  };

  // Return the wrapped debounced function
  return debounced;
}
