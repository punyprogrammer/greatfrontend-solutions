/**
 * @param {any} val
 * @param {Array<string>} keys
 * @returns any
 */
export default function deepOmit(val, keys) {
  // if primitive type and null
  if (val === null || typeof val !== "object") return val;
  // array handling
  if (Array.isArray(val)) {
    return val.map((item) => deepOmit(item, keys));
  }
  const clone = {};
  for (let key in val) {
    if (!keys.includes(key)) {
      clone[key] = deepOmit(val[key], keys);
    }
  }
  
  return clone;
}

const result = deepOmit({ a: 1, b: 2, c: 3 }, ['b']);
console.log(result);
