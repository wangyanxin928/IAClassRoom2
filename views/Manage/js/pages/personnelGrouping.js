// ================================================================
//  author:文霞
//  createDate: 2016/09/06
//  description: 基础组件——表单验证
//  ===============================================================
define(function (require) {
    "use strict";
    var tpl = require('text!tpl/personnelGrouping.html'),
        template = _.template(tpl), _this;
    return Backbone.View.extend({
      	className:"",//如果不添加会document中多一级div
        initialize: function () {
            _this = this;
            this.render();
        },
        render: function () {
            this.$el.html(template(this.model));
            return this;
        },
        afterRender:function(){

        },
        events: {

        }
    });
});