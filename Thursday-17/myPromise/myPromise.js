function myPromise(exector) {
    const _this = this;
    _this.status = "pending";
    _this.value = undefined;
    _this.callback = {};

    function resolve(value) {
        if (_this.status !== "pending") return;
        _this.status = "resolved";
        _this.value = value;
        setTimeout(() => {
            _this.callback.onResolved && _this.callback.onResolved(value);
        });
    }

    function reject(reason) {
        if (_this.status !== "pending") return;
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
    return new myPromise((resolve, reject) => {
        _this.callback.onResolved = function (value) {
            try {
                const re = onResolved(value);
                if (re instanceof myPromise) {
                    re.then((data) => {
                        resolve(data);
                    }, (reason) => {
                        reject(reason);
                    })
                } else {
                    resolve(re);
                }
            } catch (e) {
                reject(e);
            }
        }
        _this.callback.onRejected = function (reason) {
            try {
                const re = onRejected(reason);
                if (re instanceof myPromise) {
                    re.then((value) => {
                        resolve(value);
                    }, (reason) => {
                        reject(reason);
                    })
                } else {
                    resolve(re)
                }
            } catch (e) {
                reject(e);
            }
        }
    })
}

// catch
myPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
}

// finally
myPromise.prototype.finally = function (onResolved) {
    return this.then((value) => {
        const re = onResolved();
        if (re instanceof myPromise) {
            re.then((value) => {
                return value;
            })
        } else {
            return value;
        }
    }, (reason) => {
        const re = onResolved();
        if (re instanceof myPromise) {
            re.then((reason) => {
                throw reason;
            })
        } else {
            throw reason;
        }
    })
}
// 静态方法
// resolve
myPromise.resolve = function (value) {
    return new myPromise((resolve, reject) => {
        if (value instanceof myPromise) {
            value.then((value) => {
                resolve(value);
            }, (reason) => {
                reject(reason);
            })
        } else {
            resolve(value);
        }
    })
}

// reject
myPromise.reject = function (reanson) {
    return new myPromise((resolve, reject) => {
        reject(reason);
    })
}

// all
myPromise.all = function (promises) {
    return new myPromise((resolve, reject) => {
        const promiseArr = [];
        const promisesLen = promises.length;
        let promiseCount = 0;
        promises.forEach((promise, index) => {
            promise.then((value) => {
                promiseCount++;
                promiseArr[index] = value;
                if (promiseCount === promisesLen) {
                    resolve(promiseArr);
                }
            }, (reason) => {
                reject(reason);
            })
        })
    })
}

// allSettled
myPromise.allSettled = function (promises) {
    return new myPromise((resolve, reject) => {
        const promiseArr = [];
        let promiseCount = 0;
        const promisesLen = promises.length;
        promises.forEach((promise, index) => {
            promise.then((value) => {
                promiseCount++;
                promiseArr[index] = {
                    status: "resolved",
                    value
                };
                if (promiseCount === promisesLen) {
                    resolve(promiseArr);
                }
            }, (reason) => {
                promiseCount++;
                promiseArr[index] = {
                    status: "rejected",
                    reason
                }
                if (promiseCount === promisesLen) {
                    resolve(promiseArr);
                }
            })
        })
    })
}