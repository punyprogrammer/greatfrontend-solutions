/**
 * @param {Array<unknown>} iterable
 * @param {(value: unknown) => Promise<unknown>} callbackFn
 * @param {number} [size=Infinity]
 *
 * @return {Promise<Array<unknown>>}
 */
export default function mapAsyncLimit(iterable, callbackFn, size = Infinity) {
  return new Promise((resolve, reject) => {
    const totalPromises = iterable.length;

    if (totalPromises === 0) {
      resolve([]);
      return;
    }

    size = Math.min(size, totalPromises);

    const results = new Array(totalPromises);

    let nextIndex = 0;
    let promisesResolved = 0;

    function runNext() {
      // No more work to start
      if (nextIndex >= totalPromises) {
        return;
      }

      const index = nextIndex++;

      Promise.resolve()
        .then(() => callbackFn(iterable[index]))
        .then((result) => {
          results[index] = result;
          promisesResolved++;

          if (promisesResolved === totalPromises) {
            resolve(results);
            return;
          }

          // This worker is free → take the next item
          runNext();
        })
        .catch(reject);
    }

    // Start `size` workers
    for (let i = 0; i < size; i++) {
      runNext();
    }
  });
}
