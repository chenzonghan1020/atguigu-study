// 引入数据库模块
require("./db/index");
// 引入teacher模块
require("./schema/teacher");

teacherModel.findOne({
    age:{$lte:20}
})
.then(data=>{
    console.log(data);
})
.catch(err=>{
    console.log(err);
})