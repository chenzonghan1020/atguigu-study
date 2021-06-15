/* const express = require("express");
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

app.get("/login", (req, res) => {
    const {
        user,
        pass,
        cd
    } = req.query;
    console.log(req.query);
    if (user === "laozhang" && pass === "123") {
        const data = {
            name: "chenhonngtai",
            sex: "nan"
        }
        res.set("content-type","appliction/javascript;charset=utf-8")
        return res.send(`${cb}(${JSON.stringify(data)})`);
    }
        const err = {
            name:"zuqiling",
            sex:"nv"
        }
        return res.send(err);

})
app.listen("3000", (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("服务器开启成功，请访问" + `http://127.0.0.1:3000`);
})


 */

const express = require("express");
const app = express();



app.get("/login", (req, res) => {
    const {
        user,
        pass,
        cb
    } = req.query;
    console.log(req.query);

    if (user === "laoli" && pass === "123") {
        const data = {
            mes: "ok",
            code: 1
        }
        res.set("content-type", "application/javascript;charset=utf-8");
        return res.send(`${cb}(${JSON.stringify(data)})`);

    }


    const err = {
        mes: "no ok",
        code: 0
    }
    return res.send(err);
})

app.listen("3000", (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("http://127.0.0.1:3000");
})