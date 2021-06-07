// 引入模块
const fs = require("fs");
const path = require("path");
// const { resolve } = require("path/posix");

const filePath = path.resolve(__dirname, "index.txt");

function open() {
    return new Promise((resolve, reject) => {
        fs.open(filePath, "a", (err, fd) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(fd);
            console.log("打开文件成功");
        })
    })
}
// 写入
function write(fd) {
    return new Promise((resolve, reject) => {
        fs.write(fd, "王师北定中原日，家祭无忘告乃翁", (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
            console.log("写入完成");
        })
    })
}

// 关闭文件
function close(fd) {
    return new Promise((resolve, reject) => {
        fs.close(fd, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve("关闭文件");
        })
    })
}

(
    async () => {
        const fd = await open();
        // 需要传参
        await write(fd);
        const re = await close(fd);
        return re;
    }
)().then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})