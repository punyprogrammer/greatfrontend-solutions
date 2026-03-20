/**
 * @template T
 * @param {Set<T>} initialState
 */
import React from "react";
export default function useSet(initialState = new Set()) {
  const [val, setVal] = React.useState(initialState);
  const add = (key) => {
    const newState = new Set(val);
    newState.add(key);
    setVal(newState);
  };
  const remove = (key) => {
    const newState = new Set(val);
    newState.delete(key);
    setVal(newState);
  };
  const toggle = (key) => {
    const newState = new Set(val);
    if (newState.has(key)) {
      newState.delete(key);
    } else {
      newState.add(key);
    }
    setVal(newState);
  };
  const reset = () => {
    setVal(initialState);
  };
  const clear = () => {
    setVal(new Set());
  };
  return {set:val, add, remove, toggle, reset, clear};
}
