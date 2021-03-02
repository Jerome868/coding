// 工具函数
const toStr = Object.prototype.toString;
const shift = Array.prototype.shift;
const funcType = "[object Function]";

Function.prototype.call = function () {
  const target = this;

  if (typeof target !== "function" || toStr.apply(target) !== funcType) {
    throw new TypeError("target is not function");
  }

  const context = shift.apply(this.arguments);

  const symbolproperty = Symbol("唯一");

  context[symbolproperty] = target;

  const result = context[symbolproperty](...arguments);

  delete context[symbolproperty];

  return result;
};
