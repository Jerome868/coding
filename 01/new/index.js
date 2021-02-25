const ObjectFactory = function() {
  const Constructor = Array.prototype.shift.call(arguments);
  const obj = Object.create(Constructor.prototype);
  
  let ret = Constructor.apply(obj, [...arguments]);

  return typeof ret === 'object' ? ret : obj;
}