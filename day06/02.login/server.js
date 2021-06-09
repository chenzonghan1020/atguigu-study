// 引入express模块
const express = require("express");
// 引入mongoose模块
const mongoose = require("mongoose");
// 引入path模块
const path = require("path");
// 连接数据库
require("./db");
// // 引入约束模块
const userModel = require("./model/userModel");
const app = express();

const ejs = require("ejs");

app.set("view engine", "ejs");
app.set("views", "views");

// 注册页面
app.get("/register", async (req, res) => {
    // 查看用户输入的内容 拿到用户名和密码
    console.log(req.query);
    const {
        username,
        password
    } = req.query;

    // 查看用户的密码和名称是否为空
    if (!username || !password) {
        // 拼接err.ejs的
        const filePath = path.resolve(__dirname, "./public/err.ejs");
        const errData = "密码和名称不能为空！";
        return res.render(filePath, {
            errData: "密码和名称不能为空！"
        });
    }

    // 用户名不能重复 查询数据库中是否有该名字
    const isHasUsername = await userModel.findOne({
        username
    });

    if (isHasUsername) {
        // 拼接err.ejs的
        const filePath = path.resolve(__dirname, "./public/err.ejs");
        const errData = "密码和名称不能为空！";
        return res.render(filePath, {
            errData: "用户名已注册"
        });
    };

    // 向数据库添加数据
    const registerData = await userModel.create({
        username,
        password
    });
    console.log(registerData);
    res.send("注册成功")

});
// 登录页面
app.get("/login", async (req, res) => {
    const {
        username,
        password
    } = req.query;
    // 判断用户名和密码是否为空
    if (!username || !password) {
        // 拼接err.ejs的
        const filePath = path.resolve(__dirname, "./public/err.ejs");
        const errData = "密码和名称不能为空！";
        return res.render(filePath, {
            errData: "密码和名称不能为空！"
        });
    };

    // 查询数据库中是否有用户名
    const isHasname = await userModel.findOne({
        username
    });
    // 判断用户名是否存在
    if (!isHasname){
         // 拼接err.ejs的
         const filePath = path.resolve(__dirname, "./public/err.ejs");
         const errData = "密码和名称不能为空！";
         return res.render(filePath,{
             errData:"用户名不存在"
         });
    };

    // 如果用户存在就判断密码是否正确
    if (isHasname.password != password) {
        // 拼接err.ejs的
        const filePath = path.resolve(__dirname, "./public/err.ejs");
        const errData = "密码和名称不能为空！";
        return res.render(filePath, {
            errData: "密码错误"
        });
    }
    // 登录成功跳转到个人中心
    const filePath = path.resolve(__dirname,"./public/center.html");
    res.sendFile(filePath);
})
// 图片接口
app.get("/static/:src", (req, res) => {
    const {
        src
    } = req.params;
    const filePath = path.resolve(__dirname, "./static", src);
    res.sendFile(filePath);
})

// 默认路径是index.html
app.get("/", (req, res) => {
    // 当前访问根目录默认重定向到index.html
    res.redirect("/index.html");
});
// index.html的路径
app.get("/index.html", (req, res) => {
    const filePath = path.resolve(__dirname, "./public/index.html");
    res.sendFile(filePath);
});
// 获取login.html的路径
app.get("/login.html", (req, res) => {
    const filePath = path.resolve(__dirname, "./public/login.html");
    res.sendFile(filePath);
});
// 获取register.html的路径
app.get("/register.html", (req, res) => {
    const filePath = path.resolve(__dirname, "./public/register.html");
    res.sendFile(filePath);
});

let port = "3001";
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("服务器启动成功，请访问：" + `http://127.0.0.1:${port}`);
})