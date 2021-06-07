/* const http = require("http");
const url = "http://192.0.0.1:3000";
const request = http.request(url,(response)=>{
    // 响应数据是一个可读流通过data方法监听到
    response.on("data",(chunk)=>{
        console.log(chunk.toString());
    })
    response.on("end",(chunk)=>{
        console.log("响应数据接收完毕");
    })
})
// 创建的客户端有一个end方法，可以开始发送请求
 request.end(); */

//  创建一个客户端

const http = require("http");
const url = "http://192.0.0.1:3000";
const request = http.request(url,(response)=>{

    response.on("data",(chunk)=>{
        console.log(chunk.toString());
    })
    response.on("end",(chunk)=>{
        console.log("响应数据接收完毕");
    })
})
// end方法可以开始发送请求
request.end();

// 设置服务端
const http = require("http");
const server = http.createServer((request,response)=>{
    response.setHeader("Content-Type","text/plain;charset=utf-8");
    responsse.end("你正邦")
})
server.listen(port,host,()=>{
    console.log("服务器开启，请访问：" + `http://${port}:${host}`);
})

const fs = require("fs");
const path = require("path");
const readFilePath = path.resolve(__dirname,"text.txt");
const writeFilePath = path.resolve(__dirname,"text2.txt");
const rs = fs.createReadStream(readFilePath);
const wr = fs.createWriteStream(writeFilePath,{
    flag:"a"
})
rs.pipe(wr);
rs.on("end",()=>{
    console.log("读取完成");
})
