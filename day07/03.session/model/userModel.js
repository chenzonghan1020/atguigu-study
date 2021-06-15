const mongoose = require("mongoose")
// 创建一个Schema对象
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