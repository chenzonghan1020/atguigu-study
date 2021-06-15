const express = require("express");

const router = new express.Router();

const path = require("path");

router.get("/center.html",(req,res,next)=>{
    const filePath = path.resolve(__dirname,"../views/center.html");
    res.sendFile(filePath);
})

module.exports = router;