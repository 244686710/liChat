const express = require('express');

const  bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');

// 新建APP
const app = express();
app.use(cookieParser());
app.use(bodyParser.json()); // 接收post过来的参数
app.use('/user',userRouter);

app.get('/', function (req, res){
    res.send('<h1>Hello world!</h1>')
});

app.listen(9093, function() {
    console.log('Node app start at port 9093')
});