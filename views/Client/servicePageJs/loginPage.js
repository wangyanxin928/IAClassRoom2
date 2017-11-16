// 登陆页面 start
// 教师登陆 start
$("#teacherLogin").click(function (e) {
    sessionStorage.clear();
    var user_name = $("#user_name").val();
    console.log(user_name);
    if (user_name != "" && user_name != null && user_name != "undefined") {
        var ajaxobj = {
            itype: "get",
            iname: "user/userRoute/userLogin"
        };
        var actobj = {"user_name": user_name,};
        getdata(ajaxobj, actobj, function (data) {
            console.log(data);
            if (data.resultdata == "0") {
                $("#user_name").attr("data-content", "用户不存在请查看是否正确");
                $("#user_name").popover('show');
                setTimeout(function (e) {
                    $("#user_name").popover('hide');
                    $("#user_name").attr("data-content", "");
                }, 2000);
            } else {
                if (data.resultnum != "0000") {
                    console.log("Error");
                    return;
                } else {

                    console.log("请求成功");
                    console.log(data.resultdata.role_name);

                    // 存储到缓存 start
                    sessionStorage.setItem("user_id", data.resultdata.user_id);//用户编号
                    sessionStorage.setItem("user_name", data.resultdata.user_name);//用户名称
                    sessionStorage.setItem("true_name", data.resultdata.true_name);//真实姓名
                    sessionStorage.setItem("role_name", data.resultdata.role_name);//角色名称
                    sessionStorage.setItem("server_id", data.resultdata.server_id);//所属机构Id
                    sessionStorage.setItem("sex", data.resultdata.sex);//用户性别
                    // 存储到缓存 end

                    var server_id = data.resultdata.server_id;
                    var role_name = data.resultdata.role_name;

                    if (role_name == "教师") {
                        console.log("教师登陆");
                        window.location.href = 'newClassHistpryClass.html';
                    } else {
                        console.log("学生登陆");
                        window.location.href = "studentClassHistpry.html";
                    }
                }
            }
        });
    } else {
        $("#user_name").attr("data-content", "用户名/手机号不能为空");
        $("#user_name").popover('show');
        setTimeout(function (e) {
            $("#user_name").popover('hide');
            $("#user_name").attr("data-content", "");
        }, 2000);
    }
});
// 教师登陆 end

// 学生登陆 start
$("#studentLogin").click(function (e) {
    sessionStorage.clear();
    var user_name = $("#user_name").val();
    console.log(user_name);
    sessionStorage.setItem("user_name", user_name);

});
// 学生登陆 end


// 登陆页面 end