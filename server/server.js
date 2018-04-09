const express = require('express');
const mongoose = require('mongoose');
// 链接mongo 并且使用yuyd这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/yuyd';
mongoose.connect(DB_URL);

mongoose.connection.on('connected', function() {
    console.log('mongo connect success');
});
// 类似于mysql的表 mongo里有文档，字段的概念
const User = mongoose.model('user', new mongoose.Schema({
    user: {type: String, required: true},
    age: {type: Number, required: true}
}))

// User.create({
//     user: 'yuyadong',
//     age: 27
// }, function(err, doc) {
//     if(!err) {
//         console.log(doc)
//     }else{
//         console.log(err)
//     }
// })

User.update({'user': 'xiaoqiang'}, {'$set': {age: 25}}, function (err, doc) {
    if(!err){
        console.log(doc);
    }else{
        console.log(err);
    }
})



// 新建APP
const app = express();

app.get('/', function (req, res){
    res.send('<h1>Hello world!</h1>')
});
app.get('/data', function (req, res){
    User.find({'user': 'yuyadong'}, function (err, doc){
        res.send(doc[0]);
    });
});

app.get('/delete', function (req, res) {
    // TODO删除age=10的
    User.remove({age: 27}, function(err, doc) {
        res.json(doc)
    })
});

app.listen(9093, function() {
    console.log('Node app start at port 9093')
});