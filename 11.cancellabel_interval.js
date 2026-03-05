// Problem:
// Implement a function `setCancellableInterval` that behaves like the native
// `setInterval`, but instead of returning a timer ID, it returns a function
// that can be called to cancel the interval.
//
// Normally in JavaScript:
//
// const id = setInterval(callback, delay);
// clearInterval(id);
//
// The caller must keep track of the timer ID and pass it to `clearInterval`.
//
// In this problem, we want a cleaner API where:
//
// const cancel = setCancellableInterval(callback, delay);
// cancel(); // stops the interval
//
// Requirements:
// 1. The function must accept the same arguments as `setInterval`.
// 2. The callback should run repeatedly after the specified delay.
// 3. Any additional arguments should be forwarded to the callback.
// 4. The function should return another function that cancels the interval.
//
// Function signature:
//
// setCancellableInterval(callback, delay, ...args) -> cancelFunction
//
// Example:
//
// const cancel = setCancellableInterval(
//   (name) => console.log("Hello", name),
//   1000,
//   "Alice"
// );
//
// Output every second:
// Hello Alice
// Hello Alice
//
// cancel(); // stops the interval


/**
 * @param {Function} callback
 * @param {number} delay
 * @param {...any} args
 * @returns {Function} cancel function
 */
export default function setCancellableInterval(callback, delay, ...args) {
  // store the interval ID returned by setInterval
  let intervalId = null;

  // start the interval
  intervalId = setInterval(() => {
    // invoke the callback with any provided arguments
    callback(...args);
  }, delay);

  // return a function that cancels the interval when invoked
  // closure allows access to intervalId
  return function () {
    clearInterval(intervalId);
  };
}
