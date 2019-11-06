/**
* @file bridge.js
* @brief  for ios android  device 
* @author kai.wei
* @version 1.0.0
* @date 2015-09-09
*/

var Observer = require("event");
var document = window.document;
var ua = window.navigator.userAgent.toLowerCase();

var _obs  = (function(){
    var CustEvent =  function(){};
    CustEvent.prototype = Observer;
    CustEvent.prototype.constructor = CustEvent;
    return new CustEvent();
})();

var isApp = ua.match(/amily/) , isIos = ua.match(/iphone/) ,isAndroid = ua.match(/android/);
var bridge , message , callbacks;

var Bridge = {
    isApp : isApp,
    isIos : isIos,
    isAndroid : isAndroid,
    bridge : null,
    _inited : false,
    _messages : [],  //message 消息队列
    _call_handlers : [], // 
    _register_handlers : []  //注册给 app 使用的 函数队列
}


Bridge.init = function(options){
    var me = this;
    options = options || {};
    if (!me.bridge && window.WebViewJavascriptBridge ){
        me.bridge = window.WebViewJavascriptBridge;
        if (me._inited) {
            options.callback && options.callback(bridge);
        } else {
            initHandler(me.bridge,options);
        }
    }else {
        document.addEventListener('WebViewJavascriptBridgeReady', function(event) {
            //me.bridge = window.WebViewJavascriptBridge;
            me.bridge = event.bridge;
            initHandler(me.bridge,options);
        }, false);
    }
    
    function initHandler(webview_bridge , options){
        webview_bridge.init(options.msgHandler || function(message, responseCallback){
        });
        var _ms = me._messages , _cs = me._call_handlers , _rs = me._register_handlers ;
        [{data:_ms, fn:me.send},
        {data:_cs, fn:me.callHandler}, 
        {data :_rs , fn : me.registerHandler }].forEach(function(obj,i){
            obj.data.forEach(function(arg,index){
                obj.fn.apply(me,arg);
            });
        });
        me._messages = [];
        me._call_handlers = [];
        me._register_handlers = [];
        me._inited = true;
        if (options.callback) {
            options.callback(webview_bridge);
        }
        console && console.log("bridge inited");
    }
}

Bridge.send = function(){
    var args = [].slice.call(arguments,0);
    if (!this.bridge) {
       this._messages.push(args);
       return;
    }
    this.bridge.send.apply(this.bridge,args);
}


Bridge.callHandler = function(){
    var args = [].slice.call(arguments,0);
    if (!this.bridge) {
       this._call_handlers.push(args);
       return;
    }
    this.bridge.callHandler.apply(this.bridge,args);
}

Bridge.registerHandler = function(handlerName,callback){
    var args = [].slice.call(arguments,0);
    if (!this.bridge) {
       this._register_handlers.push(args); 
       return;
    }
    this.bridge.registerHandler.apply(this.bridge,args);
}

module.exports = Bridge;

