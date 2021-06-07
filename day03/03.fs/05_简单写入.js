/* // 引入模块
const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "index.txt");

fs.writeFile(filePath, "一秒就回到解放前，他们说我喝醉以后追着一条狗跑了很久", {
    flag:"a"
}, (err) => {
    if (err) {
        return;
    }
    console.log("写入完成！！！");
}) */

// 引入模块
const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname,"index.txt");

// 简单写入
fs.writeFile(filePath,"就一口，就一口你",{
    flag:"a"
},(err)=>{
     if(err){
         return;
     }
     console.log("写入成功");
})