// 引入模块
const mongoose = require("mongoose");

// 连接数据库有两种方法
/* // 方法一
mongoose.connect("mongodb://127.0.0.1:27017/atguigu", {
    //去除警告 
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("数据库连接成功");
}); */

// 方法二 连接数据库 open事件监听
mongoose.connect("mongodb://127.0.0.1:27017/atguigu",{
    // 去除警告
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// 当数据库连接成功以后 会触发mongoose.connection的open()事件
mongoose.connection.on("open",err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("数据库连接成功");
})