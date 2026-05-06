/**
 * @template T
 * @param {Promise<T>} promise
 * @param {number} duration
 * @return {Promise<T>}
 */
export default function promiseTimeout(promise, duration) {
  return new Promise((resolve, reject) => {
    let timerId = null;
    timerId = setTimeout(() => {
      reject("Promise timeout");
    }, duration);
    Promise.resolve(promise)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        clearTimeout(timerId);
      });
  });
}
