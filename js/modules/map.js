/**
 *
 * 加载地图
 *
 */

define(["jquery", "cesium", "config"], function (jquery, Cesium, config) {

    var map = {

        viewer: null,
        _TDTvecLayer: null,
        _TDTcvaLayer: null,
        _TDTimgLayer: null,
        _TDTciaLayer: null,
        _bingvecLayer: null,
        _bingimgLayer: null,
        _bingciaLayer: null,
        _mapboxDarkLayer: null,
        _mapboxLightLayer: null,
        _mapboxStreetLayer: null,
        _mapboxSatelliteWithLabelLayer: null,
        _mapboxSatelliteLayer: null,
        _TDTvec: null,
        _TDTcva: null,
        _TDTimg: null,
        _TDTcia: null,
        _bingvec: null,
        _bingimg: null,
        _bingcia: null,
        _mapboxDark: null,
        _mapboxLight: null,
        _mapboxStreet: null,
        _mapboxSatelliteWithLabel: null,
        _mapboxSatellite: null,

        init: function () {
            var me = this;
            me._layerArray = [];

            me.viewer = new Cesium.Viewer('cesiumContainer', {
                baseLayerPicker: false, //是否显示图层选择控件
                geocoder: false, //是否显示地名查找控件
                sceneModePicker: false, //是否显示投影方式控件
                timeline: false, //是否显示时间线控件
                fullscreenButton: false,
                animation: false, //是否显示动画控件
                infoBox: false //是否显示信息框
                //navigation:false //罗盘控件
            });

            //移除SuperMap Logo
            var credit = me.viewer.scene.frameState.creditDisplay;
            credit.container.removeChild(credit._imageContainer);
            credit.container.removeChild(credit._textContainer);
            //修改罗盘
            $('.sm-zoom').remove();
            $('.cesium-viewer-navigationContainer').css({
                'height': 'auto',
                'width': 'auto',
                'bottom': 0,
                'left': 'auto',
                'top': 'auto',
                'right': '0'
            });
            $('.sm-compass').css({
                'bottom': '10px',
                'right': '10px',
                'top': 'auto'
            });
            //设置home键坐标
            var rectangle = Cesium.Rectangle.fromDegrees(120, 30.1, 120.5, 30.4);
            Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
            Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;
            //初始地图位置
            me.viewer.camera.flyTo({
                destination: rectangle
            });
            //相机设置
            me.viewer.scene.screenSpaceCameraController.minimumZoomDistance = 0; //相机的高度的最小值
            me.viewer.scene.screenSpaceCameraController.maximumZoomDistance = 22000000; //相机高度的最大值
            me.viewer.scene.screenSpaceCameraController._minimumZoomRate = 30000; // 设置相机缩小时的速率
            me.viewer.scene.screenSpaceCameraController._maximumZoomRate = 5906376272000; //设置相机放大时的速率
            //允许开挖
            me.viewer.scene.undergroundMode = true;
            //me.viewer.scene.globe.show = false;
            //me.viewer.scene.globe.globeAlpha = 0.3;

            //设置默认场景渲染亮度

            //加载国家天地图矢量
            var TDTvecUrl = 'http://{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=' + config.tdtkey;
            me._TDTvec = new Cesium.WebMapTileServiceImageryProvider({
                url: TDTvecUrl,
                layer: 'vec',
                style: 'default',
                format: 'tiles',
                subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
                tileMatrixSetID: 'w',
                // tileMatrixLabels : ['default028mm:0', 'default028mm:1', 'default028mm:2' ...],
                minimumLevel: 0,
                maximumLevel: 18,
                credit: new Cesium.Credit('数据来源：国家地理信息公共服务平台')
            });
            //加载国家天地图矢量注记
            var TDTcvaUrl = 'http://{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=' + config.tdtkey;
            me._TDTcva = new Cesium.WebMapTileServiceImageryProvider({
                url: TDTcvaUrl,
                layer: 'cva',
                style: 'default',
                format: 'tiles',
                subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
                tileMatrixSetID: 'w',
                // tileMatrixLabels : ['default028mm:0', 'default028mm:1', 'default028mm:2' ...],
                minimumLevel: 0,
                maximumLevel: 18,
                credit: new Cesium.Credit('数据来源：国家地理信息公共服务平台')
            });
            //加载天地图影像
            var TDTimgUrl = 'http://{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=' + config.tdtkey;
            me._TDTimg = new Cesium.WebMapTileServiceImageryProvider({
                url: TDTimgUrl,
                layer: 'img',
                style: 'default',
                format: 'tiles',
                subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
                tileMatrixSetID: 'w',
                // tileMatrixLabels : ['default028mm:0', 'default028mm:1', 'default028mm:2' ...],
                minimumLevel: 0,
                maximumLevel: 18,
                credit: new Cesium.Credit('数据来源：国家地理信息公共服务平台')
            });
            //加载天地图影像注记
            var TDTciaUrl = 'http://{s}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=' + config.tdtkey;
            me._TDTcia = new Cesium.WebMapTileServiceImageryProvider({
                url: TDTciaUrl,
                layer: 'cia',
                style: 'default',
                format: 'tiles',
                subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
                tileMatrixSetID: 'w',
                // tileMatrixLabels : ['default028mm:0', 'default028mm:1', 'default028mm:2' ...],
                minimumLevel: 0,
                maximumLevel: 18,
                credit: new Cesium.Credit('数据来源：国家地理信息公共服务平台')
            });

            /**
             *
             * bing map setting
             *
             */

            me._bingvec = new Cesium.BingMapsImageryProvider({
                url: 'https://dev.virtualearth.net',
                key: config.bingkey,
                culture: 'zh-Hans',
                mapStyle: 'RoadOnDemand'
            });

            me._bingimg = new Cesium.BingMapsImageryProvider({
                url: 'https://dev.virtualearth.net',
                key: config.bingkey,
                culture: 'zh-Hans',
                mapStyle: 'Aerial'
            });

            /**
             *
             * mapbox map setting
             *
             mapbox.streets 道路矢量带标注地形
             mapbox.streets-basic 道路矢量带标注无地形
             mapbox.satellite  卫星影像无标注
             mapbox.streets-satellite  卫星影像带标注
             mapbox.outdoors  地形与等高线
             //以下为特殊配色
             mapbox.emerald
             mapbox.light
             mapbox.dark
             mapbox.wheatpaste
             mapbox.comic
             mapbox.run-bike-hike
             mapbox.pencil
             mapbox.pirates
             mapbox.high-contrast
             *
             */
            me._mapboxDark = new Cesium.MapboxImageryProvider({
                mapId: 'mapbox.dark',
                accessToken: config.mapboxkey
            });

            me._mapboxLight = new Cesium.MapboxImageryProvider({
                mapId: 'mapbox.light',
                accessToken: config.mapboxkey
            });
            me._mapboxStreet = new Cesium.MapboxImageryProvider({
                mapId: 'mapbox.streets',
                accessToken: config.mapboxkey
            });
            me._mapboxSatelliteWithLabel = new Cesium.MapboxImageryProvider({
                mapId: 'mapbox.streets-satellite',
                accessToken: config.mapboxkey
            });
            me._mapboxSatellite = new Cesium.MapboxImageryProvider({
                mapId: 'mapbox.satellite',
                accessToken: config.mapboxkey
            });

            //初始化图层
            me._mapboxStreetLayer = me.viewer.imageryLayers.addImageryProvider(me._mapboxStreet);
            //ColorCorrection类
            // me._mapboxStreetLayer.brightness = 1.0;

        },

        /**
         * 唯一化模块标识
         */
        modulename: "map",

        /**
         * 私有方法
         */

        //切换地图
        _changeMap: function (value) {
            var mapArray = [map._TDTimgLayer,
                map._TDTciaLayer,
                map._bingvecLayer,
                map._bingimgLayer,
                map._TDTvecLayer,
                map._TDTcvaLayer,
                map._mapboxStreet,
                map._mapboxDarkLayer,
                map._mapboxLightLayer,
                map._mapboxStreetLayer,
                map._mapboxSatelliteWithLabelLayer,
                map._mapboxSatelliteLayer
            ];

            map._removeLayer(mapArray);
            switch (value) {
                case 'tdtvec':
                    map._TDTvecLayer = map._addLayer(map._TDTvec, map._TDTvecLayer);
                    map._TDTcvaLayer = map._addLayer(map._TDTcva, map._TDTcvaLayer);
                    break;
                case 'tdtimg':
                    map._TDTimgLayer = map._addLayer(map._TDTimg, map._TDTimgLayer);
                    map._TDTciaLayer = map._addLayer(map._TDTcia, map._TDTciaLayer);
                    break;
                case 'bingvec':
                    map._bingvecLayer = map._addLayer(map._bingvec, map._bingvecLayer);
                    break;
                case 'bingimg':
                    map._bingimgLayer = map._addLayer(map._bingimg, map._bingimgLayer);
                    break;
                case 'mapboxDark':
                    map._mapboxDarkLayer = map._addLayer(map._mapboxDark, map._mapboxDarkLayer);
                    break;
                case 'mapboxLight':
                    map._mapboxLightLayer = map._addLayer(map._mapboxLight, map._mapboxLightLayer);
                    break;
                case 'mapboxvec':
                    map._mapboxStreetLayer = map._addLayer(map._mapboxStreet, map._mapboxStreetLayer);
                    break;
                case 'mapboximg':
                    map._mapboxSatelliteWithLabelLayer = map._addLayer(map._mapboxSatelliteWithLabel, map._mapboxSatelliteWithLabelLayer);
                    break;
                case 'mapboximgNOLABEL':
                    map._mapboxSatelliteLayer = map._addLayer(map._mapboxSatellite, map._mapboxSatelliteLayer);
                    break;
            }
        },

        //关闭注记层
        _disableAnno: function (boolean) {

        },

        //移除图层
        _removeLayer: function (layer) {
            if (Array.isArray(layer)) {
                for (var m in layer) {
                    if (layer[m]) {
                        map.viewer.imageryLayers.remove(layer[m], false);
                    }
                }
            } else {
                if (layer) {
                    map.viewer.imageryLayers.remove(layer, false);
                }
            }
        },

        //添加图层
        _addLayer: function (provider, layer) {
            if (layer) {
                map.viewer.imageryLayers.add(layer);
            } else {
                return map.viewer.imageryLayers.addImageryProvider(provider);
            }
            return layer
        },

        //判定对象是否为空
        _objEmpty: function (obj) {
            for (var i in obj) {
                // 如果不为空，则会执行到这一步，返回true
                return true;
            }
            // 如果为空,返回false
            return false;
        }
    };

    map.init();

    return {
        viewer: map.viewer,
        changeMap: function (type) {
            map._changeMap(type);
        },
        disableAnno: function (boolean) {
            map._disableAnno(boolean);
        }
    }
});