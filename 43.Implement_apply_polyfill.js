/**
 * @this {(...args: Array<unknown>) => unknown}
 * @param {unknown} thisArg
 * @param {Array<unknown>} [argArray]
 * @returns {unknown}
 */
Function.prototype.myApply = function (thisArg, argArray) {
 const context = thisArg ||globalThis;
 const sym = Symbol('fn');
 context[sym] = this;
 const result = context[sym](...(argArray||[]));
 delete context[sym];
 return result;
};
