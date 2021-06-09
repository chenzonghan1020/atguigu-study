// 引入第三方模块
const express = require("express");
// 创建一个express的application的对象
const app = express();


const fs = require("fs");
const path = require("path");


// 书写接口
app.get("/", (req,res) => {
    console.log("/ 被请求了");
    // 当前文件所在的位置
    const filePath = path.resolve(__dirname, "index.html");

    res.sendFile(filePath);

})

app.post("/register", (req, res) => {
    console.log("post请求");

    console.log(req.params)

    res.send("注册成功")
})

app.get("/login", (req, res) => {
    res.send("登录成功")
})

app.get("/img/goods", (req, res) => {
    res.send("商品详情")
})

app.get("/img/:id", (req, res) => {
    res.send("图片路径出错")
})

//访问的是/后边跟任意的路径
app.get("/:id", (req, res) => {
    res.send("请检查路径")
})


//3.给当前的服务监听端口号
app.listen(3001, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("服务启动成功，请访问：" + `http://127.0.0.1:3001`);
})