***Object.create()*** 方法创建一个新对象，使用现有的对象来提供新创建的对象的 `__proto__`

```javascript
var o;

// 创建一个原型为null的空对象
o = Object.create(null);


o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);
```