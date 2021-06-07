
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
    console.log("读写结束");
})

const http = require("http");
const server = http.createServer((request,response)=>{
    response.setHeader("Content-Type","text/plain;charset=utf-8");
    response.end("");
})
let port = "3000";
let host = "192.0.0.1";
server.listen(port,host,()=>{
    console.log("服务器启动，请访问：" + `http://${host}:${port}`);
})

const http = require("http");
url