import React from "react";

/**
 * usePrevious
 * -----------
 * A React hook that returns the previous value of a variable across renders.
 *
 * Unlike simple implementations that store the value in a ref during an effect,
 * this version ensures that the previous value remains stable across re-renders
 * when the input value has not changed.
 *
 * Why this matters:
 * Some naive implementations update the ref during every render:
 *
 *   const ref = useRef();
 *   const prev = ref.current;
 *   ref.current = value;
 *
 * That approach incorrectly updates the stored value on *every render*,
 * which causes problems if the component re-renders without the value changing.
 *
 * This implementation only updates the stored values when the value actually
 * changes, making it robust for scenarios where renders occur without updates
 * to the tracked value.
 *
 * This pattern is commonly used in advanced React hooks to track transitions
 * between values without triggering additional renders.
 *
 * @param {*} value
 * The value whose previous version we want to track.
 *
 * @returns {*}
 * The previous value from the last time `value` changed.
 * On the first render, this will be `undefined`.
 */
export default function usePrevious(value) {
  /**
   * useRef is used because:
   * - The stored value must persist between renders
   * - Updating the value should NOT trigger a re-render
   *
   * The ref stores an object containing:
   *
   * prev → the previous value
   * curr → the current value
   *
   * Initial state:
   *
   * prev: undefined
   * curr: value passed during first render
   */
  const ref = React.useRef({
    prev: undefined,
    curr: value,
  });

  /**
   * During render, we check if the incoming value has changed
   * compared to the last stored "current" value.
   *
   * If the value has changed:
   *   1. The old current value becomes the new previous value
   *   2. The new value becomes the current value
   *
   * If the value has NOT changed:
   *   we do nothing
   *
   * This prevents the previous value from being overwritten
   * during re-renders where the value is the same.
   */
  if (ref.current.curr !== value) {
    ref.current = {
      prev: ref.current.curr,
      curr: value,
    };
  }

  /**
   * The hook returns the stored previous value.
   *
   * Example timeline:
   *
   * Render 1:
   * value = 0
   * prev = undefined
   *
   * Render 2 (value changes to 10):
   * prev = 0
   *
   * Render 3 (re-render, value still 10):
   * prev remains 0
   *
   * Render 4 (value changes to 20):
   * prev = 10
   */
  return ref.current.prev;
}
