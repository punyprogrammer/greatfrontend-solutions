/**
 * Problem:
 *
 * Implement `promisify` for a callback-based asynchronous function
 * that follows the Node.js error-first callback convention:
 *
 *     callback(error, value)
 *
 * Example:
 *
 *     function foo(url, options, callback) {
 *       apiCall(url, options)
 *         .then(data => callback(null, data))
 *         .catch(err => callback(err));
 *     }
 *
 * `promisify(foo)` should return a new function that:
 *   1. Returns a Promise instead of requiring a callback.
 *   2. Forwards all arguments to the original function.
 *   3. Appends a new callback as the final argument.
 *   4. Preserves the `this` value from the call site.
 *   5. Resolves when the callback receives a value.
 *   6. Rejects when the callback receives an error.
 *
 * @template TResult
 * @param {(...args: Array<unknown>) => void} func
 * @returns {(...args: Array<unknown>) => Promise<TResult>}
 */
export default function promisify(func) {
  // Return a new function because the promisified version
  // should have the same arguments as the original function,
  // except that the caller no longer provides the callback.
  return function (...args) {
    // The callback-based API will eventually call our callback.
    // We use that callback to translate the callback result
    // into Promise resolution/rejection.
    return new Promise((resolve, reject) => {
      
      // Node-style callbacks conventionally use:
      //
      //   callback(error, value)
      //
      // If `err` is truthy → the async operation failed.
      // Otherwise → the operation succeeded.
      const callback = (err, val) => {
        err ? reject(err) : resolve(val);
      };

      // Call the original function with:
      //
      // 1. The original `this` value
      // 2. All arguments supplied to the promisified function
      // 3. Our callback as the final argument
      //
      // Example:
      //
      //   promisifiedFoo(url, options)
      //
      // becomes:
      //
      //   foo.call(this, url, options, callback)
      //
      // `call()` is important because simply doing `func(...args, callback)`
      // would lose the caller's `this` context.
      func.call(this, ...args, callback);
    });
  };
}
