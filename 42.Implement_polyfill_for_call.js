/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {any}
 */
Function.prototype.myCall = function (thisArg, ...argArray) {
  const context = thisArg||globalThis;
  const sym =  Symbol();
  context[sym] = this;
  const result = context[sym](...argArray);
  delete context[sym];
  return result;

};
