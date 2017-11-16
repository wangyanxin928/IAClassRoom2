/*
 2017年6月26日 09:02:08
 zzy
 登录的个人信息返回
 * */
var mysql = require('mysql');
var $conf = require('../../conf/db');
var $util = require('../../util/util');
var $writelog = require('../../libs/logHelper');
var $sql = require('./classBeforeSqlMapping');
var $mysqlUtil = require('../../util/mysqlUtil');

module.exports = {

    //获取所有的年级
    getGradeList: function (server_id, callback) {
        var sql = $sql.getGradeList(server_id);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    //获取年级下所有的班级
    getClassList: function (grade_id, callback) {
        var sql = $sql.getClassList(grade_id);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    //获取年级下所有的学科
    getSubjectList: function (grade_id, callback) {
        var sql = $sql.getSubjectList(grade_id);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    //创建互动课程
    insertSubjectList:function (answerInfo, callback) {
        var sql = $sql.insertSubjectList(answerInfo);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    //查询互动小组的人数
    selectStudentAndSubList:function (iaclass_id, callback) {
        var sql = $sql.selectStudentAndSubList(iaclass_id);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    //循环取出小组的人
    selectGrouping:function (iagroup_id, callback) {
        var sql = $sql.selectGrouping(iagroup_id);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    selectGroupingNumber:function (iagroup_id, callback) {
        var sql = $sql.selectGroupingNumber(iagroup_id);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    //根据教师查询所有的架势课程
    selectTInteractList:function (user_id, callback) {
        var sql = $sql.selectTInteractList(user_id);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    //根据学生获取当前的互动课程
    selectScurrentList:function (user_name, callback) {
        var sql = $sql.selectScurrentList(user_name);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    //跟新iaclass表
    updateCourse:function (iaclass_id,start_time, callback) {
        var sql = $sql.updateCourse(iaclass_id,start_time);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    //跟新结束课程
    updateCouseList:function (iaclass_id,end_time, callback) {
        var sql = $sql.updateCouseList(iaclass_id,end_time);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    //存入提问表insertIaputquestion
    insertIaputquestion:function (iaputq_id,iaclass_id,user_id,iaputq_time, callback) {
        var sql = $sql.insertIaputquestion(iaputq_id,iaclass_id,user_id,iaputq_time);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    //存入提问的iq表
    inserTanswer:function (iacomment_id, iacomment_content, iacomment_roletype, iacomment_score,iacomment_user_id,iaclass_id, callback) {
        var sql = $sql.inserTanswer(iacomment_id, iacomment_content, iacomment_roletype, iacomment_score,iacomment_user_id,iaclass_id);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    //获取学生的排名
    selectRankingList:function (iaclass_id, callback) {
        var sql = $sql.selectRankingList(iaclass_id);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    //获取小组的学生
    getStudentList:function (iaclass_id,user_id, callback) {
        var sql = $sql.getStudentList(iaclass_id,user_id);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    getStudentListT:function (iagroup_id, callback) {
        var sql = $sql.getStudentListT(iagroup_id);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    getStudentListS:function (iagroup_id, callback) {
        var sql = $sql.getStudentListS(iagroup_id);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    //获取所有的学生列表
    getStudentRecord:function (user_id, callback) {
        var sql = $sql.getStudentRecord(user_id);
        $mysqlUtil.queryStrSql(sql, callback);
    },
    //获取正在回答问题用户的信息
    getStudentNow:function (user_id, callback) {
        var sql = $sql.getStudentNow(user_id);
        $mysqlUtil.queryStrSql(sql, callback);
    },
};
