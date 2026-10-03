
/**
 * Deeply compares two values for equality.
 *
 * Handles:
 * - Primitives
 * - null / undefined
 * - Objects
 * - Arrays
 * - Nested objects and arrays
 * - Sparse arrays
 *
 * @param {unknown} valueA
 * @param {unknown} valueB
 * @returns {boolean}
 */
export default function deepEqual(valueA, valueB) {
  // ------------------------------------------------------------
  // 1. FAST PATH
  // ------------------------------------------------------------
  // If both values are strictly equal:
  // - Same primitive value
  // - Same object/array reference
  //
  // We can immediately return true without doing any deeper checks.
  //
  // Examples:
  //   deepEqual(10, 10)       -> true
  //   deepEqual("foo", "foo") -> true
  //   deepEqual(null, null)   -> true
  //   deepEqual(obj, obj)     -> true
  if (valueA === valueB) return true;

  // ------------------------------------------------------------
  // 2. NULL HANDLING
  // ------------------------------------------------------------
  // typeof null === "object" in JavaScript.
  //
  // Therefore, null needs to be handled before the object logic.
  //
  // If one value is null and the other isn't, they cannot be equal.
  //
  // Example:
  //   deepEqual(null, {}) -> false
  //   deepEqual(null, []) -> false
  if (valueA === null || valueB === null) {
    return valueA === valueB;
  }

  // ------------------------------------------------------------
  // 3. TYPE CHECK
  // ------------------------------------------------------------
  // Values with different types cannot be deeply equal.
  //
  // Example:
  //   deepEqual(10, "10")     -> false
  //   deepEqual(true, 1)      -> false
  //   deepEqual({}, [])       -> false
  if (typeof valueA !== typeof valueB) return false;

  // ------------------------------------------------------------
  // 4. PRIMITIVE VALUES
  // ------------------------------------------------------------
  // At this point, both values have the same type.
  //
  // If the value isn't an object, there is nothing to traverse.
  // We can simply compare the values directly.
  //
  // Handles:
  //   string, number, boolean, undefined, bigint, symbol
  //
  // Example:
  //   deepEqual("foo", "foo") -> true
  //   deepEqual(10, 20)       -> false
  if (typeof valueA !== "object") {
    return valueA === valueB;
  }

  // ------------------------------------------------------------
  // 5. ARRAY VS OBJECT CHECK
  // ------------------------------------------------------------
  // typeof [] === "object", so typeof alone cannot distinguish
  // an array from a normal object.
  //
  // We therefore explicitly check whether each value is an array.
  //
  // Example:
  //   deepEqual([], {}) -> false
  //   deepEqual({}, []) -> false
  if (Array.isArray(valueA) !== Array.isArray(valueB)) {
    return false;
  }

  // ------------------------------------------------------------
  // 6. ARRAY LENGTH CHECK
  // ------------------------------------------------------------
  // For arrays, length is part of the structure.
  //
  // This is especially important for sparse arrays because
  // Object.keys() only returns indices that actually exist.
  //
  // Example:
  //   const a = new Array(3);
  //   const b = new Array(5);
  //
  //   Object.keys(a) -> []
  //   Object.keys(b) -> []
  //
  // Without checking length, these could incorrectly be considered
  // equal.
  if (Array.isArray(valueA) && valueA.length !== valueB.length) {
    return false;
  }

  // ------------------------------------------------------------
  // 7. GET EXISTING KEYS
  // ------------------------------------------------------------
  // Object.keys() returns the object's own enumerable property keys.
  //
  // For arrays, this also helps us distinguish:
  //
  //   [undefined]
  //
  // from:
  //
  //   new Array(1)
  //
  // Both have length 1, but:
  //
  //   Object.keys([undefined]) -> ["0"]
  //   Object.keys(new Array(1)) -> []
  //
  // Therefore, Object.keys() preserves the distinction between
  // an explicitly stored undefined value and a sparse-array hole.
  const keysA = Object.keys(valueA);
  const keysB = Object.keys(valueB);

  // ------------------------------------------------------------
  // 8. NUMBER OF KEYS CHECK
  // ------------------------------------------------------------
  // If the objects contain a different number of properties,
  // they cannot be deeply equal.
  //
  // Example:
  //   { a: 1 }
  //   { a: 1, b: 2 }
  //
  // keysA.length -> 1
  // keysB.length -> 2
  if (keysA.length !== keysB.length) return false;

  // ------------------------------------------------------------
  // 9. KEY + VALUE COMPARISON
  // ------------------------------------------------------------
  // Every key in valueA must:
  //
  // 1. Exist in valueB
  // 2. Have a deeply equal value
  //
  // The recursive deepEqual() call allows this to work for nested
  // objects and arrays.
  //
  // Example:
  //   {
  //     user: {
  //       name: "John"
  //     }
  //   }
  //
  // The function recursively compares:
  //
  //   valueA.user
  //   valueB.user
  //
  // and continues until it reaches primitive values.
  for (const key of keysA) {
    // The same key must exist in both objects.
    if (keysB.indexOf(key) === -1) return false;

    // Recursively compare the values associated with this key.
    if (!deepEqual(valueA[key], valueB[key])) {
      return false;
    }
  }

  // ------------------------------------------------------------
  // 10. ALL CHECKS PASSED
  // ------------------------------------------------------------
  // The values have:
  // - The same type
  // - The same array/object structure
  // - The same array length (if arrays)
  // - The same number of keys
  // - The same keys
  // - Deeply equal values for every key
  return true;
}
