/**
 * Created by bainiu on 2017-03-28 16:58:00.
 */

var $writelog = require('../libs/logHelper');
var sillyDatetime = require('silly-datetime');//日期时间三方库
var path = require('path');
var fs = require('fs');
var crypto = require('crypto');

module.exports = {
    extend: function (target, source, flag) {
        for (var key in source) {
            if (source.hasOwnProperty(key))
                flag ?
                    (target[key] = source[key]) :
                    (target[key] === void 0 && (target[key] = source[key]));
        }
        return target;
    },
    resConfig: {
        ok: "0000",
        fail: "1111"
    },
    resJSON: {
        resultnum: "0000",
        resultdata: {}
    },
    resJSONError: function (error, res, errInfo) {//catch异常之后的友好返回
        if (error) {
            console.error(error.stack);
            $writelog.helper.writeErr("错误信息：" + error.stack);
        }
        if (errInfo !== undefined) {
            error = {};
            error.message = errInfo;
        }
        res.json({
            resultnum: "1111",
            resultdata: error.message
        });
    },
    GUID: function () {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                guid += "-";
        }
        return guid;
    },
    //生成随机数 length代表长度
    random: function (length) {
        return Math.floor((Math.random() * 9 + 1) * 100000);
    },
    getDateTime: function () {
        var time = sillyDatetime.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        return time;
    },
    getYear: function () {
        var time = sillyDatetime.format(new Date(), 'YYYY');
        return time;
    },
    wxConfig: {
        token: "ansenun",
        appId: "wx9903a3c0df7671e0",
        appsecret: "2d66baf4d4d91cd8ad4c6ff482dbf182",
        accessToken: ""
    },

    isNull: function (param) {//判断对象是否为空
        if (typeof(param) == "undefined") {
            return true;
        }
        if (param == null) {
            return true;
        }
        if (param == "") {
            return true;
        }
        return false;
    },
    strArrayToString: function (arr) {//数组转字符串
        var resultStr = "";
        arr.forEach(function (item, index) {
            resultStr += "'" + item + "',";
        })
        resultStr = resultStr.length > 0 ? resultStr.substring(0, resultStr.length - 1) : "";
        return resultStr;
    },
    /**
     * json格式转树状结构
     * @param {json} json数据
     * @param {String} id的字符串
     * @param {String} 父id的字符串
     * @param {String} children的字符串
     * @return {Array} 数组
     */
    transTreeData: function (a, idStr, pidStr, chindrenStr) {
        var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length;
        for (; i < len; i++) {
            hash[a[i][id]] = a[i];
        }
        for (; j < len; j++) {
            var aVal = a[j], hashVP = hash[aVal[pid]];
            if (hashVP) {
                !hashVP[children] && (hashVP[children] = []);
                hashVP[children].push(aVal);
            } else {
                r.push(aVal);
            }
        }
        return r;
    },
    /**
     * MD5加密
     * @param data
     * @returns {*}
     */
    md5: function (data) {
        return crypto.createHash('md5').update(data).digest('hex');
    },


    /**
     * 生成指定位数的随机数（生成的可能有字母和数字）返回生成的字符串
     * @param len：生成几位的随机数
     */
    createRandomStr: function (len) {
        len = len || 32;
        var $chars = 'abcdefhijkmnprstwxyz0123456789';
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },

    /**
     * 生成指定位数的随机数（只生成数字）,返回生成的字符串数字
     * @param num：生成几位的随机数
     */
    createRandomNum: function (num) {
        var numStr = "";
        for (var i = 0; i < num; i++) {
            numStr += Math.floor(Math.random() * 10);
        }
        return numStr;
    },

    axtUrl: {
        organUrl: "http://113.208.118.178:58080/df/api/orgList.html?key=0ed32fb9d6e73feab7fd5233a345f741&time=1496285871494&apply_id=6FA61BC952D14EEF99AAD8C4FC9A917A",
        schoolUrl: "http://113.208.118.178:58080/df/api/schoolList.html?key=0ed32fb9d6e73feab7fd5233a345f741&time=1496285871494&apply_id=6FA61BC952D14EEF99AAD8C4FC9A917A",
        classUrl: "http://113.208.118.178:58080/df/api/classList.html?key=0ed32fb9d6e73feab7fd5233a345f741&time=1496285871494&apply_id=6FA61BC952D14EEF99AAD8C4FC9A917A",
        teacherUrl: "http://113.208.118.178:58080/df/api/teacherList.html?key=0ed32fb9d6e73feab7fd5233a345f741&time=1496285871494&apply_id=6FA61BC952D14EEF99AAD8C4FC9A917A",
        studentUrl: "http://113.208.118.178:58080/df/api/studentList.html?key=0ed32fb9d6e73feab7fd5233a345f741&time=1496285871494&apply_id=6FA61BC952D14EEF99AAD8C4FC9A917A",
        parentUrl: "http://113.208.118.178:58080/df/api/parentList.html?key=0ed32fb9d6e73feab7fd5233a345f741&time=1496285871494&apply_id=6FA61BC952D14EEF99AAD8C4FC9A917A",
        loginCheckUrl: "http://gzdf.account.aixueyun.cn/sso/check_tk",
        loginUrl: "http://gzdf.account.aixueyun.cn/sso/othersUserinfo"
    },
    /*测试参数
     pkey: "6D07A7A805F069045C79137D1801C45C",
     apply_id: "6FA61BC952D14EEF99AAD8C4FC9A917A"*/
    /*正式参数*/
    axtParam: {
        pkey: "443ACD61E10ED13AE9554449C295B1EC",
        apply_id: "43FFBE7CC0A75E0D"
    }

}