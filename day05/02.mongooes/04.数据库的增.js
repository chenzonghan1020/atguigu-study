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
    hobby: ["乒乓球", "羽毛球"],
    createTime: {
        type: Date,
        default: Date.now
    }
});
// 创建一个集合 Model有两个参数 参数一：集合名字 集合约束对象
const teacherModel = mongoose.model("teacher", teacherSchema);

/* // 增加一个
teacherModel.create({
    name:"王大",
    age:18,
    sex:"男",
    hobby:["美女","飞机"],
    createTime:Date.now()
},err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("数据添加成功");
}) */

// 增加多个数据
/* teacherModel.create([{
        name: "李二",
        age: 23,
        sex: "男",
        hobby: ["坦克", "无人机"],
        createTime: Date.now()
    },
    {
        name: "王五",
        age: 23,
        sex: "女",
        hobby: ["歼击机", "战斗机"]
    }
], err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("数据添加成功");
}) */
// create方法返回的是一个Promise对象可以解决回调函数的问题
teacherModel.create({
    name:"王七蛋的弟弟",
    age:12,
    sex:"男",
    hobby:["狗蛋"],
    createTime:Date.now()
})
.then(data=>{
    console.log(data);
})
.catch(err=>{
    console.log(err);
})