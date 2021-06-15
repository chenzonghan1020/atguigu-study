function myPromise(exector){
    // 保存指向实例化的this
    const _this = this;
    // 给myPromise设置两个属性
    // 设置myPromise的状态
    _this.status = "pending";
    // 设置myPromise的值
    _this.value = undefined;
    // 将myPromise的值改为resolved
    function resolve(value){
        if(_this.status !== "pending") return;
        _this.status = "resolved";
        _this.value = "value";
    }
    // 将myPromise的值改为rejected
    function reject(reason){
        if(_this.status !== "pending") return;
        _this.status = "rejected";
        _this.value = "reason";
    }
    //同步调用
    exector(resolve,reject);
}