import React from "react";

export default function useMap(initialState) {
  const initializer = () => new Map(initialState);

  const [map, setMap] = React.useState(initializer);

  const set = (key, value) => {
    setMap((prev) => {
      const next = new Map(prev);
      next.set(key, value);
      return next;
    });
  };

  const setAll = (entries) => {
    setMap((prev) => {
      const next = new Map(prev);
      entries.forEach(([k, v]) => next.set(k, v));
      return next;
    });
  };

  const remove = (key) => {
    setMap((prev) => {
      const next = new Map(prev);
      next.delete(key);
      return next;
    });
  };

  const reset = () => {
    setMap(new Map());
  };

  return { map, set, setAll, remove, reset };
}
