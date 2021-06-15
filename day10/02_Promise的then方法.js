function myPromise(exector){
    // 保存指向实例化的this
    const _this = this;
    // 给myPromise设置两个属性
    // 设置myPromise的状态
    _this.status = "pending";
    // 设置myPromise的值
    _this.value = undefined;
    _this.callback = {};
    // 将myPromise的值改为resolved
    function resolve(value){
        if(_this.status !== "pending") return;
        _this.status = "resolved";
        _this.value = "value";
        // 为了保证then中的onResolved永远都是异步代码，所以要在外面包裹一层异步代码
        // 为了保证执行onResolved函数的时候then已经执行过了
        // 为什么要在resolve和reject中来调用这两个函数
        // 是因为只有当状态改变之后才能调用then
        setTimeout(() => {
            _this.callback.onResolved(value);
        });
    }
    // 将myPromise的值改为rejected
    function reject(reason){
        if(_this.status !== "pending") return;
        _this.status = "rejected";
        _this.value = "reason";
        // 为了保证then中的onResolved永远都是异步代码，所以要在外面包裹一层异步代码
        // 为了保证执行onResolved函数的时候then已经执行过了
        setTimeout(() => {
         _this.callback.onRejected(reason);   
        });
    }
    //同步调用
    exector(resolve,reject);
}

// then在使用的时候是同步调用，但是我们可以控制then中的异步代码
// 每一个myPromise的实例化对象都应该有这个方法所有要设置在myPromise的原型对象上
// then有两个参数，第一个参数是处理成功状态的promise的，第二个参数是处理是处理失败状态的promise的
myPromise.prototype.then = function(onResolved,onRejected){
    const _this = this;
    // 为了让上面的resolve和reject能够使用then中的两个方法，所有这两个方法添加个这个对象
    _this.callback.onResolved = onResolved;
    _this.callback.onRejected = onRejected;
}