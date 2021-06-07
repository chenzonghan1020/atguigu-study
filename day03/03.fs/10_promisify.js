// 引入模块
const fs = require("fs");
const path = require("path");

const filePath = path.relative(__dirname, "1.mp4");

/* (
    async () => {
        const fd = await new Promise((resolve, reject) => {
            fs.open(filePath, "a", (err, fd) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(fd);
            })
        })
        await new Promise((resolve, reject) => {
            fs.write(fd, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            })
        })

        await new Promise((resolve, reject) => {
            fs.close(fd, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            })
        })
    }
)().then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err);
}) */

// 使用Promisify()
const {
    promisify
} = require("util");
/* 
promisify是把一个异步方法处理 返回一个函数，
并且这个函数已经使用promise进行封装了，如果异步成功则返回成功的promise对象，
否则返回失败的promise对象
*/

const readFile = promisify(fs.readFile);
console.log(readFile);
readFile(filePath).then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err);
})