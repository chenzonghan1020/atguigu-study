const express = require("express");

const router = new express.Router();

const path = require("path");
//引入mongoose的当前用户信息集合
const userModel = require("../model/userModel");

const cookieParser = require("cookie-parser");
//获取cookie并且将cookie以对象的形式呈现
router.use(cookieParser());

// 权限控制
router.use("/center.html", async (req, res, next) => {
    if (req.cookies.userID) {
        try {
            const re = await userModel.findOne({
                _id: req.cookies.userID
            })
            if (re) {
                next();
            } else {
                // 拼接err.ejs路径
                const filePath = path.resolve(__dirname.toString, "../views/err.ejs");
                return res.render(filePath, {
                    errData: "权限不足，请从新登录再访问个人中心"
                })
            }
        } catch (e) {
            // 拼接err.ejs路径
            const filePath = path.resolve(__dirname.toString, "../views/err.ejs");
            return res.render(filePath, {
                errData: "权限不足，请从新登录再访问个人中心"
            })
        }
    } else {
        // 拼接err.ejs路径
        const filePath = path.resolve(__dirname.toString, "../views/err.ejs");
        return res.render(filePath, {
            errData: "权限不足，请从新登录再访问个人中心"
        })
    }
})

router.use("/center.html", (req, res) => {
    const filePath = path.resolve(__dirname, "../views/center.html");
    res.sendFile(filePath);
})

module.exports = router;