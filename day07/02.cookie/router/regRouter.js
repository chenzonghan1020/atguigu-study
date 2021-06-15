const express = require("express");

const router = new express.Router();

const path = require("path");

const regRouter = (req, res, next) => {
    // 查看用户输入的内容 拿到账号和密码
    const {
        username,
        password
    } = req.query;

    // 查看密码和账户的格式是否正确
    const userReg = /^[A-Z]{1}[0-9A-z_]{6,10}$/;
    const passReg = /^[0-9]{6,}$/;
    if (!userReg.test(username) || !passReg.test(password)) {
        const filePath = path.resolve(__dirname, "../views/err.ejs");
        res.render(filePath, {
            errData: "账户或密码格式不正确"
        })
    };
    next();
} 

// 创建一个验证密码是否正确的中间件
router.use("/register",regRouter);

router.use("/login",regRouter);




module.exports = router;