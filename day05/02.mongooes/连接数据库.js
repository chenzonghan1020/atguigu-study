// 引入模块
const mongoose = require("mongoose");
//1.连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/atguigu",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// 2.数据库连接成功后 会触发mongoose.connection的open时间
mongoose.connection.once("open",err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("数据库连接成功");
})
// 3.创建Schema对象，方便未来对于某个集合的值进行约束
const teacherSchema = new mongoose.Shcema({
    name:{
        type:String,
        unique:true,//唯一存在
        required:true //必填项
    },
    age:Number,
    sex:String,
    hobby:[String],//限制值必须是一个数组
    createTime:{
        type:Date,
        default:Date.now
    }
});
// 4.创建model对象（就是集合）
const teacherModel = mongoose.model("teacher",teacherSchema);
// 5.初始化集合的内容（也可以不初始化，直接增）
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