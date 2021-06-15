const express = require("express");

const router = new express.Router();

const path = require("path");

const  isRouter = (req, res, next) => {
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
router.use("/login",isRouter)

router.use("/register",isRouter)




module.exports = router;