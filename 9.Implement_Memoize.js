/**
 * @param {Function} func
 * @returns Function
 */
export default function memoize(func) {
  const memo = {};
  return function (arg) {
    // generate hash key to diffrerentiate string and number
    const hashKey = typeof arg == "string" ? arg + "_str" : arg + "_num";
    if (memo[hashKey]) return memo[hashKey];
    memo[hashKey] = func.call(this, arg);
    return memo[hashKey];
  };
}
