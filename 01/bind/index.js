const toStr = Object.prototype.toString;
const slice = Array.prototype.slice;

const funcType = "[object Function]";

Function.prototype.bind = function () {
  const target = this;
  if (typeof target !== "function" || toStr.call(target) !== funcType) {
    throw new TypeError("target is not function");
  }

  const fn = arguments[0];
  const args = slice.call(arguments, 1);
  return function () {
    return target.apply(fn, args.push(...arguments));
  };
};
