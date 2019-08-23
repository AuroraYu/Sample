/**
 *
 * 前端数据缓存对象
 *
 */
define([], function () {
    // summary:
    // 应用程序缓存

    // description:
    // 应用程序缓存
    var cache = {
        //缓存
        _data: null,

        //初始化缓存
        init: function () {
            this._data = [];
        },

        //缓存对象大小
        size: function () {
            return this._data.length;
        },

        //清空缓存
        clear: function () {
            this._data = [];
        },

        //是否包含缓存对象
        contain: function (key) {
            var flag = false;
            try {
                for (var i = 0; i < this._data.length; i++) {
                    if (this.equal(this._data[i].key, key)) {
                        flag = true;
                    }
                }
            } catch (e) {
                flag = false;
            }
            return flag;
        },

        //判断两项是否相等
        equal: function (key1, key2) {
            var flag = true;
            for (var attr in key1) {
                if (key1[attr] !== key2[attr]) {
                    flag = false;
                }
            }
            return flag;
        },

        //获取缓存对象
        get: function (key) {
            var item = null;
            try {
                for (var i = 0; i < this._data.length; i++) {
                    if (this.equal(this._data[i].key, key)) {
                        item = this._data[i].value;
                        break;
                    }
                }
            } catch (e) {
                return null;
            }

            return item;
        },

        //传入缓存对象
        put: function (key, value) {
            if (!this.contain(key)) {
                this._data.push({key: key, value: value});
            } else {
                this.remove(key);
                this.put(key, value);
            }
        },

        //删除缓存对象
        remove: function (key) {
            var flag = false;
            try {
                for (var i = 0; i < this._data.length; i++) {
                    if (this.equal(this._data[i].key, key)) {
                        this._data.splice(i, 1);
                        flag = true;
                    }
                }
            } catch (e) {
                flag = false;
            }
            return flag;
        }
    };

    cache.init();

    return cache;
});
