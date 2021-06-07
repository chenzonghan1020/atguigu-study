//引入crypto模块
const crypto = require("crypto");
const { create } = require("domain");
// 确定加密的方式  md5 sha1 sha256 sha512
// const md = crypto.createHash("sha1");
// const md = crypto.createHash("sha256");
// const md = crypto.createHash("sha512");
const md = crypto.createHash("md5");
// 加密
const prassword = "1234567";

// 加盐 是为了加到保密性

let str = "";
for(let i = 0;i<4;i++){
    const a = Math.floor(Math.random()*36).toString(36);
     str +=a;
}
// console.log(str);
const prass = prassword + str;
console.log(prass);
const secret = md.update(prass,'utf-8').digest('hex');
// const secret = md5.update(password, 'utf8').digest('hex');
console.log(secret);
