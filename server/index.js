// node 后端服务器

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
var session = require('express-session')
const app = express();
const userApi = require('./api/userApi');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));






// 在 Express 这个框架中，默认不支持 Session 和 Cookie
// 但是我们可以使用第三方中间件：express-session 来解决
// 1. npm install express-session
// 2. 配置 (一定要在 app.use('/api/meals', userApi) 之前)
// 3. 使用
//    当把这个插件配置好之后，我们就可以通过 req.session 来发访问和设置 Session 成员了
//    添加 Session 数据：req.session.foo = 'bar'
//    访问 Session 数据：req.session.foo

/*app.use(session({
  // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
  // 目的是为了增加安全性，防止客户端恶意伪造
  secret: 'itcast',
  resave: false,
  saveUninitialized: false, // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
  cookie:{maxAge:172800000},
  rolling:true, //在每次请求时进行设置cookie，将重置cookie过期时间
}))*/




// 后端api路由
// app.use('/api/user', userApi);
app.use('/api/meals', userApi);


app.listen(3000,function(){
	console.log('running 3000...')
})
