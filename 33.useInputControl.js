import React from "react";

/**
 * @param {string} initialValue
 */
export default function useInputControl(initialValue) {
  const initialValueRef = React.useRef(initialValue);

  const [state, setState] = React.useState({
    value: initialValue,
    dirty: false,
    touched: false,
  });

  const different = state.value !== initialValueRef.current;

  const handleChange = (e) => {
    const value = e.target.value;

    setState((prev) => ({
      ...prev,
      value,
      dirty: true,
    }));
  };

  const handleBlur = () => {
    setState((prev) => ({
      ...prev,
      touched: true,
    }));
  };

  const reset = () => {
    setState({
      value: initialValueRef.current,
      dirty: false,
      touched: false,
    });
  };

  return {
    ...state,
    different,
    handleChange,
    handleBlur,
    reset,
  };
}
