/**
 * @param {number} [count]
 * @return {string}
 */
String.prototype.myRepeat = function (count) {
  if (this === null || this === undefined) {
    throw new TypeError("Receiver cannot be null or undefined");
  }

  if (!count) {
    return "";
  }

  if (count < 0 || count === Infinity) {
    throw new RangeError("Invalid count");
  }

  count = Math.floor(count);

  const str = String(this);
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push(str);
  }

  return result.join("");
};
