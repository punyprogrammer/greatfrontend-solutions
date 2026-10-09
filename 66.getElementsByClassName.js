
/**
 * @param {Element} element
 * @param {string} classNames
 * @return {Array<Element>}
 */
export default function getElementsByClassName(element, classNames) {
  const results = [];
  const classes = classNames.trim().split(/\s+/);

  function traverse(node) {
    for (const child of node.children) {
      if (classes.every((className) => child.classList.contains(className))) {
        results.push(child);
      }

      traverse(child);
    }
  }

  traverse(element);
  return results;
}
