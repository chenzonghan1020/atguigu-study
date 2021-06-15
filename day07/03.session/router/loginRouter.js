const express = require("express");

const router = new express.Router();

const path = require("path");
// 引入约束模块
const userModel = require("../model/userModel");

// 登录接口
router.get("/login", async (req, res) => {
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
        const filePath = path.resolve(__dirname, "../views/err.ejs");
        return res.render(filePath, {
            errData: "用户名不存在"
        });
    };

    // 如果用户存在就判断密码是否正确
    if (isHasname.password != password) {
        // 拼接err.ejs的
        const filePath = path.resolve(__dirname, "../views/err.ejs");
        return res.render(filePath, {
            errData: "密码错误"
        });
    }
    // 登录成功设置session
    req.session.username = username;
    // 登录成功跳转到个人中心
    const filePath = path.resolve(__dirname, "../views/center.html");
    res.sendFile(filePath);
})




module.exports = router;