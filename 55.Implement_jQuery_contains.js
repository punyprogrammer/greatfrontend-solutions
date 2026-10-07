export default {
  contains(container, contained) {
    return (
      contained.nodeType === Node.ELEMENT_NODE &&
      container !== contained &&
      container.contains(contained)
    );
  }
};
