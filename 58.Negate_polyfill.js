/**
 * @param {Function} predicate The predicate to negate.
 * @returns {Function} Returns the new negated function.
 */
export default function negate(predicate) {
  return function (...args) {
    return !predicate.call(this, ...args);
  };
}
