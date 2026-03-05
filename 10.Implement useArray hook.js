import React from "react";

/**
 * @template T
 * @param {T[]} defaultValue
 */
export default function useArray(defaultValue = []) {
  const [array, setArray] = React.useState(defaultValue);

  const set = (newArray) => setArray(newArray);

  const push = (item) =>
    setArray((prev) => [...prev, item]);

  const remove = (index) =>
    setArray((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);

  const update = (index, newItem) =>
    setArray((prev) => {
      const copy = [...prev];
      copy[index] = newItem;
      return copy;
    });

  const filter = (predicate) =>
    setArray((prev) => prev.filter(predicate));

  const clear = () => setArray([]);

  return { array, set, push, remove, update, filter, clear };
}
