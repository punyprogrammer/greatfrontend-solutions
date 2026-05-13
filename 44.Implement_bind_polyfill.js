Function.prototype.myBind = function (thisArg, ...argArray) {

  const originalFn = this;

  return function (...newArgs) {

    return originalFn.apply(
      thisArg,
      [...argArray, ...newArgs]
    );

  };

};
