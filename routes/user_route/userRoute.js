/*
 2017年5月17日
 hyq
 用户管理模块route层
 * */
var express = require('express');
var router = express.Router();
var userLoginService = require('../../service/user_service/userLoginService');
//用户登录
router.get("/userLogin", function (req, res, next) {
    userLoginService.userLogin(req, res, next);
});
module.exports = router;