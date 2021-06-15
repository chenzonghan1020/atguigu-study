const express = require("express");
const app = express();
const path = require("path");


app.get("/", (req, res) => {
    const filePath = path.resolve(__dirname, "./index.html");
    res.sendFile(filePath);
})

app.get("/login", (req, res) => {
    const {
        user,
        pass
    } = res.query;
    if (user === "laoli" && pass === "123") {
        const data ={
            mes:"chenHongTai",
            code:250
        }
        return res.json(data)
    }
    const err = {
        mes:"ZhuQiLing",
        code:125
    }
    return err;
})

app.listen("3000", err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("服务启动成功，请访问：" + "http://127.0.0.1:3000");
})