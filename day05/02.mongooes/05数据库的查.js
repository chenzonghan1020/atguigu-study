// 引入模块
const mongoose = require("mongoose");
// 连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/atguigu",{
    // 去除警告
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// 当数据库连接成功时 会触发mongoose.connection.once的open事件
mongoose.connection.once("open",err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("数据库连接成功");
});
// 创建一个schema对象 可以用来约束结合的数据样式
const teacherSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    age:Number,
    sex:String,
    hobby:["F35","F15"],
    createTime:{
        type:Date,
        default:Date.now
    }
});
// 创建一个Model对象 就是一个集合
const teacherModel = mongoose.model("teacher",teacherSchema);
// 查 可以使用所有的mongodb语句
/* teacherModel.findOne({
    age:{$gt:20}
})
.then(data=>{
    console.log(data);
})
.catch(err=>{
    console.log(err);
}) */
teacherModel.find({
    age:{$lte:22}
})
.then(data=>{
    console.log(data);
})
.catch(err=>{
    console.log(err);
})