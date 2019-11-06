var $ = require("zepto");
var cookies = require("cookies");
var utlis2 = require("./utils.js");
var wx = window.wx;
var ready = false;
var callbacks = [];
var inited = false;
function init(opt){
  if (inited) return;
  inited = true;
  opt = opt || {};
  config = opt.config || window.wx_config;
  if(config){
    if (!config.jsApiList){
      api_list = opt.api_list ||[
        "onMenuShareAppMessage",
        "onMenuShareTimeline",
        "onMenuShareQQ"
      ];
      config.jsApiList = api_list;
    }
    config.debug = false;
    wx.ready(function(){
      ready = true;
      opt.ready && opt.ready();
      if (callbacks.length){
        callbacks.forEach(function(obj){
          wx[obj.fn].apply(wx,obj.args);
        });
        callbacks = [];
      }
    });
    wx.error(function (){
      if (opt.error){
        opt.error();
      } else {
        alert("微信认证失败");
      }
    });
    wx.config(config);
  }
}
module.exports.init = init;

module.exports.isinit = function(){
  return inited;
}
module.exports.isready = function(){
  return !!ready;
}

module.exports.callMethod = function(method_name){
  args = [].slice.call(arguments,1);
  if (!ready){
    callbacks.push({"fn":method_name , "args" : args});
  } else {
    wx[method_name].apply(wx,args);
  }
}

//朋友
function shareFr(data){
    wx.onMenuShareAppMessage({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接
        imgUrl : data.imgUrl
    });
}
//朋友圈
function shareFrs(data){
    wx.onMenuShareTimeline({
        title: data.title, // 分享标题
        link: data.link, // 分享链接
        imgUrl: data.imgUrl // 分享图标
    });
}
function shareQQ(data){
     wx.onMenuShareQQ({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接
        imgUrl : data.imgUrl
    });


}
module.exports.share = function(data){
  this.callMethod("onMenuShareAppMessage",{
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接
        imgUrl : data.imgUrl,
        success : function(){
          utlis2.clklog("share-wx");
        }
  });
  this.callMethod("onMenuShareQQ",{
        title: data.title, // 分享标题
        link: data.link, // 分享链接
        desc: data.desc, // 分享描述
        imgUrl: data.imgUrl, // 分享图标
        success : function(){
          utlis2.clklog("share-qq");
        }
  });
  this.callMethod("onMenuShareTimeline",{
        title: data.title+"-"+data.desc, // 分享标题
        link: data.link, // 分享链接
        imgUrl: data.imgUrl, // 分享图标
        success : function(){
          utlis2.clklog("share-timeline");
        }
  });
}
module.exports.sku_share = function(type,id,title,img){
  if (!window.is_weixin) {
    return;
  }
  var url ;
  switch (type) {
    case "product":
      url = "http://i.hiamily.com/h5/product/"+id;
      break;
    case "shop":
      url = "http://i.hiamily.com/h5/shop/"+id;
      break;
    case "tech":
      url = "http://i.hiamily.com/h5/tech/"+id;
      break;
    case "album":
      url = "http://i.hiamily.com/h5/album/"+id;
      break;
    default:
      url = location.href;
  }
  this.init();
  var me = this;
  var data = {
    title : title || document.title,
    imgUrl : img,
    link  : url
  };
  $.ajax({
    url : "/mapi/invitation_code",
    data : JSON.stringify({id:cookies.getItem("uin")}),
    type : "POST",
    success : function(rs){
      var code = rs.code;
      if (code) {
        data.desc = "分享精致美丽生活，用邀请码"+code+"即获50元礼券！";
      } else {
        data.desc = "分享精致美丽生活，赶快加入获取50元礼券！";
      }
      me.share(data);
    },
    fail : function(rs){
      data.desc = "分享精致美丽生活，赶快加入获取50元礼券！";
      me.share(data);
    }
  });
}
