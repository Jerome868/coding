const toStr = Object.prototype.toString;
const shift = Array.prototype.shift;

const funcType = "[object Function]";
const arrayType = "[object Array]";

Function.prototype.apply = function () {
  const target = this;
  if (typeof target !== "function" || toStr.call(target) !== funcType) {
    throw new TypeError("target is not function");
  }

  const context = shift.call(arguments);

  if (toStr.call(arguments) !== arrayType) {
    throw new TypeError("argument must be an array");
  }

  const symbolproperty = Symbol("唯一");

  context[symbolproperty] = target;

  const result = context[symbolproperty](...arguments);

  delete context[symbolproperty];

  return result;
};
