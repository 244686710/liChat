const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/yuyd';
// 链接mongo 并且使用yuyd这个集合
mongoose.connect(DB_URL);

mongoose.connection.on('connected', function() {
    console.log('mongo connect success');
});
// 类似于mysql的表 mongo里有文档，字段的概念
const User = mongoose.model('user', new mongoose.Schema({
    user: {type: String, required: true},
    age: {type: Number, required: true}
}))

User.update({'user': 'xiaoqiang'}, {'$set': {age: 25}}, function (err, doc) {
    if(!err){
        console.log(doc);
    }else{
        console.log(err);
    }
})
