/*
 2017年6月26日 09:02:08
 zzy
 登录的个人信息返回
 * */

var mysql = require('mysql');
var $conf = require('../../conf/db');
var $util = require('../../util/util');


module.exports = {
    //获取登录人的角色类型
    userLogin: function (user_name, callback) {
        var sql = "SELECT user_id,user_name,true_name,role_name,server_id,sex FROM bd_userinfo WHERE user_name = '"+user_name+"'";
        return sql;
    }
};
