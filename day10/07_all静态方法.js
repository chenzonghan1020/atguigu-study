function myPromise(exector) {
    // 保存指向实例化的this
    const _this = this;
    // 给myPromise设置两个属性
    // 设置myPromise的状态
    _this.status = "pending";
    // 设置myPromise的值
    _this.value = undefined;
    _this.callback = {};
    // 将myPromise的值改为resolved
    function resolve(value) {
        if (_this.status !== "pending") return;
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
    function reject(reason) {
        if (_this.status !== "pending") return;
        _this.status = "rejected";
        _this.value = "reason";
        // 为了保证then中的onResolved永远都是异步代码，所以要在外面包裹一层异步代码
        // 为了保证执行onResolved函数的时候then已经执行过了
        setTimeout(() => {
            _this.callback.onRejected(reason);
        });
    }
    //同步调用
    exector(resolve, reject);
}

// then在使用的时候是同步调用，但是我们可以控制then中的异步代码
// 每一个myPromise的实例化对象都应该有这个方法所有要设置在myPromise的原型对象上
// then有两个参数，第一个参数是处理成功状态的promise的，第二个参数是处理是处理失败状态的promise的
myPromise.prototype.then = function (onResolved, onRejected) {
    const _this = this;
    // 用户在调用then的时候可能不传第二个参数，这时候我们就需要处理一下,手动添加一个函数
    onRejected = typeof onRejected !== "function" ? function(reason){
        // 直接将失败调用then的promise对象的值返回
        throw reason;
    }:onRejected;

    // 用户在调用catch的时候可能只传一个参数，这时候我们需要处理一下，手动添加一个函数来直接返回成功调用catch的值
    onResolved = typeof onResolved !== "function" ? function(value){
        // 直接返回成功调用catchpromise的值
        return value;
    } : onResolved;


    // 为了让上面的resolve和reject能够使用then中的两个方法，所有这两个方法添加在_this.callback这个对象上
    // 因为then需要返回值，then的返回值是then中onResolved函数的返回值，如果onResolved函数直接在上面19和30行执行，就拿不到返回值
    // 所以我们不让_this.callback.onResolved直接等于then的参数onResloved,而是等于一个函数，当这个函数执行时，在函数内部执行onResolved这个函数
    // 调用onResolved可能会报错，如果报错直接返回一个失败的promise对象，值就是错误信息
    _this.callback.onResolved = function (value) {
        /* 
        思路：
        1.调用onResolved函数可能会有错误信息，使用try和catch来解决，如果报错直接返回一个失败状态的promise对象，值是失败信息
        2.如果不报错，继续往下执行，判断onResolved的返回值是不是一个promise对象，如果不是则直接返回一个成功状态的promise对象，值就是onResolved的返回值
        3.如果是promise对象，则判断这个promise对象的状态是成功还是失败，使用then来判断
        4.成功的promise对象走第一个参数，失败的promise对象走第二个参数
        */
        try {
            // 得到onResolved函数的返回值
            const re = onResolved(value);
            if (re instanceof myPromise) {
                re.then(function (data) {
                    resolve(data);
                }, function (reason) {
                    reject(reason);
                });
            } else {
                resolve(re);
            }
        } catch (e) {
            reject(e);
        }
    };
    // onRejected的思路和写法和onResolved一致
    _this.callback.onRejected = function (reason) {
        try {
            const re = onRejected(reason);
            if (re instanceof myPromise) {
                re.then(function (data) {
                    resolve(data);
                }, function (reason) {
                    reject(reason);
                });
            } else {
                resolve(re);
            }
        } catch (e) {
            reject(e);
        }
    };
}

// catch方法和then是同一个级别的
// catch也有两个参数和then一样的所以catch的方法可以直接调用then的第二个参数方法
// then的第二个参数是处理失败状态的promise对象的
myPromise.prototype.catch = function () {
    this.then(null, onRejected);
}
// finally方法
myPromise.prototype.finally = function(onResolved){
    return this.then((value)=>{
        const re = onResolved();
        if(re instanceof myPromise){
            return re.then(()=>{
                return value;
            })
        }else{
            return value;
        }
    },(reason)=>{
        const re = onResolved();
        if(re instanceof myPromise){
            re.then(()=>{
                throw reason;
            })
        }else{
            throw reason;
        }
    });
}

// resolve和reject静态方法 根据参数的不同返回不同的promise对象，
// 如果参数不是promise对象直接返回成功的promise，如果参数是一个成功的promise对象也返回一个成功的promise对象
// 如果参数是一个失败的promise对象，则返回一个失败的promise对象
// resolve方法的参数无论是一个成功的promise还是一个失败的promise，resolve返回的都是这个promise对象
myPromise.resolve = function(value){
    return new myPromise((resolve,reject)=>{
        // 判断这个参数是不是一个promise对象
        if(value instanceof myPromise){
            // 根据value的情况来调用resolve和reject
            value.then((value)=>{
                resolve(value);
            },(reason)=>{
                reject(reason);
            })
        }else{
            resolve(value);
        }
    })
}
// reject静态方法 只会返回一个失败状态的promise对象
myPromise.reject = function(reason){
    return new myPromise((resolve,reject)=>{
        // 无论reject的参数是什么都会返回一个失败状态的promise对象
        reject(reason);
    })
}
// all静态方法 处理多个promise对象，如果有一个是失败的promise对象，直接返回这个失败的promise对象
myPromise.all = function(promises){
    return new myPromise((resolve,reject)=>{
        // 创建一个空数组来保存promises的每一个值
        const promiseArr = [];
        // 获取promises的长度
        const promisesLen = promisies.length;
        // 声明一个计数器
        let promiseCount = 0;
        // 遍历promises
        promises.forEach((promise,index)=>{
            promise.then((value)=>{
                //使用中括号是因为promise对象可能不是按照顺序执行的
                promiseArr[index] = value;
                promiseCount++;
                if(promiseCount === promisesLen){
                    resolve(promiseArr);
                }
            },(reason)=>{
                // 只有有一个失败就直接返回这个失败
                reject(reason);
            })
        })
    })
}
