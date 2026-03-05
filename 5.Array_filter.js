/**
 * Custom implementation of Array.prototype.filter
 *
 * The filter() method creates a new array containing
 * all elements that pass the test implemented by the callback function.
 *
 * @template T
 * @param {(value: T, index: number, array: Array<T>) => boolean} callbackFn
 *        Function executed for each element.
 *        It receives:
 *        - value: current array element
 *        - index: index of the element
 *        - array: the original array
 *
 * @param {any} [thisArg]
 *        Optional value used as `this` when executing the callback
 *
 * @return {Array<T>}
 *        A new array containing elements that satisfy the condition
 */
Array.prototype.myFilter = function (callbackFn, thisArg) {

  // Array that will store elements passing the test
  const results = [];

  /**
   * Iterate through the array
   * `this` refers to the array on which myFilter is called
   */
  for (let i = 0; i < this.length; i++) {

    /**
     * Important: Check if the index actually exists in the array
     * This prevents iterating over "holes" in sparse arrays
     *
     * Example:
     * const arr = [1, , 3]
     * index 1 does not exist
     */
    if (this.hasOwnProperty(i)) {

      /**
       * Call the callback function with:
       * - thisArg as `this`
       * - current value
       * - index
       * - original array
       *
       * Using `.call()` allows us to bind `thisArg`
       */
      const shouldInclude = callbackFn.call(
        thisArg,
        this[i],
        i,
        this
      );

      /**
       * If callback returns true,
       * include the element in the result array
       */
      if (shouldInclude) {
        results.push(this[i]);
      }
    }
  }

  // Return the filtered array
  return results;
};
