/**
 *
 * 界面工具
 *
 */

define(["jquery", "cesium", "config", "map", "bootstrap", "layer3d", "bootstrapswitch", "cache", "bim"], function (jquery, Cesium, config, map, bootstrap, layer3d, bootstrapswitch, cache, bim) {

    var widgets = {
        _floorLayerCheck: false,
        _layerShowCheck: [],
        _treeData: null,
        _sidebar: false,
        _nodeData: null,
        _activemodel: [],
        _handlerPolygon: null,
        _nodeActive: false,

        init: function () {
            var me = this;
            /**
             *
             * 地图切换
             *
             */

            $('#maplist li a').click(function () {
                var tag = $(this).prop('id');
                map.changeMap(tag);
                $('.dropdown-toggle:eq(0)').dropdown('toggle');
            });

            //测量工具
            $('#measureDist').click(function () {
                require(['measure'], function (measure) {
                    measure.activeMeasureDist();
                });
            });
            $('#measureHeight').click(function () {
                require(['measure'], function (measure) {
                    measure.activeMeasureHeight();
                });
            });
            $('#measureClean').click(function () {
                require(['measure'], function (measure) {
                    measure.clearAll();
                });
            });

            //返回默认视图
            $('#flyHome').click(function () {
                map.viewer.camera.flyHome();
            });

            //重置视角
            $('#rejustcamera').click(function () {
                var destination = map.viewer.camera.position;
                map.viewer.camera.flyTo({
                    // 将经度、纬度、高度的坐标转换为笛卡尔坐标
                    //destination: Cesium.Cartesian3.fromDegrees(cameracenter.x, cameracenter.y, cameracenter.z ? cameracenter.z : 2000),
                    destination: destination,
                    orientation: {
                        heading: Cesium.Math.toRadians(0),
                        pitch: Cesium.Math.toRadians(-90),
                        roll: 0
                    }
                });
            });

            /**
             *
             * 图层管理控件
             *
             */

            $(".checkbox-menu").on("change", "input[type='checkbox']", function () {
                $(this).closest("li").toggleClass("active", this.checked);
            });
            $(document).on('click', '.allow-focus', function (e) {
                e.stopPropagation();
            });

            /**
             *
             * 控制组件
             *
             */

            $(document.body).append('<div class="BtnContainer"><button class="btn btn-default tiltPhotography">加载倾斜影像</button><button class="btn btn-default BIM">加载BIM</button></div>');
            $('.BtnContainer').css({
                "position": 'fixed',
                'left': '10px',
                'top': '10px'
            });

            /**
             *
             * 功能区域
             *
             */

            //倾斜相关
            //倾斜摄影
            $('.tiltPhotography').click(function () {
                //清除所有图层
                map.viewer.scene.layers.removeAll();
                layer3d.LoadS3MTilesLayer("http://47.97.163.110:8090/iserver/services/3D-WaiTaiCity/rest/realspace", "wantai", {
                    'X': 120.189,
                    'y': 30.2257,
                    'z': 2000
                });
            });

            //BIM加载
            $('.BIM').click(function () {
                //清除所有图层
                map.viewer.scene.layers.removeAll();
                var promise = bim.addBIMFromUrl("http://47.97.163.110:8090/iserver/services/3D-WTC/rest/realspace", "http://47.97.163.110:8090/iserver/services/data-WTC/rest/data", 120.188, 30.231);
                promise.then(function (layers) {
                    //将BIM图层存入缓存
                    cache.put('BIMlayers', layers);

                    //BIM透明度控制
                    $('#TotalAlpha').bind('input propertychange', function () {
                        var alpha = $(this).val();
                        for (var k in layers) {
                            if (layers[k].name.split('@')[0] === 'stair') {
                                continue;
                            }
                            layers[k].style3D.fillForeColor = new Cesium.Color(1.0, 1.0, 1.0, alpha);
                        }
                    });

                    $('.bimtoolbar .panel-body').append('<hr style="height: 1px;background-color: black;"/><div id="layersList"></div>');
                    var $layersList = $('.bimtoolbar #layersList');
                    var html = '<ul>';
                    for (var b = 0; b < layers.length; b++) {
                        var name = layers[b].name.split('@')[0];
                        html += '<li class=><label><input type="checkbox" layerindex="' + b + '" checked="checked">' + name + '</label></li>';
                    }
                    html += '</ul>';
                    $layersList.append(html);
                    //图层控制
                    $('.bimtoolbar #layersList input[type="checkbox"]').change(function () {
                        var checked = $(this).prop("checked");
                        var layerindex = $(this).attr("layerindex");
                        if (checked) {
                            layers[layerindex].visible = true;
                        } else {
                            layers[layerindex].visible = false;
                        }
                    });
                }, function (e) {
                    //promise回调异常
                });
            });


            //初始化控件
            $('#toolbar').show();
        },

        /**
         * 唯一化模块标识
         */
        modulename: "widgets",
    };

    widgets.init();
    return widgets;

});