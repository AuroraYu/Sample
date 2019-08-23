/**
 *
 * @author ycz
 * @version 1.0.0
 * @date 2019-04
 *
 */


require.config({

    baseUrl: 'js/modules',
    paths: {
        'jquery': '../lib/jquery-3.3.1.min',
        'bootstrap': '../lib/bootstrap.min',
        'bootstrapswitch': '../lib/bootstrap-switch.min',
        'treeview': '../lib/bootstrap-treeview.min',
        'sha256': '../lib/sha256',
        'text': '../lib/text',
        'css': '../lib/css',
        'cesium': '../Cesium/Cesium',
        'SuperMap': '../lib/supermap/SuperMap-8.1.1-14426'
    },
    waitSeconds: 0,
    map: {
        '*': {
            'css': '../lib/css'
        }
    },
    shim: {
        'bootstrap': {
            deps: ['jquery', 'css!../lib/bootstrap.min.css'],
            exports: 'bootstrap'
        },
        'bootstrapswitch': {
            deps: ['jquery', 'bootstrap', 'css!../lib/bootstrap-switch.min.css'],
            exports: 'bootstrapswitch'
        },
        'treeview': {
            deps: ['jquery', 'bootstrap', 'css!../lib/bootstrap-treeview.min.css'],
            exports: 'treeview'
        },
        'cesium': {
            deps: ['css!../Cesium/Widgets/widgets.css'],
            exports: 'Cesium'
        },
        'SuperMap': {
            deps: ['cesium'],
            exports: 'SuperMap'
        }
    }
});

require(['frame'], function (frame) {
    // summary:
    // 程序框架
    // description:
    // 程序框架

    var app = {
        /**
         * 初始化方法
         * @return {[type]}
         */
        init: function () {
            frame.run();
            frame.addmodules(["map", "widgets", "layer3d", "core", "bim"]);
        },
    };
    app.init();
});