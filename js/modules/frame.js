/**
 *
 * @author ycz
 * @version 1.0.0
 * @date 2019-04
 * @Des 应用程序框架 *
 *
 */

define(["config", "jquery", "cache"], function (config, jquery, cache) {
    var frame = {
        //模块管理
        module: null,

        //初始化
        init: function () {

            var me = this;
            me.module = module;//将moude对象赋值给了对象内部的modul

            //去掉默认的contextmenu事件，禁止右键点击出现的上下文菜单
            document.oncontextmenu = function (e) {
                e.preventDefault();
            };

            //加载页面元素
            require(["text!html/toolbar.html", "css!html/toolbar.css"], function (toolbar) {
                $(document.body).append(toolbar);
            });


            //清除缓存
            cache.clear();
        },

        _setTitle: function () {
            var me = this;
            me.config = config;
            // 文档页面标题
            document.title = me.config.title;
        },

        _addmodules: function (modules) {
            //for (var i in modules) {

            //   this.module.add(modules[i], false);

            //}


            //this._render();
            var me = this;
            for (var i in modules) {
                require([modules[i]],
                    function (m) {
                        me.module.elments.push(m);
                    });
            }
        },

        /**
         *   expand by wxh
         *   返回指定名字module
         */
        getmodule: function (name) {

            var arr = this.module.elments;

            for (var i = 0; i < arr.length; i++) {

                var elment = arr[i];
                if (elment.modulename === name) {

                    return elment;

                }

            }

        },


    };

    var module = {
        items: [],

        /**add by wxh
         * 存储各个专题module
         */
        elments: [],

        /**
         * [add description]新增模块
         * @param {[type]} n   [description] 模块名次
         * @param {[type]} s [description] 模块状态
         */
        add: function (n, s) {

            this.items.push({name: n, status: s});

        },

        /**
         * [remove description]删除模块
         * @param  {[type]} n [description]
         * @return {[type]}      [description]
         */
        remove: function (n) {
            for (var m in this.items) {
                if (this.items[m].name === n) {
                    this.items.pop(this.items[m]);
                }
            }
        }

    };

    frame.init();

    return {
        /**
         * 框架运行
         * @return {[type]}
         */
        run: function () {

            // 设置程序标题
            frame._setTitle();

        },

        /**
         * [module description]设置模块
         * @param  {[type]} modules [description] 模块名次
         * @return {[type]}         [description]
         */
        addmodules: function (modules) {
            frame._addmodules(modules);
        }
    };

});