/**
 * @param {number} maxStep
 */
import React from "react";

export default function useStep(maxStep) {
  const [step, setStep] = React.useState(1);
  const next = () => setStep((prev) => (prev + 1 <= maxStep ? prev + 1 : prev));
  const previous = () => setStep((prev) => (prev - 1 > 0 ? prev - 1 : prev));
  const reset = () => setStep(1);
  const hasNext = step < maxStep;
  const hasPrevious = step > 1;
  const setStepSafe = (value) => {
    setStep((prev) => {
      const nextValue = typeof value === "function" ? value(prev) : value;

      if (nextValue < 1 || nextValue > maxStep) {
        return 1;
      }

      return nextValue;
    });
  };
  return {
    step,
    next,
    previous,
    reset,
    setStep: setStepSafe,
    hasNext,
    hasPrevious,
  };
}
