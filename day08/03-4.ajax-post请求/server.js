const express = require("express");
const app = express();
const path = require("path");

// body-parser中间件是处理post数据请求的
const bodyParser = require("body-parser");
// 如果post请求发送的是json数据则用下面处理
app.use(bodyParser.json());
// 如果post请求发送的是form表单请求，则用下面处理
app.use(bodyParser.urlencoded({
    extended:false
})); 

app.get("/", (req, res) => {
    const filePath = path.resolve(__dirname, "./index.html");
    res.sendFile(filePath);
})

app.post("/login", (req, res) => {
    const {
        user,
        pass
    } = req.body;
    console.log(req.body);
    if (user === "123" && pass === "123") {
        const data = {
            name: "chenhonngtai",
            sex: "nan"
        }
        return res.json(data);
    }
        const err = {
            name:"zuqiling",
            sex:"nv"
        }
        return res.json(err);

})

app.listen("3000", (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("服务器开启成功，请访问" + `http://127.0.0.1:3000`);
})