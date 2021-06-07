// 引入连接的数据库
require("./db/index");
// 创建一个Schema对象
const teacherSchema = mongoose.schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    age:Number,
    sex:String,
    hobby:[String],
    createTime:{
        type:Date,
        default:Date.now
    }
})

// 创建一个集合
const teacherModel = mongoose.model("teacher",teacherSchema);

// 暴露接口
module.exports = teacherModel;