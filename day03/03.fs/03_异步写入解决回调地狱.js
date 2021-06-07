/* // 引入模块
const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "index.txt");

// 使用promise来解决回调地狱
// 使用iife
(async () => {
    const fd = await new Promise((resolve, reject) => {
        // 写入文件
        fs.open(filePath, "a", (err, fd) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(fd);
        })
    })
    // 写入文件
    await new Promise((resolve, reject) => {
        fs.write(fd, "千金用尽还覆来。", (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    })

    // 关闭文件
    const re = await new Promise((resolve, reject) => {
        fs.close(fd, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve("全部完成");
        })
    })
    return re;
})()
.then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
}) */


// 引入模块
const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "index.txt");

// 使用IIFE立即执行函数
(
    async () => {
        const fd = await new Promise((resolve, reject) => {
            //    打开文件
            fs.open(filePath, "a", (err, fd) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(fd);
                console.log("文件打开成功");
            })
        })

        await new Promise((resolve,reject)=>{
            // 写入文件
            fs.write(fd,"田家少闲月，五月人倍忙。",(err)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve();
                console.log("文件写入成功");
            })
        })

        const re = await new Promise((resolve,reject)=>{
            fs.close(fd,(err)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve("文件关闭");
            })
        })
        return re;
    }
)()
.then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err);
})