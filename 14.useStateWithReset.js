import React from "react";

export default function useStateWithReset(initialStateOrInitializer) {

  // We need to use useRef as the value as to kept stable across renders
  const initialRef = React.useRef(
    typeof initialStateOrInitializer === "function"
      ? initialStateOrInitializer()
      : initialStateOrInitializer
  );

  const [value, setValue] = React.useState(initialRef.current);

  const resetValue = () => {
    setValue(initialRef.current);
  };

  return [value, setValue, resetValue];
}
