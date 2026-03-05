/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
export default function promiseAll(iterable) {
  const totalPromises = iterable.length;
  const results = [];
  let completedPromise = 0;
  return new Promise((resolve, reject) => {
    if (totalPromises === 0) resolve([]);
    for (let i = 0; i < totalPromises; i++) {
      Promise.resolve(iterable[i])
        .then((data) => {
          completedPromise++;
          results[i] = data;
          if (completedPromise === totalPromises) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}
