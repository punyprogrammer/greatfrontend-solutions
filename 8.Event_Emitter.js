export default class EventEmitter {
  constructor() {
    this.eventCallbackMap = {};
  }

  on(eventName, listener) {
    if (!this.eventCallbackMap[eventName]) {
      this.eventCallbackMap[eventName] = [];
    }

    this.eventCallbackMap[eventName].push(listener);

    return this;
  }

  off(eventName, listener) {
    const listeners = this.eventCallbackMap[eventName];

    if (!listeners) return this;

    const index = listeners.indexOf(listener);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    return this;
  }

  emit(eventName, ...args) {
    const listeners = this.eventCallbackMap[eventName];

    if (!listeners || listeners.length === 0) {
      return false;
    }

    listeners.forEach((listener) => {
      listener(...args);
    });

    return true;
  }
}
