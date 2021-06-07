// 引入模块
const fs = require("fs");
const path = require("path");

const filePath = path.relative(__dirname, "text.txt");
// 使用Promisify()
const {
    promisify
} = require("util");

const open = promisify(fs.open);
const write = promisify(fs.write);
const close = promisify(fs.close);

(
    async () => {
        const fd = await new open(filePath,"a");
        await new write(fd,"今天天气真好");
        await new close(fd);
        return "写入成功";
    }
)().then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err);
})


