/**
 * @param {Array} iterable
 * @return {Promise}
 */
export default function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (!promises.length) reject(new AggregateError([], "No promises passed"));
    const totalPromises = promises.length;
    const errors = [];
    let rejectedCount = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((data) => resolve(data))
        .catch((error) => {
          errors[index] = error;
          if (++rejectedCount === totalPromises)
            reject(
              new AggregateError(errors, "None of the promises were resolved"),
            );
        });
    });
  });
}
