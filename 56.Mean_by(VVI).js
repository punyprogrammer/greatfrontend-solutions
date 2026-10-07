/**
 * @template T
 * @param {Array<T>} array The array to iterate over.
 * @param {(value: T) => number | null | undefined} iteratee
 * @returns {number} Returns the mean value.
 */
function isNullOrUndefined(value) {
  return value === null || value === undefined;
}

export default function meanBy(array, iteratee) {
  let validIndexes = 0;
  let computedSum = 0;

  for (let i = 0; i < array.length; i++) {
    if (!(i in array)) continue;

    const value = iteratee(array[i]);

    if (isNullOrUndefined(value)) continue;

    computedSum += value;
    validIndexes++;
  }

  return validIndexes === 0
    ? NaN
    : computedSum / validIndexes;
}
