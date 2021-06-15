// 引入express
const express = require("express");
// 实例一个router
const router = new express.Router();
// 引入path
const path = require("path");

const isHas = (req, res, next) => {
    // 查看用户输入的内容 拿到账户和密码
    const {
        username,
        password
    } = req.query;

    // 查看密码是否为空
    if (!username || !password) {
        // 拼接err.ejs的路径
        const filePath = path.resolve(__dirname, "../views/err.ejs");
        return res.render(filePath, {
            errData: "账号和密码不能为空"
        })
    }
    next();
}
// 处理账号和密码是否为空的中间件
router.use("/register",isHas);
// 处理账号和密码是否为空的中间件
router.use("/login",isHas);

// 暴露接口
module.exports = router;

