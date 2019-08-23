/**
 *
 * 加载地图
 *
 */

define(["jquery", "cesium", "config", "map", "cache"], function (jquery, Cesium, config, map, cache) {

    var bim = {

        init: function () {
            var me = this;
            var BIMLayer = null;


            //点击查询
            map.viewer.pickEvent.addEventListener(function (feature) {
                console.log(feature);
            });
        },

        //返回异步Promise对象
        addBIMFromUrl: function (s3mUrl, dataUrl, cameraX, cameraY) {
            return new Promise(function (resolve, reject) {
                var promise = map.viewer.scene.open(s3mUrl);
                Cesium.when(promise, function (layers) {
                    //设置相机位置，定位至模型
                    map.viewer.camera.flyTo({
                        // 将经度、纬度、高度的坐标转换为笛卡尔坐标
                        destination: Cesium.Cartesian3.fromDegrees(cameraX, cameraY, 200),
                        orientation: {
                            heading: Cesium.Math.toRadians(0),
                            pitch: Cesium.Math.toRadians(-50),
                            roll: 0
                        }
                    });
                    for (var t = 0; t < layers.length; t++) {
                        var layer = layers[t];
                        layer.setQueryParameter({
                            url: dataUrl,
                            dataSourceName: layer.name.split('@')[1],
                            dataSetName: layer.name.split('@')[0],
                            keyWord: 'SmID'
                        });
                    }
                    resolve(layers);
                }, function () {
                    var title = '加载SCP失败，请检查网络连接状态或者url地址是否正确？';
                    widget.showErrorPanel(title, undefined, e);
                    reject(e);
                });
            });
        },
    };

    bim.init();

    return bim;
});