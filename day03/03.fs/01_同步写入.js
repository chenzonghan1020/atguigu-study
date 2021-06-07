// 读写文件
// 引入模块
const fs = require("fs");
const path = require("path");

// 得到要写入文件的绝对路径
const filePath = path.resolve(__dirname,"index.txt");
console.log(filePath);
// 打开文件
const fd = fs.openSync(filePath,"a");//a代表如果没有则个文件就添加一个文件
// 会返回当前文件的一个ID标识
console.log(fd);
// 写入内容
fs.writeSync(fd,"人生得意须尽欢，");
// 关闭文件
fs.closeSync(fd);

console.log("如果上面，没有执行完是不会执行这一句的");

