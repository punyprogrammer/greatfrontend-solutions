/**
 * @template T
 * @param {...(T | Array<T>)} items
 * @return {Array<T>}
 */
Array.prototype.myConcat = function (...items) {
  const result = [];

  // Copy `this` while preserving holes.
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result[i] = this[i];
    }
  }

  // Ensure trailing holes are preserved.
  result.length = this.length;

  for (const item of items) {
    if (Array.isArray(item)) {
      // Append array while preserving its holes.
      for (let i = 0; i < item.length; i++) {
        if (i in item) {
          result.push(item[i]);
        } else {
          // Increase length without creating a value.
          result.length++;
        }
      }
    } else {
      result.push(item);
    }
  }

  return result;
};
