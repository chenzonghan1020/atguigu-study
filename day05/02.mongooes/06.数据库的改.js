// 引入模块
const mongoose = require("mongoose");
// 连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/atguigu", {
    // 去除警告
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// 当数据库引入成功时会触发mongoose.connection.once事件
mongoose.connection.once("open", err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("数据库连接成功");
});
// 创建一个Schema对象 来约束集合的值
const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true, //值为一
        required: true //必填项
    },
    age: Number,
    sex: String,
    hobby: [String],//规定必须是一个数组
    createTime: {
        type: Date,
        default: Date.now
    }
});
// 创建一个集合 Model有两个参数 参数一：集合名字 集合约束对象
const teacherModel = mongoose.model("teacher", teacherSchema);

// 修改数据 修改一个
/* teacherModel.update({
    sex:"男",
    $set:{age:18}
})
.then(data=>{
    console.log(data);
})
.catch(err=>{
    console.log(err);
})
 */
// 修改多个
teacherModel.updateMany({
    sex:"男",
    $set:{age:18}
})
.then(data=>{
    console.log(data);
})
.catch(err=>{
    console.log(err);
})
