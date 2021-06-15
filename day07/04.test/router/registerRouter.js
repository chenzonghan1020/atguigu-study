// 引入express
const express = require("express");
// 实例一个router
const router = new express.Router();
// 引入path
const path = require("path");
// 引入约束模块
const userModel = require("../model/userModel");

// 注册接口
router.get("/register", async (req, res) => {
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
        const filePath = path.resolve(__dirname, "../views/err.ejs");
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

// 暴露接口
module.exports = router;

