// 1.引入 模块
const mongoose = require("mongoose");
// 2.连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/atguigu", {
    // 去除警告
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// 数据库连接成功后 会触发mongoose.connection.on的open事件
mongoose.connection.once("open", err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("数据库连接成功");
});
//3. 创建一个Schema对象 可以限制一个集合内的数据样式
const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true, //值唯一
        required: true, //必填项
    },
    age: Number,
    hobby: ["足球", "篮球"], //限定数据只能是数组
    creatTime:{
        type:Date,
        default:Date.now
    }
});
//4.创建model对象（就是集合）
// 两个参数    集合名字     集合的约束对象
const teacherModel = mongoose.model("teacher",teacherSchema);
// 5.初始化集合的内容（也可以不用初始化，直接增加）
new teacherModel({
    name:"张三",
    age:18,
    sex:"男",
    hobby:["篮球","足球"],
    createTime:Date.now()
}).save(err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("teacher初始化成功");
})