// 模块引入
const fs = require("fs");
const path = require("path");

const readPath = path.resolve(__dirname, "1.mp4");
const writePath = path.resolve(__dirname, "2.mp4");
// 创建流读取
const rs = fs.createReadStream(readPath)
// 创建流写入
const wr = fs.createWriteStream(writePath, {
    flag: "a"
})
// 将在readPath读取的文件写入到wr中
rs.on("data", (chunk) => {
    wr.write(chunk);
})
// 关闭流读取
rs.on("end", () => {
    wr.close();
})
//给可写流绑定close事件，当可写流关闭的时候触发
wr.on("close", () => {
    console.log("文件写入完成！！！！");
})