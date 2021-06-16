function myPromise(exector) {
    const _this = this;
    _this.status = "pending";
    _this.value = undefined;
    _this.callback = {};

    function resolve(value) {
        _this.status = "resolved";
        _this.value = value;
        setTimeout(() => {
           _this.callback.onResolved && _this.callback.onResolved(value);
        });
    }

    function reject(reason) {
        _this.status = "rejected";
        _this.value = reason;
        setTimeout(() => {
           _this.callback.onRejected && _this.callback.onRejected(reason);
        });
    }
    exector(resolve, reject);
}

myPromise.prototype.then = function (onResolved, onRejected) {
    const _this = this;
    onRejected = typeof onRejected !== "function" ? function (reason) {
        throw reason;
    } : onRejected;

    onResolved = typeof onResolved !== "function" ? function (value) {
        return value;
    } : onResolved;

    _this.callback.onResolved = function (value) {
        try {
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
    }
    _this.callback.onRejected = function (reason) {
        try {
            const re = onRejected();
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
    }
}

myPromise.prototype.catch = function () {
    this.then(null, onRejected);
}
// resolve和reject静态方法
myPromise.resolve = function (onResolved) {
    return new myPromise((resolve, reject) => {
        if (value instanceof myPromise) {
            value.then((value) => {
                const re = onResolved();
                return re.then((value) => {
                    return value;
                })
            }, (reason) => {
                const re = onResolved();
                return re.then((reason) => {
                    throw reason;
                })
            })
        } else {
            resolve(value);
        }
    })
}

myPromise.reject = function (reason) {
    return reject(reason);
}

// all
myPromise.all = function (promises) {
    return new myPromise((resolve, reject) => {
        const promiseArr = [];
        let promiseCount = 0;
        const promiseLen = promises.length;
        promises.forEach((promsie, index) => {
            promsie.then((value) => {
                promise[index] = value;
                promiseCount++;
                if (promiseCount === promiseLen) {
                    resolve(promiseArr);
                } 
            }, (reason) => {
                reject(reason);
            })

        })
    })
}
// allSettled
myPromise.allSettled = function (promsies) {
    const promsieArr = [];
    let promsieCount = 0;
    const promiseLen = promsies.length;
    promises.forEach((promise, index) => {
        promise.then((value) => {
            promsieCount++;
            promiseArr[index] = {
                status: "resolved",
                value
            }
            if (promiseCount === promiseLen) {
                resolve(promiseArr);
            }
        }, (reason) => {
            promsieCount++;
            promiseArr[index] = {
                status: "rejected",
                reason
            }
            if (promiseCount === promiseLen) {
                resolve(promiseArr);
            }
        })

    })
}