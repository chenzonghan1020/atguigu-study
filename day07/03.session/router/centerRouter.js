const express = require("express");

const router = new express.Router();

const path = require("path");
//引入mongoose的当前用户信息集合
const userModel = require("../model/userModel");

// 权限控制
router.use("/center.html", async (req, res, next) => {
    if(!req.session.username){
        // 拼接err.ejs的
        const filePath = path.resolve(__dirname, "../views/err.ejs");
        return res.render(filePath, {
            errData: "权限不够，请升级权限"
        });
    }
    next();
})

router.use("/center.html", (req, res) => {
    const filePath = path.resolve(__dirname, "../views/center.html");
    res.sendFile(filePath);
})

module.exports = router;