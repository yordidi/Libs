/**
 * 继承
 */

(function(global, factory) {
    if (typeof define === "function" && define.amd) define(factory);
    else if (typeof module === "object") module.exports = factory();
    else global.augment = factory();
}(this, function() {
    "use strict";

    var Factory = function() {};
    var slice = Array.prototype.slice;
    //继承
    var augment = function(base, body) {
        var uber = Factory.prototype =
            typeof base === "function" ? base.prototype : base,
            prototype = new Factory,
            properties = body.apply(prototype, slice.call(arguments, 2)
                .concat(uber));

        if (typeof properties === "object") {
            //拷贝继承
            for (var key in properties) {
                prototype[key] = properties[key];
            }
        }
        if (!prototype.hasOwnProperty("constructor")) {
            return prototype;
        }
        //修正constructor指向
        var constructor = prototype.constructor,
            constructor.prototype = prototype;

        return constructor;
    };

    augment.defclass = function(prototype) {
        var constructor = prototype.constructor;
        constructor.prototype = prototype;
        return constructor;
    };

    augment.extend = function(base, body) {
        return augment(base, function(uber) {
            this.uber = uber;
            return body;
        });
    };

    return augment;
}));