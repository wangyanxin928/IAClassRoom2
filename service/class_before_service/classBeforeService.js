/*
 2017年6月5日
 byx
 用户登录模块的业务处理层
 * */
var $util = require('../../util/util');
var classBeforeDao = require('../../dao/class_before_dao/classBeforeDao');
var $writelog = require('../../libs/logHelper');
var async = require('async');

module.exports = {
    //获取所有年级
    getGradeList: function (req, res, next) {
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
            var server_id = param.server_id;

        } catch (e) {
            $util.resJSONError(e, res);
            return;
        }
        classBeforeDao.getGradeList(server_id, function (err, result) {
            if (err != null) {
                $util.resJSONError(err, res);
                return;
            }
            $util.resJSON.resultnum = $util.resConfig.ok;
            $util.resJSON.resultdata = result;
            res.json($util.resJSON);
        });

    },
    //获取年级下所有的班级
    getClassList: function (req, res, next) {
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
            var grade_id = param.grade_id;

        } catch (e) {
            $util.resJSONError(e, res);
            return;
        }
        classBeforeDao.getClassList(grade_id, function (err, result) {
            if (err != null) {
                $util.resJSONError(err, res);
                return;
            }
            $util.resJSON.resultnum = $util.resConfig.ok;
            $util.resJSON.resultdata = result;
            res.json($util.resJSON);
        });

    },
    //获取年级下所有的学科
    getSubjectList: function (req, res, next) {
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
            var grade_id = param.grade_id;

        } catch (e) {
            $util.resJSONError(e, res);
            return;
        }
        classBeforeDao.getSubjectList(grade_id, function (err, result) {
            if (err != null) {
                $util.resJSONError(err, res);
                return;
            }
            $util.resJSON.resultnum = $util.resConfig.ok;
            $util.resJSON.resultdata = result;
            res.json($util.resJSON);
        });

    },
    //创建互动课程
    insertSubjectList: function (req, res, next) {
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
            var answerInfo = {};
            answerInfo.iaclass_id = $util.GUID();
            answerInfo.iaclass_name = param.grade_name+"("+param.class_name+")"+"/"+ param.subject_name;
            answerInfo.school_id = "2017";
            answerInfo.state  = 0;
            answerInfo.server_id = param.server_id;
            answerInfo.class_id = param.class_id;
            answerInfo.class_name = param.class_name;
            answerInfo.grade_id = param.grade_id;
            answerInfo.grade_name = param.grade_name;
            answerInfo.subject_id = param.subject_id;
            answerInfo.subject_name = param.subject_name;

        } catch (e) {
            $util.resJSONError(e, res);
            return;
        }
        //创建互动课程
        classBeforeDao.insertSubjectList(answerInfo, function (err, result) {
            if (err != null) {
                $util.resJSONError(err, res);
                return;
            }
            //查询互动课程小组人数
            var renshu = {};
            classBeforeDao.selectStudentAndSubList(answerInfo.iaclass_id, function (err, result_iaclass) {
                if (err != null) {
                    $util.resJSONError(err, res);
                    return;
                }
                renshu.grouping = result_iaclass[0].iaclass_name;
                renshu.state = result_iaclass[0].state;
                //循环取出小组的人
                renshu.renyuan_lists = [];
                async.forEachSeries(result_iaclass, function (recordInfo, callback) {
                    var iagroup_id = recordInfo.iagroup_id;

                    //获取分组人数和组名
                    classBeforeDao.selectGrouping(iagroup_id, function (err, result_grouping) {
                        if (err != null) {
                            $util.resJSONError(err, res);
                            return;
                        }
                        var renyuan_list = {
                            renyuan_num: result_grouping[0],
                            renyuan_num_list: null
                        };
                        //获取人员
                        classBeforeDao.selectGroupingNumber(iagroup_id, function (err, result_grouping) {
                            if (err != null) {
                                $util.resJSONError(err, res);
                                return;
                            }
                            renyuan_list.course_date_list =result_grouping;
                            renshu.renyuan_lists.push(renyuan_list);
                            callback();

                        });
                    });
                }, function (err) {
                    if (err != null) {
                        $util.resJSONError(err, res);
                        return;
                    }
                    $util.resJSON.resultnum = $util.resConfig.ok;
                    $util.resJSON.resultdata =renshu ;
                    res.json($util.resJSON);
                });

            });
        });

    },
   //获取互动课程学生排名
    selectRankingList: function (req, res, next) {
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
            var iaclass_id = param.iaclass_id;
            var end_time = param.end_time;

        } catch (e) {
            $util.resJSONError(e, res);
            return;
        }
        //查询
        classBeforeDao.updateCouseList(iaclass_id,end_time, function (err, result_list) {
            if (err != null) {
                $util.resJSONError(err, res);
                return;
            }
            classBeforeDao.selectRankingList(iaclass_id, function (err, result) {
                if (err != null) {
                    $util.resJSONError(err, res);
                    return;
                }
                $util.resJSON.resultnum = $util.resConfig.ok;
                $util.resJSON.resultdata = result;
                res.json($util.resJSON);

            });

        });



    },
    //根据教师查询所有教师的互动课程
    selectTInteractList: function (req, res, next) {
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
            var user_id = param.user_id;

        } catch (e) {
            $util.resJSONError(e, res);
            return;
        }
        //查询
        classBeforeDao.selectTInteractList(user_id, function (err, result) {
            if (err != null) {
                $util.resJSONError(err, res);
                return;
            }

            $util.resJSON.resultnum = $util.resConfig.ok;
            $util.resJSON.resultdata = result;
            res.json($util.resJSON);

        });

    },
    //根据学生获取当前的互动课程
    selectScurrentList:function (req, res, next) {
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
            var user_name = param.user_name;

        } catch (e) {
            $util.resJSONError(e, res);
            return;
        }
        //查询
        classBeforeDao.selectScurrentList(user_name, function (err, result) {
            if (err != null) {
                $util.resJSONError(err, res);
                return;
            }
            if(result.length == 0){
                result ={
                    state : 0
                }
            }
            $util.resJSON.resultnum = $util.resConfig.ok;
            $util.resJSON.resultdata = result;
            res.json($util.resJSON);

        });

    },
    //开始上课跟新iaclass表
    updateCourse:function (req, res, next) {
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
            var iaclass_id = param.iaclass_id;
            var start_time = param.start_time;

        } catch (e) {
            $util.resJSONError(e, res);
            return;
        }
        //查询
        classBeforeDao.updateCourse(iaclass_id,start_time, function (err, result) {
            if (err != null) {
                $util.resJSONError(err, res);
                return;
            }
            $util.resJSON.resultnum = $util.resConfig.ok;
            $util.resJSON.resultdata = result;
            res.json($util.resJSON);

        });

    },
    //教师点名
    rollCall:function (req, res, next) {
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
            var iaputq_id = $util.GUID();
            var iaclass_id = param.iaclass_id;
            var user_id = param.user_id;
            var iaputq_time =  param.iaputq_time;

        } catch (e) {
            $util.resJSONError(e, res);
            return;
        }
        //存入提问的iaputquestion
        classBeforeDao.insertIaputquestion(iaputq_id,iaclass_id,user_id,iaputq_time, function (err, result) {
            if (err != null) {
                $util.resJSONError(err, res);
                return;
            }
            $util.resJSON.resultnum = $util.resConfig.ok;
            $util.resJSON.resultdata = result;
            res.json($util.resJSON);

        });

    },
    //评价答题
    inserTanswer:function (req, res, next) {
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
            var iacomment_id = $util.GUID();
            var iacomment_content = param.iacomment_content;
            var iacomment_roletype = param.iacomment_roletype;
            var iacomment_score = param.iacomment_score;
            var iacomment_user_id = param.iacomment_user_id;
            var iaclass_id = param.iaclass_id;

        } catch (e) {
            $util.resJSONError(e, res);
            return;
        }
        //存入提问的iaputquestion
        classBeforeDao.inserTanswer(iacomment_id, iacomment_content, iacomment_roletype, iacomment_score,iacomment_user_id,iaclass_id, function (err, result) {
            if (err != null) {
                $util.resJSONError(err, res);
                return;
            }
            $util.resJSON.resultnum = $util.resConfig.ok;
            $util.resJSON.resultdata = result;
            res.json($util.resJSON);

        });

    },
    //获取分组的学生
    getStudentList:function (req, res, next) {
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
            var iaclass_id = param.iaclass_id;
            var user_id = param.user_id;

        } catch (e) {
            $util.resJSONError(e, res);
            return;
        }
        //存入提问的iaputquestion
        classBeforeDao.getStudentList(iaclass_id,user_id,function (err, result_id) {
            if (err != null) {
                $util.resJSONError(err, res);
                return;
            }
            var iagroup_id = result_id[0].iagroup_id;
            var StudentList = {};
            classBeforeDao.getStudentListT(iagroup_id,function (err, result_S) {
                if (err != null) {
                    $util.resJSONError(err, res);
                    return;
                }
                StudentList.zuYuan =[];
                var student={
                     students : result_S,
                     item : null
                }
                classBeforeDao.getStudentListS(iagroup_id,function (err, result) {
                    if (err != null) {
                        $util.resJSONError(err, res);
                        return;
                    }

                    student.item =result;
                    StudentList.zuYuan.push(student);
                    $util.resJSON.resultnum = $util.resConfig.ok;
                    $util.resJSON.resultdata = StudentList;
                    res.json($util.resJSON);

                });

            });
        });

    },
    //获取学生所有上课记录
    getStudentRecord:function (req, res, next) {
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
            var user_id = param.user_id;

        } catch (e) {
            $util.resJSONError(e, res);
            return;
        }
        //存入提问的iaputquestion
        classBeforeDao.getStudentRecord(user_id, function (err, result) {
            if (err != null) {
                $util.resJSONError(err, res);
                return;
            }
            $util.resJSON.resultnum = $util.resConfig.ok;
            $util.resJSON.resultdata = result;
            res.json($util.resJSON);

        });

    },
    //获取正在回答问题学生的信息
    getStudentNow:function (req, res, next) {
        try {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            param = JSON.parse(param.JSONPARAM);
            var user_id = param.user_id;

        } catch (e) {
            $util.resJSONError(e, res);
            return;
        }
        //存入提问的iaputquestion
        classBeforeDao.getStudentNow(user_id, function (err, result) {
            if (err != null) {
                $util.resJSONError(err, res);
                return;
            }
            $util.resJSON.resultnum = $util.resConfig.ok;
            $util.resJSON.resultdata = result;
            res.json($util.resJSON);

        });

    },
};
