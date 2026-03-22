export default function deepMerge(valA, valB) {
  // Handle primitives or type mismatch
  if (
    valA === null ||
    valB === null ||
    typeof valA !== "object" ||
    typeof valB !== "object"
  ) {
    return valB;
  }

  // Arrays
  if (Array.isArray(valA) && Array.isArray(valB)) {
    return [...valA, ...valB];
  }

  // If one is array and other is not → override
  if (Array.isArray(valA) || Array.isArray(valB)) {
    return valB;
  }

  // Plain objects
  const result = {};

  const keys = new Set([...Object.keys(valA), ...Object.keys(valB)]);

  for (let key of keys) {
    if (key in valA && key in valB) {
      result[key] = deepMerge(valA[key], valB[key]);
    } else if (key in valA) {
      result[key] = valA[key];
    } else {
      result[key] = valB[key];
    }
  }

  return result;
}
