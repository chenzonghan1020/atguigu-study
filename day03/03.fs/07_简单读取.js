// 引入模块
const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname,"1.mp4");

fs.readFile(filePath,(err,re)=>{
    if(err){
        return;
    }
    // 返回的式buffer数据
    console.log(re);
})
