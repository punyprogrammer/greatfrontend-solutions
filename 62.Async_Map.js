export default function mapAsync(iterable, callbackFn) {
  return new Promise((resolve, reject) => {
    const size = iterable.length;
    const results = new Array(size);

    if (size === 0) {
      resolve(results);
      return;
    }

    let completed = 0;

    for (let i = 0; i < size; i++) {
      Promise.resolve()
        .then(() => callbackFn(iterable[i], i, iterable))
        .then((result) => {
          results[i] = result;
          completed++;

          if (completed === size) {
            resolve(results);
          }
        })
        .catch(reject);
    }
  });
}
