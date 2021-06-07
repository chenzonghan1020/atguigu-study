/* // 模块引入
const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname,"index.txt");

// 创建流式写入
const fd = fs.createWriteStream(filePath,{
    flag:"a"
})

// 可写流有一个open和close方法来开启和关闭写入流

fd.on("open",()=>{
    console.log("写入流开启");
})

fd.on("close",()=>{
    console.log("写入流关闭");
})

fd.write("山重水覆疑无路，柳暗花明又一村。");
fd.write("莫愁前路无知己，天下谁人不识君。");
fd.write("飞流直下三千尺，疑是银河落九天。");
fd.write("落霞与孤鹜齐飞，秋水共长天一色。");

// 写入流写完，可以自动关闭
fd.close();
 */

// 引入模块
const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname,"index.txt");

// 创建一个流式写入
const fd = fs.createWriteStream(filePath,{
    flag:"a"
})

// 写入流有open和close两种方法
// 写入流开起
fd.on("open",()=>{
    console.log("写入流开启，可以写入~~~~");
})

// 写入流关闭

fd.on("close",()=>{
    console.log("写入流关闭，哈哈哈哈");
})

fd.write("王大");
fd.write("王二");
fd.write("王三");

// 关闭写入流
fd.close();

