// 写入模块
const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname,"1.mp4");

// 创建流式写入流
const rs = fs.createReadStream(filePath);

//rs是打开了一个可读流
//可读流每次最大释放的数据大小是64kb，将会一直持续释放数据
//可读流的data方法就是来消费可读流的，只要有数据读取 data就会触发
rs.on("data",(chunk)=>{
    // cunke就是可以持续读取的数据
    console.log(chunk);
})

// 当数据读取完成后就会触发end事件
rs.on("end",()=>{
    console.log("数据读取完成！！！");
})



