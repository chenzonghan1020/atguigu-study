const express = require("express");

const app = express();

const fs = require("fs");

const path = require("path");

app.get("/", (req, res) => {
    const filePath = path.resolve(__dirname, "./index.html");
    const re = fs.createReadStream(filePath);
    re.pipe(res);
})

app.get("/img", (req, res) => {
    const filePath = path.resolve(__dirname, "./01.jpg");
    const re = fs.createReadStream(filePath);
    res.set("Cache-Control", "max-age=10000")
    re.pipe(res);
})

app.listen("3000", (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("服务器已经启动，请访问：" + `http://127.0.0.1:3000`);
})