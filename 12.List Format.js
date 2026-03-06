/**
 * @param {Array<string>} items
 * @param {{sorted?: boolean, length?: number, unique?: boolean}} [options]
 * @return {string}
 */
export default function listFormat(items, options = {}) {
  // remove empty strings
  items = items.filter(Boolean);

  if (!items.length) return "";

  // keep unique
  if (options.unique) {
    items = [...new Set(items)];
  }

  // sort alphabetically
  if (options.sorted) {
    items.sort((a, b) => a.localeCompare(b));
  }

  const len = options.length;

  // apply truncation only if length is valid
  if (typeof len === "number" && len > 0 && len < items.length) {
    const visible = items.slice(0, len);
    const remaining = items.length - len;

    return `${visible.join(", ")} and ${remaining} ${
      remaining > 1 ? "others" : "other"
    }`;
  }

  // normal formatting
  if (items.length === 1) return items[0];

  return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}
