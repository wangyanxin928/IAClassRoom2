// ================================================================
//  author:文霞
//  createDate: 2017/05/09
//  description: 各个模块公用ajax
//  ===============================================================
define(['jquery'],
    function ($) {
        var baseUrl = "192.168.1.62:9001";//"192.168.1.13:8081";//"10.0.0.5";
        var publicAjax = {
            //ajaxUrl定义
            ajaxUrl: {
                /* =================author:byx  begin==========================*/
                /* 【会议管理】-----begin */
                //--查询会议人员列表
                getMeetUserList: "http://" + baseUrl + "/FmMeet/MeetManage/getMeetUserList",
                //--审核会议用户
                setMeetUserState: "http://" + baseUrl + "/FmMeet/MeetManage/setMeetUserState",

                /* =================author:shn  end==========================*/
            },
            //通用get接口【使用中】========================================================
            ajaxGet: function (url, params, _callback) {
                Pace.restart();
                var requsturl = url;
                if (!!params) {
                    requsturl = url + "?JSONPARAM=" + encodeURI(params);
                    requsturl += "&_n=" + Date.parse(new Date()) / 1000;
                }
                else {
                    requsturl += "?_n=" + Date.parse(new Date()) / 1000;
                }
                $.ajax({
                    type: "get",
                    url: requsturl,
                    data: {},
                    cache: false,
                    dataType: 'json',
                    contentType: "application/x-www-form-urlencoded",
                    success: function (response, status, xhr) {
                        if (response.resultnum === "0000") {
                            _callback(response); //模板获取后回调方法
                        }//2000表示数据为空
                        else {
                            BasePluginsUTIL.toastrAlert("error", "提示", "操作失败，请稍后再试");
                            console.log(JSON.stringify(data));
                        }
                    },
                    error: function () {
                        BasePluginsUTIL.toastrAlert("error", "提示", "操作失败，请稍后再试");
                    }
                });
            }
        };

        window.PublicAjax = publicAjax;
//     return publicAjax;
    });