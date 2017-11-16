/*
 2017年5月17日
 hyq
 用户管理模块route层
 * */
var express = require('express');
var router = express.Router();
var classBeforeService = require('../../service/class_before_service/classBeforeService');
//获取所有的年级
router.get("/getGradeList", function (req, res, next) {
    classBeforeService.getGradeList(req, res, next);
});
//获取年级下所有的班级
router.get("/getClassList", function (req, res, next) {
    classBeforeService.getClassList(req, res, next);
});
//获取年级下所有的学科
router.get("/getSubjectList", function (req, res, next) {
    classBeforeService.getSubjectList(req, res, next);
});
//创建互动课程
router.get("/insertSubjectList", function (req, res, next) {
    classBeforeService.insertSubjectList(req, res, next);
});
//获取互动课程学生排名
router.get("/selectRankingList", function (req, res, next) {
    classBeforeService.selectRankingList(req, res, next);
});
//根据教师查询所有的互动课程
router.get("/selectTInteractList", function (req, res, next) {
    classBeforeService.selectTInteractList(req, res, next);
});
//根据学生获取当前互动课程
router.get("/selectScurrentList", function (req, res, next) {
    classBeforeService.selectScurrentList(req, res, next);
});
//开始上课更新iaclass表
router.get("/updateCourse", function (req, res, next) {
    classBeforeService.updateCourse(req, res, next);
});
//教师点名
router.get("/rollCall", function (req, res, next) {
    classBeforeService.rollCall(req, res, next);
});
//评价答题
router.get("/inserTanswer", function (req, res, next) {
    classBeforeService.inserTanswer(req, res, next);
});
//获取分组的学生
router.get("/getStudentList", function (req, res, next) {
    classBeforeService.getStudentList(req, res, next);
});
//获取学生所有上课记录
router.get("/getStudentRecord", function (req, res, next) {
    classBeforeService.getStudentRecord(req, res, next);
});
//获取正在回答问题用户的信息
router.get("/getStudentNow", function (req, res, next) {
    classBeforeService.getStudentNow(req, res, next);
});

module.exports = router;