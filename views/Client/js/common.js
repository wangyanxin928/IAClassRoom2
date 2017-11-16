// 外网
// var requestUrl ="http://101.200.231.203:9004/";

// 赵志洋ip
var requestUrl = "http://192.168.1.25:3388/IAClassRoom/";

//公共ajax请求方法 start
var getdata = function (iter, p, _callback) {
    var obj;
    if (p) {
        obj = {JSONPARAM: JSON.stringify(p)};
    }
    $.ajax({
        type: iter.itype,
        url: requestUrl + iter.iname + "?_n=" + Date.parse(new Date()) / 1000,
        data: obj,
        datatype: "JSON",
        success: function (res) {
            //后台返回的是json
            //res = JSON.parse(res);
            _callback(res);
        },
        error: function (e) {
        }
    });
};
//公共ajax请求方法 end


//初始化提示弹出框 start
$(function () {
    $('[data-toggle="popover"]').popover()
});
//初始化提示弹出框 end

//初始化 strat
var userIdBox = new Array();//上课学生的user_id数组用于随机点名

//初始化 end
//
// // 登陆页面 start
// // 教师登陆 start
// $("#teacherLogin").click(function (e) {
//     sessionStorage.clear();
//     var user_name = $("#user_name").val();
//     console.log(user_name);
//     if (user_name != "" && user_name != null && user_name != "undefined") {
//         var ajaxobj = {
//             itype: "get",
//             iname: "user/userRoute/userLogin"
//         };
//         var actobj = {"user_name": user_name,};
//         getdata(ajaxobj, actobj, function (data) {
//             console.log(data);
//             if (data.resultdata == "0") {
//                 $("#user_name").attr("data-content", "用户不存在请查看是否正确");
//                 $("#user_name").popover('show');
//                 setTimeout(function (e) {
//                     $("#user_name").popover('hide');
//                     $("#user_name").attr("data-content", "");
//                 }, 2000);
//             } else {
//                 if (data.resultnum != "0000") {
//                     console.log("Error");
//                     return;
//                 } else {
//
//                     console.log("请求成功");
//                     console.log(data.resultdata.role_name);
//
//                     // 存储到缓存 start
//                     sessionStorage.setItem("user_id", data.resultdata.user_id);//用户编号
//                     sessionStorage.setItem("user_name", data.resultdata.user_name);//用户名称
//                     sessionStorage.setItem("true_name", data.resultdata.true_name);//真实姓名
//                     sessionStorage.setItem("role_name", data.resultdata.role_name);//角色名称
//                     sessionStorage.setItem("server_id", data.resultdata.server_id);//所属机构Id
//                     sessionStorage.setItem("sex", data.resultdata.sex);//用户性别
//                     // 存储到缓存 end
//
//                     var server_id = data.resultdata.server_id;
//                     var role_name = data.resultdata.role_name;
//
//                     if (role_name == "教师") {
//                         console.log("教师登陆");
//                         window.location.href = 'newClassHistpryClass.html';
//                     } else {
//                         console.log("学生登陆");
//                         window.location.href = "studentClassHistpry.html";
//                     }
//                 }
//             }
//         });
//     } else {
//         $("#user_name").attr("data-content", "用户名/手机号不能为空");
//         $("#user_name").popover('show');
//         setTimeout(function (e) {
//             $("#user_name").popover('hide');
//             $("#user_name").attr("data-content", "");
//         }, 2000);
//     }
// });
// // 教师登陆 end
//
// // 学生登陆 start
// $("#studentLogin").click(function (e) {
//     sessionStorage.clear();
//     var user_name = $("#user_name").val();
//     console.log(user_name);
//     sessionStorage.setItem("user_name", user_name);
//
// });
// // 学生登陆 end
// // 登陆页面 end

// 添加新课程 选择年级跳转 start
$("#newClassHistpryClass").click(function () {
    window.location.href = 'gradeSelectionPage.html';

});


// 添加新课程 选择年级跳转 end

// 创建新课程 start
function gradeSelectionPage(e) {
    var server_id = sessionStorage.getItem("server_id");
    console.log(server_id);
    if (server_id != "" && server_id != null && server_id != "undefined") {
        var ajaxobj = {
            itype: "get",
            iname: "class/classBeforeRoute/getGradeList"
        };
        var actobj = {
            "server_id": server_id,
        };
        getdata(ajaxobj, actobj, function (data) {
            console.log(data);
            {
                if (data.resultnum != "0000") {
                    console.log("Error");
                    return;
                } else {
                    console.log("请求成功");
                    var primarySchoolStr = "";
                    var juniorSchoolStr = "";
                    var highSchoolStr = "";

                    //小学分组 start
                    $.each(data.resultdata.slice(0, 7), function (index, item) {
                        primarySchoolStr += "<div class='col-sm-3 col-xs-4 '><button id='" + item.grade_id + "' type='button' class='btn btn-default btn-block btn-lg grade'>" + item.grade_name + "</button></div>";
                    });
                    //小学分组 end
                    //初中分组显示 start
                    $("#primarySchool").append(primarySchoolStr);
                    $.each(data.resultdata.slice(7, 10), function (index, item) {
                        juniorSchoolStr += "<div class='col-sm-3 col-xs-4 '><button id='" + item.grade_id + "' type='button' class='btn btn-default btn-block btn-lg grade'>" + item.grade_name + "</button></div>";
                    });
                    //初中分组显示 end
                    //高中分组显示 start
                    $("#juniorSchool").append(juniorSchoolStr);
                    $.each(data.resultdata.slice(10, 13), function (index, item) {
                        highSchoolStr += "<div class='col-sm-3 col-xs-4 '><button id='" + item.grade_id + "' type='button' class='btn btn-default btn-block btn-lg grade'>" + item.grade_name + "</button></div>";
                    });
                    $("#highSchool").append(highSchoolStr);
                    //高中分组显示 end
                }
            }
        });
    }
}

//获取用户点击的年级ID 查找用户年级下的班级列表 start
$(document).on("click", ".grade", function (e) {
    var _this = $(this);
    var grade_id = _this.attr("id");
    var grade_name = _this.html();
    // 存储到缓存 start
    sessionStorage.setItem("grade_id", grade_id);//用户年级ID
    sessionStorage.setItem("grade_name", grade_name);//年级名称
    // 存储到缓存 end
    window.location.href = 'classGradePage.html';
});
//获取用户点击的年级ID 查找用户年级下的班级列表 end

// 根据不同的年级显示不同的班级列表
//班级列表 start
function classGradePage(e) {
    var grade_id = sessionStorage.getItem("grade_id");
    console.log(grade_id);
    if (grade_id != "" && grade_id != null && grade_id != "undefined") {
        var ajaxobj = {
            itype: "get",
            iname: "class/classBeforeRoute/getClassList"
        };
        var actobj = {
            "grade_id": grade_id,
        };
        getdata(ajaxobj, actobj, function (data) {
            console.log(data);
            {
                if (data.resultnum != "0000") {
                    console.log("Error");
                    return;
                } else {
                    console.log("请求成功");
                    //年级显示 start
                    if (data.resultdata.length > 0) {
                        var stageName = data.resultdata[0].grade_name;
                    } else {
                        stageName = '您选择的年级没有班级，请重新选择年级，谢谢！';
                        $("#stageName").css("color", "red");
                    }
                    $("#stageName").html(stageName);
                    //年级显示 end

                    var classGradeListStr = "";
                    //班级分组 start
                    $.each(data.resultdata, function (index, item) {
                        classGradeListStr += "<div class='col-sm-3 col-xs-4'><button type='button'  id='" + item.class_id + "' class='btn btn-default btn-block btn-lg'>" + item.class_name + "</button></div>";
                    });
                    //班级分组 end
                    $("#classGradeList").append(classGradeListStr);
                }
            }
        });
    }
    // 点击班级后进行跳转科目列表 start
    $(document).on("click", "#classGradeList .btn", function (e) {
        var _this = $(this);
        var class_id = _this.attr("id");
        var class_name = _this.html();

        // 存储到缓存 start
        sessionStorage.setItem("class_id", class_id);//用户年级ID
        sessionStorage.setItem("class_name", class_name);//年级名称
        // 存储到缓存 end

        window.location.href = 'courseGradePage.html';
    });
    // 点击班级后进行跳转科目列表 end
}

//班级列表 end

// 科目列表start
function courseGradePage(e) {

    var grade_id = sessionStorage.getItem("grade_id");
    if (grade_id != "" && grade_id != null && grade_id != "undefined") {
        var ajaxobj = {
            itype: "get",
            iname: "class/classBeforeRoute/getSubjectList"
        };
        var actobj = {
            "grade_id": grade_id,
        };
        getdata(ajaxobj, actobj, function (data) {
            console.log(data);
            {
                if (data.resultnum != "0000") {
                    console.log("Error");
                    return;
                } else {
                    console.log("请求成功");

                    var classGradeListStr = "";
                    //学科列表 start
                    $.each(data.resultdata, function (index, item) {
                        classGradeListStr += "<div class='col-xs-4 col-sm-3 text-center'><div class='courseBtn' id=" + item.subject_id + " subject_type=" + item.subject_type + "><img src=" + item.subject_src + " ><h4>" + item.subject_name + "</h4></div></div>";


                    });
                    //学科列表 end
                    $("#classGradeList").append(classGradeListStr);
                }
            }
        });
    }
    $(document).on("click", "#classGradeList .courseBtn", function (e) {
        var _this = $(this);
        var subject_id = _this.attr("id");
        var subject_name = _this.children("h4").html();
        var subject_type = _this.attr("subject_type");

        // 存储到缓存 start
        sessionStorage.setItem("subject_id", subject_id);//学科Id
        sessionStorage.setItem("subject_name", subject_name);//学科名称
        sessionStorage.setItem("subject_type", subject_type);//学科类型
        // 存储到缓存 end

        var grade_name = sessionStorage.getItem("grade_name");
        var class_name = sessionStorage.getItem("class_name");
        var createNewCoursesInfo = grade_name + "（" + class_name + "）" + subject_name + "课";
        $("#createNewCoursesInfo").html(createNewCoursesInfo);

        // 创建新课程提示信息 start
        $('#createNewCourses').modal({keyboard: true});
        // 创建新课程提示信息 end
    });

    //    确认创建start
    $(document).on("click", '#confirmCreationBtn', function (e) {
        $('#createNewCourses').modal('hide');

        var server_id = sessionStorage.getItem("server_id");
        var class_id = sessionStorage.getItem("class_id");
        var class_name = sessionStorage.getItem("class_name");
        var grade_id = sessionStorage.getItem("grade_id");
        var grade_name = sessionStorage.getItem("grade_name");
        var subject_id = sessionStorage.getItem("subject_id");
        var subject_name = sessionStorage.getItem("subject_name");
        var user_id = sessionStorage.getItem("user_id");

        var ajaxobj = {
            itype: "get",
            iname: "class/classBeforeRoute/insertSubjectList"
        };
        var actobj = {
            "server_id": server_id,
            "class_id": class_id,
            "class_name": class_name,
            "grade_id": grade_id,
            "grade_name": grade_name,
            "subject_id": subject_id,
            "subject_name": subject_name,
            "user_id": user_id,

        };
        getdata(ajaxobj, actobj, function (data) {
            // window.location.href="groupingList.html";
            console.log(data);
            {
                if (data.resultnum != "0000") {
                    console.log("Error");
                    return;
                } else {
                    console.log("请求成功");
                    sessionStorage.setItem("iaclass_id", data.resultdata.iaclass_id);
                    window.location.href = "groupingList.html";
                }
            }
        });
    })
    //    确认创建end
}


// 科目列表end


// 根据年级/班级/学科 查看分组详情 start
function groupingList() {
    var iaclass_id = sessionStorage.getItem("iaclass_id");
    var ajaxobj = {
        itype: "get",
        iname: "class/classBeforeRoute/getStudentNumbers"
    };
    var actobj = {
        "iaclass_id": iaclass_id,
    };
    getdata(ajaxobj, actobj, function (data) {
        var grouping = data.resultdata.grouping;
        sessionStorage.setItem("grouping", grouping);
        {
            if (data.resultnum != "0000") {
                var noStudentListInfo = data.resultdata.iaclass_name + "课";
                $("#groupingListTitle").html(noStudentListInfo);

                var noStudentListInfoStr = "";
                noStudentListInfoStr += "<div style='padding: 15px'><h4 style='color: red'>您所创建的：" + noStudentListInfo + "课，<p style='margin-top: 10px;'>没有学生分组信息请登陆后台管理进行创建分组，谢谢！</p></h4></div>";
                $("#groupingListInfo").append(noStudentListInfoStr);
                return;
            } else {
                console.log("请求成功");
                //显示所创建的年级 班级 课程名称
                $("#groupingListTitle").html(data.resultdata.grouping + "课");

                console.log(data);
                //获取开始上课按钮的状态 start
                var state = data.resultdata.state;
                var _this = $('#beginsClassBtn');
                if (state == '0') {
                    _this.removeClass('btn-danger').addClass('btn-success');
                    _this.attr("data-value", "1");
                    _this.html("开始上课");
                } else if (state == '1') {
                    //改变按钮样式及文字 start
                    _this.removeClass('btn-success').addClass('btn-danger');
                    _this.attr("data-value", "2");
                    _this.html("下课");
                    //改变按钮样式及文字 end
                } else if (state == '2') {
                    _this.removeClass('btn-success').addClass('btn-primary');
                    _this.removeClass('btn-danger').addClass('btn-primary');
                    _this.attr("data-value", "3");
                    _this.html("课程已结束");
                    _this.attr("id", "confirmOverClassBtn")
                }
                //获取开始上课按钮的状态 end

                // 存储到缓存 start
                sessionStorage.setItem("state", data.resultdata.state);//上课状态
                // 存储到缓存 end

                //学科列表 start

                $.each(data.resultdata.renyuan_lists, function (index, item) {
                    var groupingListInfoStr = "";
                    groupingListInfoStr += " <div class='col-xs-6 col-sm-6  margin-top2' >" +
                        "<div class='col-xs-12 col-sm-12 bg-gray2 studentList'>" +
                        "<div class='groupName'>" + item.renyuan_num.iagroup_name + "（" + item.renyuan_num.user_num + "人）</div>" +
                        "<div class='line'></div>" +
                        "<div class= 'studentInfo'><div class='row'>";
                    $.each(item.course_date_list, function (index2, item2) {
                        // 获取班级所有人员user_id 存入到 userIdBox；

                        console.log(item2);
                        var userId = item2.user_id;
                        userIdBox.push(userId);
                        console.log(userIdBox);


                        var user_type = item2.user_type;
                        if (user_type == "1") {
                            user_type = "教师";
                            groupingListInfoStr += "<div class='col-xs-6 col-sm-6 rollCallBtn' id=" + item2.user_id + " user_type=" + item2.user_type + ">" +
                                "<div class='row padding1  leader'>" +
                                "<img src='../images/sex" + item2.sex + ".png' alt='' class='studentPortrait '>" +
                                "<b class='leaderIcon'>" + user_type + "</b>" +
                                "<span class='studentName'>" + item2.true_name + "</span>" +
                                "</div>" +
                                "</div>";
                        } else if (user_type == "2") {
                            user_type = "组长";
                            groupingListInfoStr += "<div class='col-xs-6 col-sm-6 rollCallBtn' id=" + item2.user_id + " user_type=" + item2.user_type + ">" +
                                "<div class='row padding1  leader'>" +
                                "<img src='../images/sex" + item2.sex + ".png' alt='' class='studentPortrait '>" +
                                "<b class='leaderIcon'>" + user_type + "</b>" +
                                "<span class='studentName'>" + item2.true_name + "</span>" +
                                "</div>" +
                                "</div>";
                        } else if (user_type == "3") {
                            groupingListInfoStr += "<div class='col-xs-6 col-sm-6 rollCallBtn' id=" + item2.user_id + " user_type=" + item2.user_type + ">" +
                                "<div class='row padding1  leader'>" +
                                "<img src='../images/sex" + item2.sex + ".png' alt='' class='studentPortrait '>" +
                                "<span class='studentName'>" + item2.true_name + "</span>" +
                                "</div>" +
                                "</div>";
                        }

                        // groupingListInfoStr+="<div class='col-xs-6 col-sm-6 rollCallBtn'>" +
                        //         "<div class='row padding1  leader'>" +
                        //             "<img src='../images/womon.png' alt='' class='studentPortrait '>" +
                        //             "<b class='leaderIcon'>"+user_type+"</b>" +
                        //             "<span class='studentName'>"+item2.true_name+"</span>" +
                        //         "</div>" +
                        //     "</div>";


                    });
                    groupingListInfoStr += '</div></div></div></div>';
                    $("#groupingListInfo").append(groupingListInfoStr)

                });
            }
        }
    });


}

// 查看年级/班级/学科分组详情 end

// 创建新课程 end


// 点名提问功能，点击某个人的头像或其它个人信息则弹出被点人的信息及自身增加已选中状态 start
$(document).on("click", ".rollCallBtn", function (e) {
    if($("#beginsClassBtn").attr("data-value")=="2"){
        var _this = $(this);
        var user_id = _this.attr("id");


        var iaclass_id = sessionStorage.getItem("iaclass_id");

        var beginsClassVal = $("#beginsClassBtn").attr('data-value');
        console.log(beginsClassVal);
        if (beginsClassVal == '1') {
            $('#confirmClassFirst').modal({keyboard: true});
        }
        else {
            $(".active").removeClass('active');
            _this.addClass('active');
            // 更改被点击弹出的内容 start
            // 获取被点名学生信息 start
            console.log(user_id);
            var ajaxobj = {
                itype: "get",
                iname: "class/classBeforeRoute/getStudentNow"
            };
            var actobj = {
                "user_id": user_id,
            };
            getdata(ajaxobj, actobj, function (data) {
                console.log(data);
                var resultdataLength = data.resultdata.length;
                if (resultdataLength > "0") {
                    var user_type = data.resultdata[0].user_type;
                    var user_id = data.resultdata[0].user_id;
                    var true_name = data.resultdata[0].true_name;
                    var role_name = data.resultdata[0].role_name;
                    var sex = data.resultdata[0].sex;

                    var rollCallBoxStr = "";
                    if (user_type == "1") {
                        rollCallBoxStr += "" +
                            "<div class='row'>" +
                            "   <div class='col-sm-6 col-xs-6 col-sm-offset-3 col-xs-offset-3' >" +
                            "       <img src='../images/sex" + sex + ".png'  class='studentPortrait '>" +
                            "       <div id='" + user_id + "' class='studentInfo' user_type=" + user_type + ">" +
                            "           <span class='studentName'>" + true_name + "</span>" +
                            "       </div>" +
                            "   </div>" +
                            "</div>";

                    } else if (user_type == "2") {
                        rollCallBoxStr += "" +
                            "<div class='row'>" +
                            "   <div class='col-sm-6 col-xs-6 col-sm-offset-3 col-xs-offset-3'>" +
                            "       <img src='../images/sex" + sex + ".png'   class='studentPortrait '>" +
                            "       <div  id='" + user_id + "' class='studentInfo' user_type=" + user_type + ">" +
                            "           <span class='studentName'>" + true_name + "</span>" +
                            "           <b class='leaderIcon'>组长</b>" +
                            "       </div>" +
                            "   </div>" +
                            "</div>";

                    }
                    else if (user_type == "3") {
                        rollCallBoxStr += "" +
                            "<div class='row'>" +
                            "   <div class='col-sm-6 col-xs-6 col-sm-offset-3 col-xs-offset-3 '>" +
                            "       <img src='../images/sex" + sex + ".png'   class='studentPortrait '>" +
                            "       <div id='" + user_id + "' class='studentInfo' user_type=" + user_type + ">" +
                            "           <span class='studentName'>" + true_name + "</span>" +
                            "       </div>" +
                            "   </div>" +
                            "</div>";
                    }
                    $("#rollCallBoxInfo").children().remove();
                    $("#rollCallBoxInfo").append(rollCallBoxStr);
                    //显示被点名人员信息 start
                    $('#rollCall').modal({keyboard: true});
                    //显示被点名人员信息 end
                }
            });
            $("#rollCallBoxTitle").html("请确认是否让下面同学回答此问");
            $("#rollCallScoreBox").css("display", "none ");
            $("#definiteRollCallBox").css({"display": "block"});
            $("#scoreBtn").css("display", "none");

            // 更改被点击弹出的内容 end
        }
    }


});

//随机点名 start


function randomRollCall() {
    var beginsClassVal = $("#beginsClassBtn").attr('data-value');
    console.log(beginsClassVal);
    if (beginsClassVal == '1') {
        $('#confirmClassFirst').modal({keyboard: true});
    } else {
        console.log("随机点名");
        console.log(userIdBox);
        var userIdIndex = Math.floor((Math.random() * userIdBox.length));
        var user_id = userIdBox[userIdIndex];


        // 更改被点击弹出的内容 start
        // 获取被点名学生信息 start
        var ajaxobj = {
            itype: "get",
            iname: "class/classBeforeRoute/getStudentNow"
        };
        var actobj = {
            "user_id": user_id,
        };
        getdata(ajaxobj, actobj, function (data) {
            console.log(data);
            var resultdataLength = data.resultdata.length;
            if (resultdataLength > "0") {
                var user_type = data.resultdata[0].user_type;
                var user_id = data.resultdata[0].user_id;
                var true_name = data.resultdata[0].true_name;
                var role_name = data.resultdata[0].role_name;
                var sex = data.resultdata[0].sex;

                var rollCallBoxStr = "";
                if (user_type == "1") {
                    rollCallBoxStr += "" +
                        "<div class='row'>" +
                        "   <div class='col-sm-6 col-xs-6 col-sm-offset-3 col-xs-offset-3' >" +
                        "       <img src='../images/sex" + sex + ".png'  class='studentPortrait '>" +
                        "       <div id='" + user_id + "' class='studentInfo' user_type=" + user_type + ">" +
                        "           <span class='studentName'>" + true_name + "</span>" +
                        "       </div>" +
                        "   </div>" +
                        "</div>";

                } else if (user_type == "2") {
                    rollCallBoxStr += "" +
                        "<div class='row'>" +
                        "   <div class='col-sm-6 col-xs-6 col-sm-offset-3 col-xs-offset-3'>" +
                        "       <img src='../images/sex" + sex + ".png'   class='studentPortrait '>" +
                        "       <div  id='" + user_id + "' class='studentInfo' user_type=" + user_type + ">" +
                        "           <span class='studentName'>" + true_name + "</span>" +
                        "           <b class='leaderIcon'>组长</b>" +
                        "       </div>" +
                        "   </div>" +
                        "</div>";

                }
                else if (user_type == "3") {
                    rollCallBoxStr += "" +
                        "<div class='row'>" +
                        "   <div class='col-sm-6 col-xs-6 col-sm-offset-3 col-xs-offset-3 '>" +
                        "       <img src='../images/sex" + sex + ".png'   class='studentPortrait '>" +
                        "       <div id='" + user_id + "' class='studentInfo' user_type=" + user_type + ">" +
                        "           <span class='studentName'>" + true_name + "</span>" +
                        "       </div>" +
                        "   </div>" +
                        "</div>";
                }
                $("#rollCallBoxInfo").children().remove();
                $("#rollCallBoxInfo").append(rollCallBoxStr);
                //显示被点名人员信息 start
                $('#rollCall').modal({keyboard: true});
                //显示被点名人员信息 end
            }
        });
        $("#rollCallBoxTitle").html("请确认是否让下面同学回答此问");
        $("#rollCallScoreBox").css("display", "none ");
        $("#definiteRollCallBox").css({"display": "block"});
        $("#scoreBtn").css("display", "none");

        // 更改被点击弹出的内容 end


    }


}


//随机点名 end


// 确定点名 start
$(document).on("click", "#definiteRollCall", function (e) {
    $("#rollCallBoxTitle").html("");
    $("#rollCallScoreBox").css("display", "block");
    $("#definiteRollCallBox").css("display", "none");
    $("#scoreBtn").css({"display": "block", "margin": "auto"});


    var iaclass_id = sessionStorage.getItem("iaclass_id");
    var user_id=$("#rollCallBoxInfo").find(".studentInfo").attr("id");

    $(".active").removeClass('active');
    // 给后台穿点名了某个人
    var ajaxobj = {
        itype: "get",
        iname: "class/classBeforeRoute/rollCall"
    };
    var actobj = {
        "iaclass_id": iaclass_id,
        "user_id": user_id,
    };
    getdata(ajaxobj, actobj, function (data) {
        console.log(data);
    });

});
// 确定点名 end


//评分星星的显示 start
$(document).on("click", "#scoreList div", function (e) {
    var _this = $(this);
    var thisSeveral = _this.index();
    if (thisSeveral == "0") {
        $('#scoreList').children().eq(0).removeClass('scoreStarsNot').addClass("scoreStarsActive");

        $('#scoreList').children().eq(1).removeClass('scoreStarsActive').addClass("scoreStarsNot");
        $('#scoreList').children().eq(2).removeClass('scoreStarsActive').addClass("scoreStarsNot");
        $('#scoreList').children().eq(3).removeClass('scoreStarsActive').addClass("scoreStarsNot");
        $('#scoreList').children().eq(4).removeClass('scoreStarsActive').addClass("scoreStarsNot");
    }
    if (thisSeveral == "1") {
        $('#scoreList').children().eq(0).removeClass('scoreStarsNot').addClass("scoreStarsActive");
        $('#scoreList').children().eq(1).removeClass('scoreStarsNot').addClass("scoreStarsActive");

        $('#scoreList').children().eq(2).removeClass('scoreStarsActive').addClass("scoreStarsNot");
        $('#scoreList').children().eq(3).removeClass('scoreStarsActive').addClass("scoreStarsNot");
        $('#scoreList').children().eq(4).removeClass('scoreStarsActive').addClass("scoreStarsNot");
    }
    if (thisSeveral == "2") {
        $('#scoreList').children().eq(0).removeClass('scoreStarsNot').addClass("scoreStarsActive");
        $('#scoreList').children().eq(1).removeClass('scoreStarsNot').addClass("scoreStarsActive");
        $('#scoreList').children().eq(2).removeClass('scoreStarsNot').addClass("scoreStarsActive");

        $('#scoreList').children().eq(3).removeClass('scoreStarsActive').addClass("scoreStarsNot");
        $('#scoreList').children().eq(4).removeClass('scoreStarsActive').addClass("scoreStarsNot");

    }
    if (thisSeveral == "3") {
        $('#scoreList').children().eq(0).removeClass('scoreStarsNot').addClass("scoreStarsActive");
        $('#scoreList').children().eq(1).removeClass('scoreStarsNot').addClass("scoreStarsActive");
        $('#scoreList').children().eq(2).removeClass('scoreStarsNot').addClass("scoreStarsActive");
        $('#scoreList').children().eq(3).removeClass('scoreStarsNot').addClass("scoreStarsActive");

        $('#scoreList').children().eq(4).removeClass('scoreStarsActive').addClass("scoreStarsNot");
    }
    if (thisSeveral == "4") {
        $('#scoreList').children().eq(0).removeClass('scoreStarsNot').addClass("scoreStarsActive");
        $('#scoreList').children().eq(1).removeClass('scoreStarsNot').addClass("scoreStarsActive");
        $('#scoreList').children().eq(2).removeClass('scoreStarsNot').addClass("scoreStarsActive");
        $('#scoreList').children().eq(3).removeClass('scoreStarsNot').addClass("scoreStarsActive");
        $('#scoreList').children().eq(4).removeClass('scoreStarsNot').addClass("scoreStarsActive");
    }
    // $("#scoreList .scoreStarsNot").removeClass("scoreStarsActive").addClass("scoreStarsNot");
    // var scoreListLength= $("#scoreList").children(".scoreStarsNot").length;
    // console.log(scoreListLength);
});
//评分星星的显示 end

// 获取对用户评分 start
$(document).on("click", "#scoreBtn", function (e) {
    // 获取用户对此次提问的评分星星个数
    var scoreListLength = $("#scoreList").children(".scoreStarsActive").length;


    var iacomment_content = "";
    var iacomment_roletype = $("#rollCallBoxInfo .studentInfo ").attr("user_type");
    var iacomment_score = scoreListLength * 20;
    var iacomment_user_id = $("#rollCallBoxInfo .studentInfo ").attr("id");
    var iaclass_id = sessionStorage.getItem("iaclass_id");

    var ajaxobj = {
        itype: "get",
        iname: "class/classBeforeRoute/inserTanswer"
    };
    var actobj = {
        "iacomment_content": iacomment_content,
        "iacomment_roletype": iacomment_roletype,
        "iacomment_score": iacomment_score,
        "iacomment_user_id": iacomment_user_id,
        "iaclass_id": iaclass_id,
    };
    getdata(ajaxobj, actobj, function (data) {
        console.log(data);
    });
    $('#rollCall').modal("hide");
    $(".active").removeClass('active');
    $('#scoreList').children().removeClass('scoreStarsActive').addClass("scoreStarsNot");
});


// 获取对用户评分 end

// 点名提问功能 end


//上课中开始 start
$('#beginsClassBtn').click(function (e) {
    var grouping = sessionStorage.getItem("grouping");
    var beginsClassVal = $(this).attr('data-value');
    if (beginsClassVal == "1") {
        $("#beginsPromptInfo").html("老师您好：您上的课为：" + grouping + "课");
        $('#beginsClass').modal({keyboard: true});

    }
    else if (beginsClassVal == "2") {
        $("#ConfirmOverClassPromptInfo").html("请确认：" + grouping + "课，是否结束。");
        $('#ConfirmOverClass').modal({keyboard: true});

    } else if (beginsClassVal == "3") {
        $('#activeInfo').modal({keyboard: true});
    }

});
// 确认上课 start
$(document).on("click", "#confirmBeginsClassBtn", function (e) {

    var iaclass_id = sessionStorage.getItem("iaclass_id");

    var ajaxobj = {
        itype: "get",
        iname: "class/classBeforeRoute/updateCourse"
    };
    var actobj = {
        "iaclass_id": iaclass_id,
    };
    getdata(ajaxobj, actobj, function (data) {
        console.log(data);
        {
            if (data.resultnum != "0000") {
                console.log("Error");
                return;
            } else {
                // console.log("请求成功");
                $('#beginsClass').modal("hide");
                //改变按钮样式及文字 start
                var _this = $('#beginsClassBtn');
                _this.removeClass('btn-success').addClass('btn-danger');
                _this.attr("data-value", "2");
                _this.html("下课");
                //改变按钮样式及文字 end
            }
        }
    });
});
// 确认上课 end


//课程结束获取互动课堂学生排名 start
$(document).on("click", "#confirmOverClassBtn", function (e) {
    $('#ConfirmOverClass').modal("hide");
    var iaclass_id = sessionStorage.getItem("iaclass_id");
    if (iaclass_id != "" && iaclass_id != null && iaclass_id != "undefined") {
        var ajaxobj = {
            itype: "get",
            iname: "class/classBeforeRoute/selectRankingList"
        };
        var actobj = {
            "iaclass_id": iaclass_id,
        };
        getdata(ajaxobj, actobj, function (data) {
            console.log(data);
            {
                if (data.resultnum != "0000") {
                    console.log("Error");
                    return;
                } else {
                    console.log("请求成功");
                    var groupingListDataLength = data.resultdata.length;
                    console.log("排名长度为 " + groupingListDataLength);
                    if (groupingListDataLength >= 3) {

                        var twoRanking = data.resultdata[1];
                        var oneRanking = data.resultdata[0];
                        var threeRanking = data.resultdata[2];

                        var goodActiveRankingBoxStr = "";

                        goodActiveRankingBoxStr +=
                            "<div class='col-sm-4 goodActiveRanking'>" +
                            "   <img src='../images/sex" + twoRanking.sex + ".png'  class='goodActiveImg'>" +
                            "   <div class='goodActiveIcon'>" +
                            "       <img src='../images/ranking2.png'>" +
                            "   </div>" +
                            "   <div>" + twoRanking.true_name + "</div>" +
                            "   <div>" + twoRanking.avg_score + "分</div>" +
                            "</div>" +
                            "<div class='col-sm-4 goodActiveRanking oneRanking'>" +
                            "   <img src='../images/sex" + oneRanking.sex + ".png' class='goodActiveImg'>" +
                            "   <div class='goodActiveIcon'>" +
                            "       <img src='../images/ranking1.png' >" +
                            "   </div>" +
                            "   <div>" + oneRanking.true_name + "</div>" +
                            "   <div>" + oneRanking.avg_score + "分</div>" +
                            "</div>" +
                            "<div class='col-sm-4 goodActiveRanking'>" +
                            "   <img src='../images/sex" + threeRanking.sex + ".png'  class='goodActiveImg'>" +
                            "   <div class='goodActiveIcon'>" +
                            "       <img src='../images/ranking3.png\'>" +
                            "   </div>" +
                            "   <div>" + threeRanking.true_name + "</div>" +
                            "   <div>" + threeRanking.avg_score + "分</div>" +
                            "</div>";
                        //学科列表 end
                        $("#goodActiveRankingBox").append(goodActiveRankingBoxStr);


                    }

                    //删除之前班级排名重新获取并添加到列表中；
                    $("#selectRankingList").children().remove();
                    var selectRankingListStr = "";
                    //学生上课互动排名 start
                    $.each(data.resultdata, function (index, item) {
                        var sex = (item.sex == "1") ? "男" : (item.sex == "2") ? "女" : "未知";
                        var index = index + 1;
                        selectRankingListStr +=
                            "<tr>" +
                            "   <td>" + index + "</td>" +
                            "   <td>" + item.true_name + "</td>" +
                            "   <td>" + sex + "</td>" +
                            "   <td>" + item.put_count + "</td>" +
                            "   <td>" + item.avg_score + "</td>" +
                            "</tr>";


                    });
                    //学生上课互动排名 end
                    $("#selectRankingList").append(selectRankingListStr);

                    // 显示当前课程已结束
                    $('#activeInfo').modal({keyboard: true});
                    var _this = $('#beginsClassBtn');
                    _this.removeClass('btn-danger').addClass('btn-primary');
                    _this.attr("data-value", "3");
                    _this.html("课程已结束");
                }
            }
        });
    }


});

//课程结束获取互动课堂学生排名 end

//上课中结束 end

//创建课程及上课结束 end


// 教师查看上课记录 start
function teacherClassHistory() {
    var user_id = sessionStorage.getItem("user_id");
    console.log(user_id);
    var ajaxobj = {
        itype: "get",
        iname: "class/classBeforeRoute/selectTInteractList"
    };
    var actobj = {
        "user_id": user_id,
    };
    getdata(ajaxobj, actobj, function (data) {
        console.log(data);
        {
            if (data.resultnum != "0000") {
                console.log("Error");
                return;
            } else {
                console.log("请求成功");
                if (data.resultdata.length > "0") {
                    $("#teacherName").html(data.resultdata[0].true_name + "&nbsp;老师");
                }
                var teacherClassHistoryStr = "";
                //学生上课互动排名 start
                $.each(data.resultdata, function (index, item) {
                    var index = index + 1;
                    var _time = item.start_time + "-" + item.end_time;
                    teacherClassHistoryStr +=
                        " <tr>" +
                        "   <td>" + index + "</td>" +
                        "   <td>" + item.class_name + "</td>" +
                        "   <td>" + item.subject_name + "</td>" +
                        "   <td>" + _time + "</td>" +
                        "   <td>" + item.call_num + "</td>" +
                        "</tr>";


                });
                //学生上课互动排名 end
                $("#teacherClassHistoryList").append(teacherClassHistoryStr);

            }
        }
    });


}


// 教师查看上课记录 end

// 学生查看上课记录 start
function studentClassHistory() {
    var user_id = sessionStorage.getItem("user_id");
    console.log(user_id);
    var ajaxobj = {
        itype: "get",
        iname: "class/classBeforeRoute/getStudentRecord"
    };
    var actobj = {
        "user_id": user_id,
    };
    getdata(ajaxobj, actobj, function (data) {
        console.log(data);
        {
            if (data.resultnum != "0000") {
                console.log("Error");
                return;
            } else {
                console.log("请求成功");
                var resultdataLength = data.resultdata.length;
                if (resultdataLength > 0) {
                    var true_name = data.resultdata[0].true_name;
                    $("#studentName").html(true_name + "&nbsp;同学");
                }

                var studentClassHistoryStr = "";
                //学生上课互动排名 start
                $.each(data.resultdata, function (index, item) {
                    var index = index + 1;
                    var _time = item.start_time + item.end_time;
                    studentClassHistoryStr += "" +
                        "  <tr>" +
                        "<td>" + index + "</td>" +
                        "<td>" + item.subject_name + "</td>" +
                        "<td>" + _time + "</td>" +
                        "<td>" + item.submit_num + "</td>" +
                        "<td>" + item.avg_sum + "</td>" +
                        "</tr>";


                });
                //学生上课互动排名 end
                $("#studentClassHistoryStrList").append(studentClassHistoryStr);

            }
        }


    });


}

// 学生查看上课记录 end

//学生查看正在上课的课程 start
function studentGrouping() {
    var user_name = sessionStorage.getItem("user_name");


    console.log(user_name);
    var ajaxobj = {
        itype: "get",
        iname: "class/classBeforeRoute/selectScurrentList"
    };
    var actobj = {
        "user_name": user_name,
    };
    getdata(ajaxobj, actobj, function (data) {
        console.log(data);
        sessionStorage.setItem("iaclass_id", data.resultdata.iaclass_id);

        {
            if (data.resultnum != "0000") {
                console.log("Error");
                return;
            } else {
                console.log("请求成功");
                var studentClassHistpryLength = data.resultdata.length;
                if (studentClassHistpryLength > 0) {
                    sessionStorage.setItem("iaclass_name", data.resultdata[0].iaclass_name);
                    if (data.resultdata[0].state == "1") {
                        var className = data.resultdata[0].subject_name;
                        //学生上课互动排名 start
                        $("#studentGrouping").html("正在上" + className + "课");
                        $("#studentGrouping").removeAttr("disabled");
                        // 存储用户信息 start
                        sessionStorage.setItem("iaclass_id", data.resultdata[0].iaclass_id);
                        sessionStorage.setItem("user_id", data.resultdata[0].user_id);
                        // 存储用户信息 end
                    } else if (data.resultdata[0].state == "0") {
                        $("#studentGrouping").html("暂无课程");
                        $("#studentGrouping").attr("disabled", "disabled");
                    }

                }


            }
        }
    });

}


//学生查看正在上课的课程 end

//学生正在上课的分组名单 start

function studentGroupingList(e) {
    var iaclass_id = sessionStorage.getItem("iaclass_id");
    var user_id = sessionStorage.getItem("user_id");
    var iaclass_name = sessionStorage.getItem("iaclass_name");
    $("#studentGroupingListTitle").html(iaclass_name + "课");
    var ajaxobj = {
        itype: "get",
        iname: "class/classBeforeRoute/getStudentList"
    };
    var actobj = {
        "iaclass_id": iaclass_id,
        "user_id": user_id,
    };
    getdata(ajaxobj, actobj, function (data) {
        console.log(data);
        {
            if (data.resultnum != "0000") {
                console.log("Error");
                return;
            } else {
                console.log("请求成功");
                var resultdataLength = data.resultdata.zuYuan.length;
                console.log(resultdataLength);
                if (resultdataLength > 0) {
                    var studentsLength = data.resultdata.zuYuan[0].students.length;
                    console.log(studentsLength);
                    if (studentsLength > 0) {
                        $("#groupName").html(data.resultdata.zuYuan[0].students[0].iagroup_name + "（" + data.resultdata.zuYuan[0].students[0].user_num + "人）");

                    }
                    var itemLength = data.resultdata.zuYuan[0].item.length;
                    if (itemLength > 0) {

                        var zuYuanStr = "";
                        //学生上课互动排名 start
                        $.each(data.resultdata.zuYuan[0].item, function (index, item) {

                            // 用户类型 教师
                            if (item.user_type == "1") {
                                zuYuanStr += "" +
                                    "<div class='col-xs-5 col-sm-5 col-sm-offset-1 col-xs-offset-1 rollCallBtn'>" +
                                    "   <div class='row padding1 '>" +
                                    "   <img src='../images/womon.png'  class='studentPortrait'>" +
                                    "   <span class='studentName'>" + item.true_name + "</span>" +
                                    "   </div>" +
                                    "</div>";
                            }
                            // 用户类型 组长
                            else if (item.user_type == "2") {
                                zuYuanStr += "" +
                                    "<div class='col-xs-5 col-sm-5 col-sm-offset-1 col-xs-offset-1 rollCallBtn'>" +
                                    "   <div class='row padding1 leader'>" +
                                    "   <img src='../images/womon.png'  class='studentPortrait'>" +
                                    "<b class='leaderIcon'>组长</b>" +
                                    "   <span class='studentName'>" + item.true_name + "</span>" +
                                    "   </div>" +
                                    "</div>";
                            }
                            //用户类型 学生
                            else if (item.user_type == "3") {
                                zuYuanStr += "" +
                                    "<div class='col-xs-5 col-sm-5 col-sm-offset-1 col-xs-offset-1 rollCallBtn'>" +
                                    "   <div class='row padding1 '>" +
                                    "   <img src='../images/womon.png'  class='studentPortrait'>" +
                                    "   <span class='studentName'>" + item.true_name + "</span>" +
                                    "   </div>" +
                                    "</div>";
                            }


                        });
                        //学生上课互动排名 end
                        $("#zuYuanStrList").append(zuYuanStr);
                    }

                }
            }
        }
    });
}

//学生正在上课的分组名单 end

// 学生正在上课中被提问的轮询 start
function questionsPolling(e) {

    var timer = setInterval(function () {
        var ajaxobj = {
            itype: "get",
            iname: "class/classBeforeRoute/getStudentNowQuestion"
        };
        var iaclass_id=sessionStorage.getItem("iaclass_id");
        console.log(iaclass_id);
        var actobj = {
            "iaclass_id": iaclass_id,
        };
        getdata(ajaxobj, actobj, function (data) {
            console.log(data);
            {
                if (data.resultnum == "2222") {
                    console.log("当前没有被提问学员！");
                    return;
                }
                else if(data.resultnum == "0000"){
                    console.log("请求成功");
                    var state = data.resultdata.state;
                    console.log(state);
                    // 没有课程
                    if (state == 0) {
                        $("#classState").attr("disable", "disable").removeClass("btn-primary").addClass("btn-success").html("没有课程").attr("state", "0");

                    } else if (state == 1) {
                        // 正在上课
                        $("#classState").attr("disable", "disable").removeClass("btn-primary").addClass("btn-success").html("正在上课").attr("state", "1");

                        // 用于更新当前是谁在答题 start
                        var iaputq_id = data.resultdata.iaputq_id;
                        // 取出旧的当前回答问题的用户id
                        var iaputq_id_old = sessionStorage.getItem("iaputq_id_old");
                        // 把新的回答问题id缓存
                        sessionStorage.setItem("iaputq_id_old", iaputq_id);
                        if (iaputq_id != iaputq_id_old) {
                            alert(iaputq_id);
                            var studentNowQuestionStr = "";

                            var user_type = data.resultdata.user_type;
                            console.log(user_type);
                            var studentInfo = "";
                            if (user_type == "1") {
                                studentInfo = "" +
                                    "<div class='row'>" +
                                    "   <div class='col-sm-8 col-xs-8 col-sm-offset-2 col-xs-offset-2'>" +
                                    "       <img style='margin-left: 25%;' src='../images/sex" + data.resultdata.sex + ".png'  class='studentPortrait'>" +
                                    "       <div class='studentInfo' user_type=" + data.resultdata.user_type + " id=" + data.resultdata.user_id + ">" +
                                    "           <span class='studentName' style='margin-left: 0px; line-height: 3rem'>" + data.resultdata.true_name + "</span>" +
                                    "           <b class='leaderIcon'>教师</b>" +
                                    "       </div>" +
                                    "   </div>" +
                                    "</div>";
                            } else if (user_type == "2") {
                                studentInfo = "" +
                                    "<div class='row'>" +
                                    "   <div class='col-sm-8 col-xs-8 col-sm-offset-2 col-xs-offset-2'>" +
                                    "       <img style='margin-left: 25%;' src='../images/sex" + data.resultdata.sex + ".png'  class='studentPortrait'>" +
                                    "       <div class='studentInfo' user_type=" + data.resultdata.user_type + " id=" + data.resultdata.user_id + ">" +
                                    "           <span class='studentName' style='margin-left: 0px; line-height: 3rem'>" + data.resultdata.true_name + "</span>" +
                                    "           <b class='leaderIcon'>组长</b>" +
                                    "       </div>" +
                                    "   </div>" +
                                    "</div>";
                            } else if (user_type == "3") {
                                studentInfo = "" +
                                    "<div class='row'>" +
                                    "   <div class='col-sm-8 col-xs-8 col-sm-offset-2 col-xs-offset-2'>" +
                                    "       <img style='margin-left: 25%;' src='../images/sex" + data.resultdata.sex + ".png'  class='studentPortrait'>" +
                                    "       <div class='studentInfo' user_type=" + data.resultdata.user_type + " id=" + data.resultdata.user_id + ">" +
                                    "           <span class='studentName' style='margin-left: 0px; line-height: 3rem'>" + data.resultdata.true_name + "</span>" +
                                    "       </div>" +
                                    "   </div>" +
                                    "</div>";
                            }


                            var studentAssess = "" +
                                "<div class='row' id='rollCallScoreBox' style='display:block;'>" +
                                "   <div class='col-sm-8 col-xs-8 col-sm-offset-2 col-xs-offset-2 text-center '>" +
                                "   <h4>请对本次问答评分</h4>" +
                                "   <div class='margin-top2'>" +
                                "       <div id='scoreList'>" +
                                "           <div class='scoreStars scoreStarsNot'></div>" +
                                "           <div class='scoreStars scoreStarsNot'></div>" +
                                "           <div class='scoreStars scoreStarsNot'></div>" +
                                "           <div class='scoreStars scoreStarsNot'></div>" +
                                "           <div class='scoreStars scoreStarsNot'></div>" +
                                "       </div>" +
                                "   </div>" +
                                "</div>" +
                                "</div>" +
                                "<div class=' text-center' style='text-align: center;'>" +
                                "   <div id='definiteRollCallBox2'>" +
                                "       <button type='button' class='btn btn-primary btn-lg' id='studentScoreBtn' data_num='1'>确&nbsp;&nbsp;定</button>" +
                                "   </div>" +
                                "</div>";

                            studentNowQuestionStr += studentInfo + studentAssess;

                            console.log(studentNowQuestionStr);
                            //被提问者的信息 end
                            $("#studentNowQuestionInfo").children().remove();
                            $("#studentNowQuestionInfo").append(studentNowQuestionStr);
                        }
                        else {
                            console.log("ddd");
                        }
                        // 用于更新当前是谁在答题 end




                    } else if (state == 2) {
                        // 当前课程下课
                        $("#classState").removeClass("btn-success").addClass("btn-primary").html("课程已结束").removeAttr("disabled").attr("state", "2");
                        var iaclass_id = sessionStorage.getItem("iaclass_id");
                        console.log(iaclass_id);
                        alert(iaclass_id);

                        //下课了获取当前课程的排名 start
                        if (iaclass_id != "" && iaclass_id != null && iaclass_id != "undefined") {
                            var ajaxobj = {
                                itype: "get",
                                iname: "class/classBeforeRoute/selectStudentList"
                            };
                            var actobj = {
                                "iaclass_id": iaclass_id,
                            };
                            getdata(ajaxobj, actobj, function (data) {
                                console.log(data);
                                {
                                    if (data.resultnum != "0000") {
                                        console.log("Error");
                                        return;
                                    } else {
                                        console.log("请求成功");
                                        var groupingListDataLength = data.resultdata.length;
                                        console.log("排名长度为 " + groupingListDataLength);
                                        if (groupingListDataLength >= 3) {

                                            var twoRanking = data.resultdata[1];
                                            var oneRanking = data.resultdata[0];
                                            var threeRanking = data.resultdata[2];

                                            var studentgoodActiveRankingBoxStr = "";

                                            studentgoodActiveRankingBoxStr +=
                                                "<div class='col-sm-4 goodActiveRanking'>" +
                                                "   <img src='../images/sex" + twoRanking.sex + ".png'  class='goodActiveImg'>" +
                                                "   <div class='goodActiveIcon'>" +
                                                "       <img src='../images/ranking2.png'>" +
                                                "   </div>" +
                                                "   <div>" + twoRanking.true_name + "</div>" +
                                                "   <div>" + twoRanking.avg_score + "分</div>" +
                                                "</div>" +
                                                "<div class='col-sm-4 goodActiveRanking oneRanking'>" +
                                                "   <img src='../images/sex" + oneRanking.sex + ".png' class='goodActiveImg'>" +
                                                "   <div class='goodActiveIcon'>" +
                                                "       <img src='../images/ranking1.png' >" +
                                                "   </div>" +
                                                "   <div>" + oneRanking.true_name + "</div>" +
                                                "   <div>" + oneRanking.avg_score + "分</div>" +
                                                "</div>" +
                                                "<div class='col-sm-4 goodActiveRanking'>" +
                                                "   <img src='../images/sex" + threeRanking.sex + ".png'  class='goodActiveImg'>" +
                                                "   <div class='goodActiveIcon'>" +
                                                "       <img src='../images/ranking3.png\'>" +
                                                "   </div>" +
                                                "   <div>" + threeRanking.true_name + "</div>" +
                                                "   <div>" + threeRanking.avg_score + "分</div>" +
                                                "</div>";
                                            //学科列表 end
                                            $("#studentGoodActiveRankingBox").children().remove();
                                            $("#studentGoodActiveRankingBox").append(studentgoodActiveRankingBoxStr);


                                        }

                                        //删除之前班级排名重新获取并添加到列表中；
                                        $("#studentSelectRankingList").children().remove();

                                        var studentSelectRankingListStr = "";
                                        //学生上课互动排名 start
                                        $.each(data.resultdata, function (index, item) {
                                            var sex = (item.sex == "1") ? "男" : (item.sex == "2") ? "女" : "未知";
                                            var index = index + 1;
                                            studentSelectRankingListStr +=
                                                "<tr>" +
                                                "   <td>" + index + "</td>" +
                                                "   <td>" + item.true_name + "</td>" +
                                                "   <td>" + sex + "</td>" +
                                                "   <td>" + item.put_count + "</td>" +
                                                "   <td>" + item.avg_score + "</td>" +
                                                "</tr>";


                                        });
                                        //学生上课互动排名 end
                                        $("#studentSelectRankingList").append(studentSelectRankingListStr);

                                        // 显示当前课程已结束
                                        $('#activeInfo').modal({keyboard: true});
                                    }
                                }
                            });
                        }
                        //下课了获取当前课程的排名 start

                        clearInterval(timer);
                    }
                }
                else {
                    console.log("Error");
                    return;
                }
            }
        });


    }, 4000);
}

// 学生正在上课中被提问的轮询 end

// 学生进行评分 start
$(document).on("click", "#studentScoreBtn", function (e) {
    // 获取用户对此次提问的评分星星个数
    var scoreListLength = $("#scoreList").children(".scoreStarsActive").length;
    console.log("scoreListLength" + scoreListLength);

    if (scoreListLength > 0) {
        var iacomment_content = "";
        var iacomment_roletype = $("#studentNowQuestionInfo .studentInfo ").attr("user_type");
        var iacomment_score = scoreListLength * 20;
        var iacomment_user_id = $("#studentNowQuestionInfo .studentInfo ").attr("id");
        var iaclass_id = sessionStorage.getItem("iaclass_id");

        var ajaxobj = {
            itype: "get",
            iname: "class/classBeforeRoute/inserTanswer"
        };
        var actobj = {
            "iacomment_content": iacomment_content,
            "iacomment_roletype": iacomment_roletype,
            "iacomment_score": iacomment_score,
            "iacomment_user_id": iacomment_user_id,
            "iaclass_id": iaclass_id,
        };
        getdata(ajaxobj, actobj, function (data) {
            console.log(data);
        });
        // 隐藏评价的按钮
        $("#definiteRollCallBox2").css("display", "none");
    } else {
        console.log("请对大学评价")
    }

});
// 学生进行评分 end

//学生下课后可以查看当前课程的排名 start
$(document).on("click", "#classState", function (e) {
    var stateVal = $(this).attr("state");
    console.log(stateVal);
    if (stateVal == "2")
        $('#activeInfo').modal({keyboard: true});
});
//学生下课后可以查看当前课程的排名 end

