// 引入express模块
const express = require("express");
// 创建一个express的application对象
const app = express();
// 引入mongoose模块
const mongoose = require("mongoose");
// 引入path模块
const path = require("path");
// 连接数据库
require("./db");
// 引入约束模块
const userModel = require("./model/userModel");

// 引入ejs
const ejs = require("ejs");
// 通知express使用ejs模板引擎
app.set("view engine", "ejs");
app.set("views", "views");

//官方的静态资源中间件
app.use(express.static("./public"));
app.use(express.static("./static"));

//处理req请求携带的数据的中间件，把req的数据放在了req.body的属性上了
app.use(express.urlencoded({
    extended: true
}))

// 处理账号和密码是否为空的中间件
app.use((req, res, next) => {
    // 查看用户输入的内容 拿到账户和密码
    const {
        username,
        password
    } = req.query;

    // 查看密码是否为空
    if (!username || !password) {
        // 拼接err.ejs的路径
        const filePath = path.resolve(__dirname, "./public/err.ejs");
        return res.render(filePath, {
            errData: "账号和密码不能为空"
        })
    }
    next();
})

// 创建一个验证密码是否正确的中间件
app.use((req, res, next) => {
    // 查看用户输入的内容 拿到账号和密码
    const {
        username,
        password
    } = req.query;

    // 查看密码和账户的格式是否正确
    const userReg = /^[A-z]{1}[0-9A-z_]{6,10}$/;
    const passReg = /^[0-9]{6,}$/;
    if (!userReg.test(username) || !passReg.test(password)) {
        const filePath = path.resolve(__dirname, "./public/err.ejs");
        res.render(filePath, {
            errData: "账户或密码格式不正确"
        })
    };
    next();
})

// 注册接口
app.get("/register", async (req, res) => {
    // 查看用户输入的内容 拿到用户名和密码
    console.log(req.query);
    const {
        username,
        password
    } = req.query;

    // 用户名不能重复 查询数据库中是否有该名字
    const isHasUsername = await userModel.findOne({
        username
    });

    if (isHasUsername) {
        // 拼接err.ejs的
        const filePath = path.resolve(__dirname, "./public/err.ejs");
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
    // 如果注册成功则直接重定向到登录页面
    // res.send("注册成功")
    res.redirect("/login.html")

});
// 登录接口
app.get("/login", async (req, res) => {
    const {
        username,
        password
    } = req.query;

    // 查询数据库中是否有用户名
    const isHasname = await userModel.findOne({
        username
    });
    // 判断用户名是否存在
    if (!isHasname) {
        // 拼接err.ejs的
        const filePath = path.resolve(__dirname, "./public/err.ejs");
        return res.render(filePath, {
            errData: "用户名不存在"
        });
    };

    // 如果用户存在就判断密码是否正确
    if (isHasname.password != password) {
        // 拼接err.ejs的
        const filePath = path.resolve(__dirname, "./public/err.ejs");
        return res.render(filePath, {
            errData: "密码错误"
        });
    }
    // 登录成功跳转到个人中心
    const filePath = path.resolve(__dirname, "./public/center.html");
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

// 监听端口号和服务器状态
let port = "3002";
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("服务器启动成功，请访问：" + `http://127.0.0.1:${port}`);
})