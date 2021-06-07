// 引入模块
const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "index.txt");

// 异步写入
// 打开文件
/* fs.open(filePath, "a", (err, fd) => {
    if(err){
        return;
    }
    fs.write(fd, "莫使金樽空对月。", (err) => {
        if(err){
            return;
        }
        //  打印一下fd
        console.log(fd); //会返回一个文件id 
        //  关闭文件
        fs.close(fd, (err) => {
            if(err){
                return;
            }
            console.log("文件写入完成关闭！");
        });
    })
}) */
// 异步写入
fs.open(filePath,"a",(err,fd)=>{
    // 如果打开文件有错误直接返回
    if(err){
        return;
    }
    fs.write(fd,"天生我材必有用，",(err)=>{
        if(err){
            return;
        }
        console.log(fd);
        fs.close(fd,(err)=>{
            if(err){
                return;
            }
            console.log("文件写入成功！！");
        })
    })
})