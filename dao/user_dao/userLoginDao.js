/*
 2017年6月26日 09:02:08
 zzy
 登录的个人信息返回
 * */
var mysql = require('mysql');
var $conf = require('../../conf/db');
var $util = require('../../util/util');
var $writelog = require('../../libs/logHelper');
var $sql = require('./userLoginSqlMapping');
var $mysqlUtil = require('../../util/mysqlUtil');

module.exports = {

    //获取登录人的角色类型
    userLogin: function (user_name, callback) {
        var sql = $sql.userLogin(user_name);
        $mysqlUtil.queryStrSql(sql, callback);
    }

};
