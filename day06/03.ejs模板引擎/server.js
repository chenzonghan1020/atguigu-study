// 引入express模块
const express = require("express");

// 引入path模块
const path = require("path");

const app = express();

const ejs = require("ejs");

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
    // 获取index.ejs文件
    const filePath = path.resolve(__dirname, "index.ejs");
    const data = "goudan";


    res.render(filePath, {
        data: data,
        name: "laowang"
    })

})

let port = "3001";
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("服务器启动成功，请访问：" + `http://127.0.0.1:${port}`);
}) 
