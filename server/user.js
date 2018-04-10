const express = require('express');
const Router = express.Router();
const utils = require('utility');
const model = require('./model')
const User = model.getModel('user')
Router.get('/list', function(req, res){
    User.find({}, function(err, doc){
        // User.remove({},function(){})
        return res.json(doc)
    })
})
const _filter = {pwd: 0, __v:0}
Router.post('/register', function(req, res) {
    console.log(req.body)
    const {user, pwd, type} = req.body;
    User.findOne({user}, function(err, doc){
        if(doc) {
            return res.json({code:1, msg: '用户名重复'})
        }
        const userModel = new User({user,type,pwd:md5Pwd(pwd)})
        userModel.save(function(e,d){
            if(e){
                return res.json({code:1, msg: '后端出错了'}) 
            }
            const {user, type, _id} = d
            res.cookie('userid', _id);
            return res.json({code: 0, data:{user}})
        })
     
    })

})

Router.post('/updata', function(req, res){
    const userid = req.cookies.userid // 获取cookie
    if(!userid){
        return json.dumps({code:1})
    }
    const body = req.body 
    User.findByIdAndUpdate(userid, body, function(err, doc){
        const data = Object.assign({},{
            user: doc.user,
            type: doc.type, 
        }, body)
        return res.json({code: 0, data:data})
    })
})
Router.post('/login', function(req, res) {
    const {user, pwd} = req.body;
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function(err, doc){
        if(doc) {
            res.cookie('userid',doc._id); // cookie插件
            return res.json({code:0, data: doc})
        }else{
            return res.json({code:1, msg:'用户名或密码错误'})
        }
    })

})

Router.get('/info', function(req, res){
    // 用户有没有cookie
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid}, _filter, function(err, doc){ // _filter对返回的信息进行过滤
        if(err){
            return res.json({code: 1, msg: '后端出错了'})
        }
        if(doc){
            return res.json({code:0, data:doc})
        }
    })
})

function md5Pwd(pwd){
    const salt = 'yuyd_is_good_397x8yza0#D@HHJS';
    return utils.md5(utils.md5(pwd+salt))
}


module.exports = Router;