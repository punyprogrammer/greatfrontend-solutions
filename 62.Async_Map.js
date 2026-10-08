/**
 * @param {Array<any>} iterable
 * @param {Function} callbackFn
 *
 * @return {Promise}
 */
export default function mapAsync(iterable, callbackFn) {
  return new Promise((resolve, reject) => {
    let completedPromises = 0;
    const results = [];
    const size = iterable.length;
    if (size === 0) resolve(results)
      for (let i = 0; i < size; i++) {
        Promise.resolve(callbackFn(iterable[i]))
          .then((data) => {
            results[i] = data;
            completedPromises++;
            if (completedPromises === size) {
              resolve(results);
            }
          })
          .catch((err) => {
            reject(err);
          });
      }
  });
}
