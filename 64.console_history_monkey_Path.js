/**
 * @returns {() => Array<Array<unknown>>}
 */

export default function consoleLogHistory() {
  const originalConsoleLog = console.log;
  const originalConsoleClear = console.clear;
  const historyLog = [];
  console.log = function (...args) {
    historyLog.push(args);
    originalConsoleLog(...args);
  };
  console.clear = function (...args) {
    historyLog.length = 0;
    originalConsoleClear(...args);
  };
  return function () {
    return historyLog;
  };
}
