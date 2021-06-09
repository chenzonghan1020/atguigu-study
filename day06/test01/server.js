// 引入数据库
require("./db/index");
//引入集合约束
const userModel = require("./model/userModel");
// 引入express模块
const express = require("express");
const app = express();
// 引入path模块
const path = require("path");
// 引入ejs模块
const ejs = require("ejs");
// 通知express使用ejs模块
app.set("view engine", "ejs");
app.set("views", "views");

// 中间件
//官方的静态资源中间件
app.use(express.static("./public"));
app.use(express.static("./static"));

//处理req请求携带的数据的中间件，把req的数据放在了req.body的属性上了
app.use(express.urlencoded({
    extended: true
}))
// 书写一个判断密码是否为空的中间件
app.use((req,res,next)=>{
    const {
        username,
        password
    } = req.query;
    // 查看用户名和密码是否为空
    if (!username || !password) {
        // 拼接err.js
        const filePath = path.resolve(__dirname, "./public/err.ejs")
        return res.render(filePath, {
            errData: "用户名和密码不能为空"
        })
    }
    next();
})

// 书写一个检测登录的中间件
app.use((req,res,next)=>{
    const {
        username,
        password
    } = req.query;
    const userReg = /^[A-Z]{1}[0-9A-z_]{6,10}$/;
    const passReg = /^[0-9]{6,}$/;
    if(!userReg.test(username) || !passReg.test(passReg)){
        const filePath = path.resolve(__dirname,"./public/err.ejs");
        return res.render(filePath,{
            errData:"账户或密码的格式不对"
        })
    }
    next();
})

// 注册接口
app.get("/register", async (req, res) => {
    const {
        username,
        password
    } = req.query;
    // 用户名不能重复
    const isHasuser = await userModel.findOne({
        username
    })
    if(isHasuser){
        // 拼接err.js
        const filePath = path.resolve(__dirname, "./public/err.ejs")
        return res.render(filePath, {
            errData: "这个用户名已经注册"
        })
    }
    // 如果没有就向数据库添加数据
    const createUser = await userModel.create({
        username,
        password
    })
    console.log(createUser);
    // res.send("注册成功");
    // 注册成功跳转到登录页面
    const filePath = path.resolve(__dirname,"./public/login.html");
    res.sendFile(filePath);
})

// 登录接口
app.get("/login",async(req,res)=>{
    // 获取用户输入的内容 得到用户名和密码
    const {
        username,
        password
    } = req.query;
    // 查询数据库中是否有该用户名
    const isHasUser = await userModel.findOne({
        username
    })
    // 如果没有就拼接err.ejs
    if(!isHasUser){
        // 拼接err.ejs路径
        const filePath = path.resolve(__dirname,"./public/err.ejs");
        return res.render(filePath,{
            errData:"用户名不存在"
        })
    }
    // 如果有就判断密码是否正确
    if(isHasUser.password != password){
        // 拼接err.ejs路径
        const filePath = path.resolve(__dirname,"./public/err.ejs");
        return res.render(filePath,{
            errData:"密码错误"
        })
    }
    // return res.send("登录成功");
    // 登录成功就跳转到个人中心
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

/* // 书写静态接口
app.get("/", (req, res) => {
    // 设置当前访问根目录的永久重定向到index.html
    res.redirect("/index.html");
})
// 获取index.html的路径
app.get("/index.html", (req, res) => {
    const filePath = path.resolve(__dirname, "./public/index.html");
    res.sendFile(filePath);
})
// 获取login.html的路径
app.get("/login.html", (req, res) => {
    const filePath = path.resolve(__dirname, "./public/login.html");
    res.sendFile(filePath);
})
// 获取register.html的路径
app.get("/register.html", (req, res) => {
    const filePath = path.resolve(__dirname, "./public/register.html");
    res.sendFile(filePath);
}) */


// 书写端口和监视
let port = "3003";
app.listen(port, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("服务端启动成功，请访问：" + `http://127.0.0.1:${port}`);
})