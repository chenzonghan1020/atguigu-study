// 引入模块
const mongoose = require("mongoose");

// 连接数据库
mongoose.connect("mongodb://192.0.0.1:27017/atguigu", {
    //去除警告 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 当数据库连接成功后 会触发mongoose.connection.on()事件
mongoose.connection.on("open", err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("数据库连接成功");
})

// 创建一个Schema对象 方便对一个集合的进行约束
const teacherSchema = new mongoose.Schema({
    name: {
        type:String,
        unique:true,//值唯一
        required:true  //必填项
    },
    age:Number,
    sex:String,
    hobby:["篮球","足球"],//限定值必须是一个数组
    createTime:{
        type:Date,
        default:Date.now
    }
});