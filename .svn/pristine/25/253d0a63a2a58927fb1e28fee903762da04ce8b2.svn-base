// ================================================================
//  author:文霞
//  createDate: 2016/09/05
//  description: 统计图表组件 路由定义
//  ===============================================================
define(function (require) {
    "use strict";
    return Backbone.Router.extend({
        routes: {
            "": "overview",
            "overview": "overview",

            // 学生分组
            "personnelGrouping": "personnelGrouping",

        },
        goIndex: function (requirePath, operationType, currentId, jsonObject) {
            require([requirePath], function (view) {
                BasePluginsUTIL.initMenu();//根据当前路由修改菜单选中样式
                var viewObj = {model: {_opType: operationType, _currentId: currentId, _jsonObject: jsonObject}};
                var _view = new view(viewObj);
                $(".page-content").html(_view.$el);
                //设置中间内容区域屏幕的高度,中间内容区域层的class必须是page-content
                _view.afterRender();
            });
        },
        overview:function(){
            this.goIndex("pages/overview");
        },

        // 学生分组
        personnelGrouping:function(){
            this.goIndex("pages/personnelGrouping");
        }
    })
});