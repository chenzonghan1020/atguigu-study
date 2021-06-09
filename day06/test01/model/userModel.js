// 引入mongoose模块
const mongoose = require("mongoose");
// 设置集合的约束条件
const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

// 创建一个集合
const userModel = mongoose.model("userInfo",userSchema);

// 暴露接口
module.exports = userModel;