// 创建一个promise对象
function myPromies(exector){
    // 给实例化对象扩展两个属性
    const _this = this;
    _this.status = 'pending';
    _this.value = undefined;
    _this.callback = {};

    // 封装resolve和reject两个函数
    function resolve(value){
        if(_this.status !== "pending") return;
        _this.status = 'resolved';
        _this.value = value;
        setTimeout(() => {
         _this.callback.onResolved && _this.callback.onResolved();   
        });
    }
    function reject(reason){
        // promise的状态只能改变一次，是要不是pending状态就直接返回
        if(_this.status !== "pending") return;
        _this.status = "rejected";
        _this.value = reason;
        setTimeout(() => {
         _this.callback.onRejected && _this.callback.onRejected();   
        });
    }
    // 当实例化promise的时候会自动调用
    exector(resolve,reject);
}

// then方法
myPromies.prototype.then = function(onResolved,onRejected){

    onRejected = typeof onRejected === "function" ? function(reason){
        return reason;
    }:onRejected;

    onResolved = typeof onResolved === "function" ? function(value){
        return value;
    }:onResolved;

    return new myPromies((resolve,reject)=>{
        _this.callback.onResolved = function(value){
            try{
                const re = onResolved(value);
                if(re instanceof myPromies){
                    re.then((value)=>{
                        resolve(value);
                    },(reason)=>{
                        reject(reason);
                    })
                }else{
                    resolve(re);
                }
            }catch(e){
                reject(e);
            }
        }
        _this.callback.onRejected = function(reason){
            try{
                const re = onRejected(reason);
                if(re instanceof myPromies){
                    re.then((value)=>{
                        resolve(value);
                    },(reason)=>{
                        reject(reason);
                    })
                }else{
                    resolve(re);
                }
            }catch(e){
                reject(e);
            }
        }
    });
}

// catch
myPromies.prototype.catch = function(onRejected){
   return this.then(null,onRejected);
}
// finally
myPromies.prototype.finally = function(value){
    return this.then((value)=>{
        const re = onResolved();
        if(re instanceof myPromies){
            re.then((value)=>{
                return value;
            })
        }else{
            return value;
        }
    },(reason)=>{
        const re = onResolved();
        if(re instanceof myPromies){
            re.then((reson)=>{
                throw reason;
            })
        }else{
            throw reason;
        }
    })
}
// resolve和reject
myPromies.resolve = function(value){
    return new myPromies((resolve,reject)=>{
        if(value instanceof myPromies){
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

myPromies.reject = function(reason){
    return new myPromies((resolve,reject)=>{
        reject(reason);
    })
}
// all
myPromies.all = function(promises){
    return new myPromies((resolve,reject)=>{
        const promiseArr = [];
        const promiseLen = promises.length;
        let promiseCount = 0
        promises.forEach((promise,index)=>{
            promise.then((value)=>{
                promiseCount++;
                promiseArr[index] = value;
                if(promiseCount === promiseLen){
                    resolve(promiseArr);
                }
            },(reason)=>{
                reject(reject);
            })
        })
    })
}
// allSettled
myPromies.allSettled = function(promises){
    return new myPromies((resolve,reject)=>{
        const promiseArr = [];
        let promiseCount = 0;
        const promiseLen = promises.length;
        promises.forEach((promise,index)=>{
            promise.then((value)=>{
                promiseCount++;
                promiseArr[index]={
                    status:"resolved",
                    value
                };
                if(promiseCount === promiseLen){
                    resolve(promiseArr);
                }
            },(reason)=>{
                promiseCount++;
                promiseArr[index]={
                    status:"rejected",
                    value
                };
                if(promiseCount === promiseLen){
                    resolve(promiseArr);
                }
            })
        })
    })
}