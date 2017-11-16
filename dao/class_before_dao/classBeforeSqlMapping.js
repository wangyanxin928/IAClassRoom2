/*
 2017年6月26日 09:02:08
 zzy
 登录的个人信息返回
 * */

var mysql = require('mysql');
var $conf = require('../../conf/db');
var $util = require('../../util/util');


module.exports = {
    //获取所有的年级
    getGradeList: function (server_id, callback) {
        var sql = "SELECT * FROM bd_gradeinfo";
        return sql;
    },
    //获取年级下所有的班级
    getClassList: function (grade_id, callback) {
        var sql = "SELECT bc.bd_class_id class_id,bc.bd_class_name class_name,bg.grade_name FROM bd_classinfo bc LEFT JOIN bd_gradeinfo bg ON bg.grade_id = bc.bd_grade_id WHERE bd_grade_id ='"+grade_id+"'";
        return sql;
    },
    //获取年级下所有的学科
    getSubjectList: function (grade_id, callback) {
        var sql = "select bd_subject_id subject_id,bd_subject_name subject_name,bd_subject_src subject_src, bd_subject_type subject_type from bd_subjectinfo";
        return sql;
    },
    //创建互动课程
    insertSubjectList: function (answerInfo, callback) {
        var sql = "INSERT INTO iaclass(iaclass_id,iaclass_name,bd_server_id,bd_grade_id,bd_class_id,bd_subject_id,iaclass_des,bd_school_year_id,state) VALUES" +
            " ('"+answerInfo.iaclass_id+"'" +
            ",'"+answerInfo.iaclass_name+"'" +
            ",'"+answerInfo.server_id+"'" +
            ",'"+answerInfo.grade_id+"'" +
            ",'"+answerInfo.class_id+"'" +
            ",'"+answerInfo.subject_id+"'" +
            ",'"+""+"'" +
            ",'"+answerInfo.school_id+"'" +
            ","+answerInfo.state+")";
        return sql;
    },
    //查询互动小组的人数
    selectStudentAndSubList: function (iaclass_id, callback) {
        var sql = " SELECT   ig.iagroup_id,ia.iaclass_id, ia.iaclass_name,ia.state FROM "
        +" iaclass ia JOIN iagroup ig ON ia.bd_class_id = ig.bd_class_id "
        +" WHERE iaclass_id ='"+iaclass_id+"'";
        return sql;
    },
    //循环取出小组的人
    selectGrouping: function (iagroup_id, callback) {
        var sql = " SELECT  iag.iagroup_name,COUNT(rus.iagroup_id) AS user_num  FROM rlt_u_s_iac_iag rus JOIN iagroup iag ON rus.iagroup_id = iag.iagroup_id "
        +" JOIN bd_userinfo bu ON rus.bd_user_id = bu.user_id "
        +" WHERE rus.iagroup_id = '"+iagroup_id+"'";
        return sql;
    },
    selectGroupingNumber: function (iagroup_id, callback) {
        var sql = "SELECT bu.user_id, bu.true_name,rus.user_type  FROM rlt_u_s_iac_iag rus JOIN iagroup iag ON rus.iagroup_id = iag.iagroup_id "
        +" JOIN bd_userinfo bu ON rus.bd_user_id = bu.user_id "
        +" WHERE rus.iagroup_id = '"+iagroup_id+"'";
        return sql;
    },
    //根据教师查询所有的教师课程
    selectTInteractList: function (user_id, callback) {
        var sql = "SELECT iac.iaclass_id, bu.true_name,bu.role_name,SUBSTRING_INDEX(iac.iaclass_name,'/', 1) AS class_name,"
        +" SUBSTRING_INDEX(iac.iaclass_name,'/', -1) AS subject_name, "
            +" iac.bd_subject_id,iac.start_time,SUBSTRING_INDEX(iac.end_time,' ', -1) AS end_time, "
            +" num.call_num FROM bd_userinfo bu JOIN rlt_u_s_iac_iag rus ON bu.user_id = rus.bd_user_id "
        +" JOIN iaclass iac ON rus.bd_class_id = iac.bd_class_id "
        +" JOIN (SELECT iap.iaclass_id, COUNT(iap.iaputq_id) AS call_num FROM iaclass ia JOIN iaputquestion iap ON ia.iaclass_id = iap.iaclass_id  GROUP BY iap.iaclass_id) AS num "
        +" WHERE bu.user_id = '"+user_id+"' AND iac.state = 2 ";
        return sql;
    },
    //根据学生获取当前的互动课程
    selectScurrentList:function (user_name, callback) {
        var sql = " SELECT bu.user_id, ic.iaclass_id,ic.state,ic.bd_subject_id subject_id,bs.bd_subject_name subject_name "
        +" FROM bd_userinfo bu JOIN rlt_u_s_iac_iag rsc ON bu.user_id = rsc.bd_user_id "
        +" JOIN iaclass ic ON rsc.bd_class_id = ic.bd_class_id "
        +" JOIN bd_subjectinfo bs ON bs.bd_subject_id = ic.bd_subject_id "
        +" WHERE bu.user_name ='"+user_name+"' AND ic.state =1";
        return sql;
    },
    //跟新iaclass表的上课状态
    updateCourse:function (iaclass_id,start_time, callback) {
        var sql = " UPDATE iaclass SET start_time = '"+start_time+"',state =1 where iaclass_id='"+iaclass_id+"' ";
        return sql;
    },
    //跟新结束课程
    updateCouseList:function (iaclass_id,end_time, callback) {
        var sql = " UPDATE iaclass SET end_time = '"+end_time+"',state =2 where iaclass_id='"+iaclass_id+"' ";
        return sql;
    },
    //存入insertIaputquestion
    insertIaputquestion:function (iaputq_id,iaclass_id,user_id,iaputq_time, callback) {
        var sql = " INSERT INTO iaputquestion (iaputq_id,iaputq_time,iaclass_id,be_iaputq_user_id) VALUES" +
            " ('"+iaputq_id+"'" +
            ",'"+iaputq_time+"'" +
            ",'"+iaclass_id+"'" +
            ",'"+user_id+"')";
        return sql;
    },
    //存入iq表
    inserTanswer:function (iacomment_id, iacomment_content, iacomment_roletype, iacomment_score,iacomment_user_id,iaclass_id, callback) {
        var sql = "INSERT INTO iacomment (iacomment_id,iacomment_content,iacomment_roletype,iacomment_score,iacomment_user_id,iaclass_id)" +
            " VALUES('"+iacomment_id+"'," +
            "'"+iacomment_content+"'," +
            ""+iacomment_roletype+"," +
            "'"+iacomment_score+"'," +
            "'"+iacomment_user_id+"'," +
            "'"+iaclass_id+"')";
        return sql;
    },
    //获取学生的排名
    selectRankingList:function (iaclass_id, callback) {
        var sql = "SELECT bu.true_name,bu.sex,put_user_t.put_count,comment_t.avg_score FROM bd_rlt_student_class brsc "
        +" JOIN iaclass iac "
        +" ON brsc.class_id = iac.bd_class_id "
        +" JOIN bd_userinfo bu "
        +" ON brsc.user_id = bu.user_id "
        +" JOIN (SELECT COUNT(iaputq_id) put_count,be_iaputq_user_id FROM iaputquestion "
        +" WHERE iaclass_id ='"+iaclass_id+"'"
        +" GROUP BY be_iaputq_user_id) AS put_user_t "
        +" ON brsc.user_id=put_user_t.be_iaputq_user_id "
        +" JOIN (SELECT iacomment_user_id,AVG(iacomment_score) avg_score FROM iacomment "
        +" WHERE iaclass_id ='"+iaclass_id+"' "
        +" GROUP BY iacomment_user_id) AS comment_t "
        +" ON  brsc.user_id=comment_t.iacomment_user_id "
        +" WHERE iac.iaclass_id ='"+iaclass_id+"'"
        +" ORDER BY comment_t.avg_score DESC ";
        return sql;
    },
    //获取小组的学生
    getStudentList:function (iaclass_id,user_id, callback) {
        var sql = "SELECT rus.iagroup_id FROM iaclass ic JOIN rlt_u_s_iac_iag rus ON rus.bd_class_id = ic.bd_class_id WHERE ic.iaclass_id ='"+iaclass_id+"' AND rus.bd_user_id = '"+user_id+"'";
        return sql;
    },
    getStudentListT:function (iagroup_id, callback) {
        var sql = "  SELECT  iag.iagroup_name,COUNT(rus.iagroup_id) AS user_num  FROM rlt_u_s_iac_iag rus JOIN iagroup iag ON rus.iagroup_id = iag.iagroup_id "
       +" JOIN bd_userinfo bu ON rus.bd_user_id = bu.user_id "
       +" WHERE rus.iagroup_id = '"+iagroup_id+"'";
        return sql;
    },
    getStudentListS:function (iagroup_id, callback) {
        var sql = "  SELECT bu.user_id, bu.true_name,rus.user_type  FROM rlt_u_s_iac_iag rus JOIN iagroup iag ON rus.iagroup_id = iag.iagroup_id "
        +" JOIN bd_userinfo bu ON rus.bd_user_id = bu.user_id "
        +" WHERE rus.iagroup_id = '"+iagroup_id+"'";
        return sql;
    },
    //获取所有的学生上课记录列表
    getStudentRecord:function (user_id, callback) {
        var sql = " SELECT bu.true_name,role_name, SUBSTRING_INDEX(ia.iaclass_name,'/', -1) AS subject_name,ia.start_time,SUBSTRING_INDEX(ia.end_time,' ', -1) AS end_time,num.submit_num,avg_number.avg_sum "
        +" FROM iaclass ia "
        +" JOIN rlt_u_s_iac_iag rus ON ia.bd_class_id = rus.bd_class_id "
        +" JOIN bd_userinfo bu ON bu.user_id = rus.bd_user_id "
        +" JOIN ( SELECT COUNT(iap.be_iaputq_user_id) AS submit_num FROM iaputquestion iap JOIN iaclass ia ON ia.iaclass_id = iap.iaclass_id WHERE iap.be_iaputq_user_id ='"+user_id+"') AS num "
        +" JOIN ( SELECT AVG(iac.iacomment_score) AS avg_sum FROM iacomment iac JOIN iaclass ia ON ia.iaclass_id = iac.iaclass_id WHERE iac.iacomment_user_id ='"+user_id+"') AS avg_number "
        +" WHERE rus.bd_user_id ='"+user_id+"' AND ia.state = 2  AND rus.user_type = 2 OR  rus.bd_user_id ='"+user_id+"' AND ia.state = 2  AND rus.user_type = 3";
        return sql;
    },
    //获取正在回答问题用户的信息
    getStudentNow:function (user_id, callback) {
        var sql = " SELECT bu.user_id,bu.true_name,bu.role_name,rus.user_type FROM bd_userinfo bu JOIN rlt_u_s_iac_iag rus ON bu.user_id = rus.bd_user_id WHERE bu.user_id = '"+user_id+"'";
        return sql;
    },
};
