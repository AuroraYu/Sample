'use strict';
define([
    'cesium',
    'map',
    'jquery'
], function (cesium, map, jquery) {

    var viewer = map.viewer,
        measureDist = null,
        measureHeight = null,
        measureArea = null;

    var measure = {
        // private method
        init: function () {
            // 注册距离测量的监听事件
            _initDistMeasure();

            // 注册高度测量的监听事件
            _initHeightMeasure();

            // 注册面积测量的监听事件
            _initAreaMeasure();
        },

        _clearAll: function () {
            measureDist && measureDist.clear();
            measureHeight && measureHeight.clear();
            measureArea && measureArea.clear();
        },

        _deactiveAll: function () {
            measureDist && measureDist.deactivate();
            measureHeight && measureHeight.deactivate();
            measureArea && measureArea.deactivate();
        },

        // public method
        // 单击测距按钮，初始化测距功能，并绑定监听事件
        activeMeasureDist: function () {
            this._deactiveAll();
            measureDist && measureDist.activate();
        },

        activeMeasureHeight: function () {
            this._deactiveAll();
            measureHeight && measureHeight.activate();
        },

        activeMeasureArea: function () {
            this._deactiveAll();
            measureArea && measureArea.activate();
        },

        clearAll: function () {
            this._clearAll();
        },

        modulename: 'measure'
    };

    function _initDistMeasure() {
        measureDist = new Cesium.MeasureHandler(viewer, Cesium.MeasureMode.Distance);
        measureDist.measureEvt.addEventListener(function (Distance) {
            var dis = Number(Distance.distance);
            var stringDist = _modifyLengthString(dis);
            measureDist.disLabel.text = '距离：' + stringDist;
            measureDist.clampMode = 0;
        });
        measureDist.activeEvt.addEventListener(function (isActive) {
            if (isActive === true) {
                viewer.enableCursorStyle = false;
                viewer._element.style.cursor = '';
                $('body').removeClass('measureCur').addClass('measureCur');
            } else {
                viewer.enableCursorStyle = true;
                $('body').removeClass('measureCur');
            }
        });
    }

    function _initHeightMeasure() {
        measureHeight = new Cesium.MeasureHandler(viewer, Cesium.MeasureMode.DVH);
        measureHeight.measureEvt.addEventListener(function (result) {
            var distance = _modifyLengthString(result.distance);
            var vHeight = _modifyLengthString(result.verticalHeight);
            var hDistance = _modifyLengthString(result.horizontalDistance);
            measureHeight.disLabel.text = '空间距离：' + distance;
            measureHeight.vLabel.text = '垂直高度：' + vHeight;
            measureHeight.hLabel.text = '水平距离：' + hDistance;
            measureDist.clampMode = 0;
        });
        measureHeight.activeEvt.addEventListener(function (isActive) {
            if (isActive === true) {
                viewer.enableCursorStyle = false;
                viewer._element.style.cursor = '';
                $('body').removeClass('measureCur').addClass('measureCur');
            } else {
                viewer.enableCursorStyle = true;
                $('body').removeClass('measureCur');
            }
        });
    }

    function _initAreaMeasure() {
        measureArea = new Cesium.MeasureHandler(viewer, Cesium.MeasureMode.Area);
        measureArea.measureEvt.addEventListener(function (result) {
            var mj = Number(result.area);
            var area = _modifyAreaString(mj);
            measureArea.areaLabel.text = '面积:' + area;
            measureDist.clampMode = 0;
        });
        measureArea.activeEvt.addEventListener(function (isActive) {
            if (isActive === true) {
                viewer.enableCursorStyle = false;
                viewer._element.style.cursor = '';
                $('body').removeClass('measureCur').addClass('measureCur');
            } else {
                viewer.enableCursorStyle = true;
                $('body').removeClass('measureCur');
            }
        });
    }

    function _modifyLengthString(length) {
        var numberValue = Number(length);
        return numberValue > 1000 ? (numberValue / 1000).toFixed(2) + 'km' : numberValue.toFixed(2) + 'm';
    }

    function _modifyAreaString(area) {
        var numberValue = Number(area);
        return numberValue > 1000000 ? (numberValue / 1000000).toFixed(2) + 'km²' : numberValue.toFixed(2) + '㎡';
    }

    measure.init();
    return {
        activeMeasureDist: function (type) {
            measure.activeMeasureDist();
        },
        activeMeasureHeight: function (type) {
            measure.activeMeasureHeight();
        },
        activeMeasureArea: function (type) {
            measure.activeMeasureArea();
        },
        clearAll: function (type) {
            measure.clearAll();
        }
    };
});