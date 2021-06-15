// 引入模块
const mongoose = require("mongoose");
// 连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/login",{
    // 去除警告
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// 当数据库连接成功后会触发mongoose.connection.once的open事件
mongoose.connection.once("open",err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("数据库连接成功");
})