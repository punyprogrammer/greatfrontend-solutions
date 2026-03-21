import React from "react";

/**
 * @param {string} query
 * @returns {boolean}
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(() =>
    window.matchMedia(query).matches
  );

  React.useEffect(() => {
    const mql = window.matchMedia(query);

    // 🔹 Sync immediately when query changes
    setMatches(mql.matches);

    const handleChange = (e) => {
      setMatches(e.matches);
    };

    mql.addEventListener("change", handleChange);

    return () => {
      mql.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
