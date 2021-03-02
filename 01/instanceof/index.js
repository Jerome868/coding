/**
 * instanceof 实现
 * @param {*} left
 * @param {*} right
 */
const myInstanceof = function (left, right) {
  const targetProto = right.prototype;
  let instancePro = left.__proto__;
  while (instancePro) {
    if (instancePro === targetProto) {
      return true;
    }

    instancePro = instancePro.__proto__;
  }
  return false;
};
