
/**
 * @param {Element} element
 * @param {string} property
 * @param {string} value
 * @return {Element[]}
 */
export default function getElementsByStyle(element, property, value) {
  const result = [];

  function traverse(node) {
    for (const child of node.children) {
      if (getComputedStyle(child).getPropertyValue(property) === value) {
        result.push(child);
      }

      traverse(child);
    }
  }

  traverse(element);

  return result;
}
