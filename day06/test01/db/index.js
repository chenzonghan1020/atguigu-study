// 引入mongoose模块
const mongoose = require("mongoose");
// 连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/login2",{
     // 去除警告
     useNewUrlParser: true,
     useUnifiedTopology: true
});
// 连接数据库成功后会触发 mongoose.connection.once()的open事件
mongoose.connection.once("open",err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("数据库连接成功");
})