const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class Promise {
  constructor(executor) {
    this.state = PENDING;
    this.result = null;

    this.onFulfilledQueue = [];
    this.onRejectedQueue = [];

    const resolve = (result) => {
      if (this.state !== PENDING) return;
      setTimeout(() => {
        this.state = FULFILLED;
        this.result = result;
        this.onFulfilledQueue.map((resolve) => resolve(this.result));
      });
    };

    const reject = (error) => {
      if (this.state !== PENDING) return;
      setTimeout(() => {
        this.state = REJECTED;
        this.result = error;
        this.onRejectedQueue.map((reject) => reject(this.result));
      });
    };

    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (x) => x;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (e) => {
            throw e;
          };

    const p2 = new Promise((resolve, reject) => {
      if (this.state === PENDING) {
        this.onFulfilledQueue.push(() => {
          let x = onFulfilled(this.result);
          x instanceof Promise ? x.then(resolve, reject) : resolve(x);
        });
        this.onRejectedQueue.push(() => {
          let x = onRejected(this.result);
          x instanceof Promise ? x.then(resolve, reject) : resolve(x);
        });
      } else if (this.state === FULFILLED) {
        let x = onFulfilled(this.result);
        x instanceof Promise ? x.then(resolve, reject) : resolve(x);
      } else {
        let x = onRejected(this.result);
        x instanceof Promise ? x.then(resolve, reject) : resolve(x);
      }
    });

    return p2;
  }
  static all(promises = []) {
    let index = 0,
      result = [];
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(
          promises[i].then((val) => {
            index++;
            result[i] = val;
            if (index === promises.length) {
              resolve(result);
            }
          }, reject)
        );
      }
    });
  }
  static race(promises) {
    return new Promise((resolve, reject) => {
      if (promises.length === 0) return;

      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(
          promises[i].then((val) => {
            resolve(val);
            return;
          }, reject)
        );
      }
    });
  }
  static resolve(result) {
    if (result instanceof Promise) return result;
    return new Promise((resolve, reject) => resolve(result));
  }
  static reject(error) {
    return new Promise((resolve, reject) => reject(error));
  }
}
