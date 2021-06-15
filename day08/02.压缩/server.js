const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

app.get("/", (req, res) => {
    const filePath = path.resolve(__dirname, "./index.html");
    //获取请求中的Accept-Encoding可以接受的类型，根据可以接受的类型来完成压缩选择
    const rs = fs.createReadStream(filePath);
    console.log(req.headers["accept-ercoding"]);
    const acceptEncoding = req.headers["accept-ercoding"];
    //可以使用includes判断字符串中是否含有某个值
    if (acceptEncoding.includes("gzip")) {
        const zlibFile = rs.pipe(zlib.createGzip())
        res.set("Content-Encoding", "gzip")
        return zlibFile.pipe(res);
    }
    if (acceptEncoding.includes("deflate")) {
        const zlibFile = rs.pipe(zlib.createDeflate())
        res.set("Content-Encoding", "deflate")
        return zlibFile.pipe(res);
    }
    if (acceptEncoding.includes("br")) {
        const zlibFile = rs.pipe(zlib.createBrotliCompress())
        res.set("Content-Encoding", "br")
        return zlibFile.pipe(res);
    }


})

app.listen("3000", (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("服务器已启动，请点击：" + `http://127.0.0.1:3000`);
})