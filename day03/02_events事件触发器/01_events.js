// 引入一个事件触发器模块events
const  eventEmitter = require("events");

// 继承一个
class myEventEmitter extends eventEmitter{};

// 实例化一个子类
const emitter = new myEventEmitter;

emitter.on("myClick",()=>{
    console.log("嘿！狗蛋是我呀！");
})

setInterval(() => {
    emitter.emit("myClick");
    emitter.emit("myClick");
}, 2000);