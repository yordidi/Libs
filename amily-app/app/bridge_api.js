var $ = require("zepto");
var bridge = require("./bridge.js");
var VERSION = 2700;
var timeout = function(deferred,time){
    return setTimeout(function(){
        deferred.reject();
    },time || 20000);
}
var wrapper = function(data){
    if (typeof data == "string") {
        return JSON.parse(data);
    }
    return data;
}
var wrapper_params = function(obj){
    return obj;
}
if (bridge.isAndroid) {
    wrapper_params = function(obj){
        var type = $.type(obj);
        if (type == "null" || type == "undefined") {
            return "";
        }
        if (type ==="string") {
            return obj;
        }
        if (type === "object") {
            return JSON.stringify(obj);
        }
    }
}
var method = {
    //检查用户是否登录 如果没有登录 到登录页，登录成功后会跳到url

    isLogin : function(cb){
        var deferred = $.Deferred();
        var t = timeout(deferred);
        bridge.callHandler("isLogin","",function(data,responseCallback){
            if (t) clearTimeout(t);
            if (data) {
                var _d = wrapper(data);
                if (_d.ret == 0) {
                    deferred.resolve(_d,responseCallback);
                } else {
                    deferred.reject(_d,responseCallback);
                }
            } else {
                deferred.reject({ret:1},responseCallback);
            }
        });
        return deferred.promise();
    },
    login  : function(){
        var deferred = $.Deferred();
        bridge.callHandler("login","",function(data ,responseCallback){
            if (data) {
                deferred.resolve(wrapper(data),responseCallback);
            } else {
                deferred.reject();
            }
        });
        return deferred.promise();
    },
    //取用户信息
    getUserInfo : function(){
        var deferred = $.Deferred();
        var t = timeout(deferred);
        bridge.callHandler("getUserInfo","",function(data,responseCallback){
            if (t) clearTimeout(t);
            deferred.resolve(wrapper(data),responseCallback);
        });
        return deferred.promise();
    },
    //取用户信息
    getCityID : function(){
        var deferred = $.Deferred();
        var t = timeout(deferred);
        bridge.callHandler("getCityID","",function(data,responseCallback){
            if (t) clearTimeout(t);
            deferred.resolve(wrapper(data),responseCallback);
        });
        return deferred.promise();
    },
    // 新开一个webview 层 跳转webview 加载url 页面
    go2Url : function(url){
        bridge.callHandler("go2Url",url);
    },
    //跳转到一个商品
    goPrd : function(id){
        bridge.callHandler("goPrd",""+id);
    },
    //跳转到商店
    goShop : function(id){
        bridge.callHandler("goShop",""+id);
    },
    //跳转到转专题
    goAlbum : function(id){
        bridge.callHandler("goAlbum",""+id);
    },
    goHome :  function(){
        bridge.callHandler("goHome");
    },
    goUserCenter : function(){
        bridge.callHandler("goUserCenter");
    },

    //分享接口
    share : function(share_obj){
        var deferred = $.Deferred();
        var t = timeout(deferred);
        bridge.callHandler("share",wrapper_params(share_obj),function(data,responseCallback){
            if (t) clearTimeout(t);
            deferred.resolve(wrapper(data),responseCallback);
        });
        return deferred.promise();
    },
    //微信支付
    // data : {
    //  url : string  支付成功后跳转的页面
    // }
    payPass : function(type,pay_way,url){
        var deferred = $.Deferred();
        var t = timeout(deferred);
        bridge.callHandler("buyPass",wrapper_params({passid:type , payMethod:pay_way, url : url}),function(data,responseCallback){
            if (t) clearTimeout(t);
            deferred.resolve(wrapper(data),responseCallback);
        });
        return deferred.promise();
    },
    activatePass : function(params){
        var me = this;
        if (this._act_loading) {
            return;
        }
        this._act_loading = true;
        var deferred = $.Deferred();
        var t = timeout(deferred);
        bridge.callHandler("activatePass",wrapper_params({params : params}),function(data,responseCallback){
            if (t) clearTimeout(t);
            data = wrapper(data);
            if (data.ret == 0) {
                deferred.resolve(data,responseCallback);
            } else {
                deferred.reject(data);
            }
            me._act_loading = false;
        });
        return deferred.promise();
    },
    //signature
    proxy : function(url,params){
        var me = this;
        var deferred = $.Deferred();
        var t = timeout(deferred);
        if (params && params.__uin_key) {
            delete params.__uin_key;
        }
        var _url = url+".htm";
        bridge.callHandler("proxy",wrapper_params({url:_url,params : params}),function(data,responseCallback){
            if (t) clearTimeout(t);
            data = wrapper(data);
            // if (data.ret == 0) {
            deferred.resolve(data,responseCallback);
            // } else {
            //     deferred.reject(data);
            // }
        });
        return deferred.promise();

    },
    curry_api : function(url){
        var me = this;
        return function(params){
            var params = params || {};
            params.version = VERSION;
            return me.proxy(url,params);
        }
    },
    sendMsg : function(){

    },
    init : function(msgHandler,callback){
        bridge.init({
            msgHandler : msgHandler,
            callback : callback
        })
        return this;
    },
    //app调web端方法
    shareForAPP : function(cb){
        if (!cb) {
            bridge.registerHandler("shareForAPP",function(data,responseCallback){
                responseCallback(1);  
            });
        } else {
            bridge.registerHandler("shareForAPP",cb);
        }
    }
}

method.isApp = bridge.isApp;
method.isAndroid = bridge.isAndroid;
method.isIos = bridge.isIos;
method.getBridge = function(){
    return bridge;
};



module.exports = method;
