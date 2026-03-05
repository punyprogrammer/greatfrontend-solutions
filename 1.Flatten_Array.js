export default function flatten(value) {
  const result = [];

  for (const item of value) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }

  return result;
}
