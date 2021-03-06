var express = require('express');
var path = require('path');

//声明页面路由
var routes = require('./routes/index');
//声明接口路由
var userRoute = require('./routes/user_route/userRoute');//用户管理-用户登录路由
var classBeforeRoute = require('./routes/class_before_route/classBeforeRoute');//用户管理-课前课后路由
var app = express();
// 关于首页的设置
app.use(express.static(path.join(__dirname, 'views')));

//定义页面路由访问名称
app.use('/', routes);

//设置跨域访问接口，放到页面声明之后
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//定义接口路由访问名称
app.use('/IAClassRoom/user/userRoute', userRoute); // 定义接口路由访问名称
app.use('/IAClassRoom/class/classBeforeRoute', classBeforeRoute);//用户管理-课前课后路由
module.exports = app;
