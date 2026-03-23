export default function createResumableInterval(callback, delay, ...args) {
  let intervalId = null;
  let isStopped = false;
  let isRunning = false;

  function start() {
    if (isStopped || isRunning) return;

    isRunning = true;

    // immediate execution
    callback(...args);

    intervalId = setInterval(() => {
      callback(...args);
    }, delay);
  }

  function pause() {
    if (!isRunning) return;

    clearInterval(intervalId);
    isRunning = false;
  }

  function stop() {
    clearInterval(intervalId);
    isRunning = false;
    isStopped = true;
  }

  return { start, pause, stop };
}
