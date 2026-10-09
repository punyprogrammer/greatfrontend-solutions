
/**
 * @param {(value: unknown) => unknown} iteratee
 * @param {...Array<unknown>} arrays
 * @returns {Array<unknown>}
 */
export default function unionBy(iteratee, ...arrays) {
  const seen = new Set();
  const result = [];

  for (const array of arrays) {
    for (const item of array) {
      const key = iteratee(item);

      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    }
  }

  return result;
}
