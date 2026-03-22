/**
 * @template T
 * @param {T} value
 * @return {T}
 */
export default function deepClone(value) {
  if (value === null || typeof value !== "object") return value;
  // array handling
  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item));
  }
  const clone = {};
  // iterate through all the keys
  for (let key in value) {
    clone[key] = deepClone(value[key]);
  }
  return clone;
}
