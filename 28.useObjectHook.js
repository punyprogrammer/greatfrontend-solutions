/**
 * @template T
 * @param {T} initialValue
 */
import React from "react";
export default function useObject(initialValue) {
  const [value, setValue] = React.useState(initialValue);
  const setRecord = (arg) => {
    // if arg is a object
    if (typeof arg == "object") {
      setValue((prev) => ({ ...prev, ...arg }));
    } else {
      setValue({ ...value, ...arg(value) });
    }
  };
  return [value, setRecord];
}
