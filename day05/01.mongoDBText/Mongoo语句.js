/* 
// 查看当前Mongo中所有的数据库
show databases 

// 使用或创建一个数据库
use atguigu(数据库的名字)

// 查看当前所在的数据库
db

// 新增一条数据 
db.person.insert({name:"徐二狗"})//person是集合名字，每一条数据都是一个文档

// 新增多条数据
db.person.insert([{},{},{},...])

// 查找当前所有集合的数据
db.person.find()

// 查找当前所有集合 所有年龄为20的数据
db.person.find({age:20})

// 查找当前集合 满足性别为男的所有数据
db.person.find({sex:"男"})

// 查找当前集合 id为某个的值
db.person.find(ObjectId("60bda7f16366ed2658dfda97"))

// 查找当前集合 年龄小于等于20的
db.person.find({age:{$lte:20}})

// 查找当前集合 年龄大于等于30的
db.person.find({age:{$gte:30}})

// 查找当前集合 年龄大于30的
db.person.find({age:{$gt:30}})

// 查找当前集合 年龄小于20 
db.person.find({age:{$lt:20}})

// 查找当前结合 年龄大于30 或者 性别为男的
db.person.find({$or:{age:{$gte:30}},sex:"男"})

// 查找当前年龄符合 18 29 32 的
db.person.find({$in:[18,29,32]})

// 查找当前集合 以小开头（使用正则表达式）
db.person.find({name:/^小/})

//查找符合where的条件
db.person.find({$where:function(){
    return this.age >30 || this.sex = "男"
}})

//查找符合条件的数据 并限制显示的字段 只显示name和id
db.person.find({},{naem:1})//name后面是一个布尔值

// 查找符合条件的数据 并限制显示的字段 只显示name和age,id
db.person.find({},{name:1,age:1})

// 查找符合条件的数据，并限制显示字段 只显示name和age
db.person.find({},{name:1,age:1,_id:0})

// 查找符合条件的数据 并限制显示的字段 不显示age
db.person.find({},{age:0})

// 修改某个符合条件的数据 修改一条数据
db.person.updateOne({sex:"男"},{$set:{age:20}})

// 修改符合条件的所有数据
db.person.updateMany({sex:"男"},{$set:{age:12}})

// 删除某个满足条件的数据
db.person.deleteOne({sex:"男"})

// 删除满足条件的所有数据
db.person.deleteMany({sex:"男"})





*/