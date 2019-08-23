/**
 *
 * 核心部分功能
 *
 */
define(["cesium", "map"], function (Cesium, map) {

    var core = {

        init: function () {

            //拾取坐标
            var ellipsoid = map.viewer.scene.globe.ellipsoid;
            var handler = new Cesium.ScreenSpaceEventHandler(map.viewer.scene.canvas);
            handler.setInputAction(function (e) {
                //拾取二维坐标
                // var cartesian = map.viewer.camera.pickEllipsoid(e.position, ellipsoid);
                // if (cartesian) {
                //     var cartographic = ellipsoid.cartesianToCartographic(cartesian);
                //     var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
                //     var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
                //     console.log('拾取坐标 X:' + longitudeString + ' Y:' + latitudeString);
                // } else {
                //     console.log('未拾取到坐标');
                // }

                //拾取三维坐标
                var cartesian = map.viewer.scene.pickPosition(e.position);
                if (cartesian) {
                    var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                    var lon = Cesium.Math.toDegrees(cartographic.longitude);
                    var lat = Cesium.Math.toDegrees(cartographic.latitude);
                    var height = cartographic.height;
                    console.log('拾取坐标 X:' + lon + ' Y:' + lat + ' Height:' + height);
                } else {
                    console.log('未拾取到坐标');
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        },

        /**
         * 唯一化模块标识
         */
        modulename: "core",

    };

    core.init();
    return core;

});
