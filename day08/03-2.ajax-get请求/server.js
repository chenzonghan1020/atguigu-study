const express = require("express");
const app = express();

const path = require("path");

app.get("/",(req,res)=>{
    const filePath = path.resolve(__dirname,"./index.html");
    res.sendFile(filePath);
})

app.get("/login",(req,res)=>{
    const data = {
        name:"chenhonngtai",
        sex:"nan"
    } 
    res.json(data);
})

app.listen("3000",(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("服务器开启成功，请访问" + `http://127.0.0.1:3000`);
})