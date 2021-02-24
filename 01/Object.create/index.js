if (typeof Object.create !== 'function') {
  Object.create = function (proto) {
    function F() {};
    F.prototype = proto;

    return new F();
  }
}