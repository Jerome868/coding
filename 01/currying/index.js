const curry = function (fn) {
  return function curried(...args) {
    if (args.length < fn.length) {
      return function (...args2) {
        return curried(this, args.concat(args2));
      };
    } else {
      return fn.apply(this, args);
    }
  };
};

// other

const curry2 = function (fn, args = []) {
  return function (...args2) {
    args2 = args.concat(args2);
    if (args2.length < fn.length) {
      return curry2.call(this, fn, args2);
    } else {
      return fn.apply(this, args2);
    }
  };
};
