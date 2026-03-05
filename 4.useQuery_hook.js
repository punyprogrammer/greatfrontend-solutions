/**
 * Custom React hook to fetch async data safely.
 * It ensures that only the latest async request updates the state.
 *
 * Problem it solves:
 * When dependencies change quickly, multiple async calls can run in parallel.
 * Older responses might arrive later and overwrite newer data (race condition).
 *
 * Solution:
 * Use a requestId stored in a ref to ensure only the latest request
 * updates the state.
 *
 * @template T
 * @param {() => Promise<T>} fn - async function that returns data
 * @param {import("react").DependencyList} deps - dependency array that triggers refetch
 */

import React from "react";

export default function useQuery(fn, deps = []) {

  /**
   * result state contains the status of the async request
   *
   * Possible states:
   * loading → request in progress
   * success → data fetched successfully
   * error   → request failed
   */
  const [result, setResult] = React.useState({
    status: "loading",
  });

  /**
   * requestIdRef tracks the most recent request.
   * useRef is used because:
   * - it persists between renders
   * - updating it does NOT trigger re-renders
   */
  const requestIdRef = React.useRef(0);

  React.useEffect(() => {

    /**
     * Increment request ID whenever the effect runs.
     * This means a new request has started.
     */
    const requestId = ++requestIdRef.current;

    async function makeApiCall() {

      // Update UI to loading state
      setResult({ status: "loading" });

      try {

        // Call the async function
        const data = await fn();

        /**
         * IMPORTANT CHECK
         *
         * Only update the state if this request
         * is still the most recent one.
         *
         * This prevents stale responses from older
         * requests overwriting newer data.
         */
        if (requestId === requestIdRef.current) {
          setResult({
            status: "success",
            data,
          });
        }

      } catch (error) {

        /**
         * Same protection for errors
         * Ignore errors from outdated requests
         */
        if (requestId === requestIdRef.current) {
          setResult({
            status: "error",
            error,
          });
        }
      }
    }

    makeApiCall();

  }, deps);

  return result;
}
