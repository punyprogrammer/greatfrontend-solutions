export default function deepMap(value, fn) {
  // null stays null
  if (value === null) return null;

  // primitives OR special objects (RegExp, Function)
  if (
    typeof value !== "object" ||
    value instanceof RegExp ||
    typeof value === "function"
  ) {
    return fn(value);
  }

  // arrays
  if (Array.isArray(value)) {
    return value.map((item) => deepMap(item, fn));
  }

  // plain objects
  const result = {};

  for (let key in value) {
    const val = value[key];

    if (
      val !== null &&
      typeof val === "object" &&
      !(val instanceof RegExp) &&
      typeof val !== "function"
    ) {
      // recurse for nested objects/arrays
      result[key] = deepMap(val, fn);
    } else {
      // 🔥 apply fn with correct `this`
      result[key] = fn.call(value, val);
    }
  }

  return result;
}
