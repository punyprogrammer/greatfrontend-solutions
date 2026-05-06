export default function promiseTimeout(promise, duration) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Promise Timeout"));
      }, duration);
    }),
  ]);
}
