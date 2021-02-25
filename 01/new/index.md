***new***`运算符` 创建一个用户定义的对象类型的实例或具有构造函数的对象的实例。

**new的创建过程**
1. 创建一个空对象
2. 建立原型联系
3. 修改构造函数的 `this` 指向
4. 始终返回一个对象

```javascript
// 1、2 步骤
let obj = {};
obj.__proto__ = Constructor.prototype;

// 等价于
let obj = Object.create(Constructor.prototype);
```