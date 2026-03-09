import React from "react";

// A WeakSet is used to track which effect functions have already been executed.
// We use WeakSet instead of Set to avoid memory leaks — once the effect function
// is no longer referenced anywhere, it can be garbage collected automatically.
const executedEffects = new WeakSet();

export default function useEffectOnce(effect) {
  React.useEffect(() => {
    // React StrictMode intentionally mounts, unmounts, and remounts components
    // in development to detect unsafe side effects.
    // Because of this, useEffect(() => {}, []) may run twice during development.

    // If this specific effect function has already been executed,
    // we skip running it again.
    if (executedEffects.has(effect)) return;

    // Mark this effect as executed so it won't run again
    // even if StrictMode remounts the component.
    executedEffects.add(effect);

    // Execute the effect and return its cleanup function (if provided).
    // Returning the cleanup ensures React still properly handles
    // resource cleanup when the component unmounts.
    return effect();

    // Empty dependency array ensures the effect normally runs
    // only once per component mount.
  }, []);
}
