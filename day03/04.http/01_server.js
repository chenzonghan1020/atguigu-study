/* // 引入模块
const http = require("http");

const server = http.createServer((request,response)=>{
    console.log("客户端请求");
    // setHeader是设置响应头的
    response.setHeader("Content-Type","txte/plain;charset = utf-8");
    // end方法回应响应
    response.end("你真棒！！！");
})

let port = "3000";
let host = "192.0.0.1";
// 给当前的服务创建端口和主机号，第三个参数是回调函数，启动服务的时候调用
server.listen(port,host,()=>{
    console.log("服务器启动，请访问：" + `http://${port}:${host}`);
}) */

const http = require("http");
const server = http.createServer((request,response)=>{
    response.setHeader("Content-Type","text/plain;charset=utf-8");
    response.end("你政办发给");
})
let port = "3000";
let host = "192.0.0.1";
server.listen(potr,host,()=>{
    console.log("服务器启动，请访问：" + `http://${port}:${host}`);
})