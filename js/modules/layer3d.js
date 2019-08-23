/**
 *
 * 三维图层
 *
 */
define(["jquery", "cesium", "config", "map"], function (jquery, Cesium, config, map) {

    var layer3d = {

        sceneLayer: null,

        init: function () {
            var me = this;

        },

        /**
         * 唯一化模块标识
         */
        modulename: "layer3d",

        //根据url与name加载S3M图层
        LoadS3MTilesLayer: function (url, name, camera) {
            //根据名称进行判断，若名称已经存在则不再加载
            if (map.viewer.scene.layers.find(name) === undefined) {
                try {
                    //var promise = map.viewer.scene.addS3MTilesLayerByScp(url, {name: name});
                    var promise = map.viewer.scene.open(url);
                    // promise.then(function(layers){});
                    Cesium.when(promise, function (layer) {
                        //设置相机位置，定位至模型
                        map.viewer.camera.flyTo({
                            // 将经度、纬度、高度的坐标转换为笛卡尔坐标
                            destination: Cesium.Cartesian3.fromDegrees(camera.x, camera.y, camera.z ? camera.z : 2000),
                            orientation: {
                                heading: Cesium.Math.toRadians(0),
                                pitch: Cesium.Math.toRadians(-70),
                                roll: 0
                            }
                        });
                    }, function () {
                        var title = '加载SCP失败，请检查网络连接状态或者url地址是否正确？';
                        widget.showErrorPanel(title, undefined, e);
                    });
                } catch (e) {
                    if (widget._showRenderLoopErrors) {
                        var title = '渲染时发生错误，已停止渲染。';
                        widget.showErrorPanel(title, undefined, e);
                    }
                }
            }
        }
    };

    layer3d.init();
    return layer3d;

});
