// 导入模块
const fs = require("fs");
const path = require("path");
const readFilePath = path.resolve(__dirname,"1.mp4");
const writeFilePath = path.resolve(__dirname,"2.mp4");

// 创建一个可读流
const rs = fs.createReadStream(readFilePath);
const wr = fs.createWriteStream(writeFilePath,{
    flag:"a"
})

// pipe会持续性消费可读流数据
// 将可读流数据写入到可写流中
// 会自动关闭可写流
rs.pipe(wr);

rs.on("end",(err)=>{
    console.log("读取完成！！");
})