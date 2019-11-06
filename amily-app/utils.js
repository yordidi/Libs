/**
 * 获取两地距离
 * defered应用
 */

var $ = require("zepto");
var cookies = require("cookies");
var get_geo = require("get_geo");
var config = require("./config.js");
var geo = require("geo.js");
var ses = window.sessionStorage;
var url = window.location.href;
var VERSION = 2700;
var tv = 20;

var city = (function(){
  var reg = /http(?:s?):\/\/[^\/]+\/(beijing|shanghai)/;
  var enname = url.match(reg);
  if(enname){
    enname = enname[1];
    return (config.citys.filter(function(it){
      return it.enname === enname;
    })[0] || config.citys[0]);
  } else{
    var cityid = cookies.getItem("cityid");
    if (cityid) {
      return (config.citys.filter(function(it){
        return it.id == cityid;
      })[0] || config.citys[0]);
    }
  }
  return config.citys[0];
})();
var cityId = city.id;
var loc = window.location;

module.exports.getPageCityId = function(){
  return cityId;
}


module.exports.getCityById = function(cityId){
  return (config.citys.filter(function(it){
      return it.id == cityId;
  })[0] || config.citys[0]);
}

module.exports.fetch = function(url) {
  return  function(data) {
    data = data || {};
    var default_data = {
      cityId : cityId,
      version : VERSION,
      uin : cookies.getItem("uin"),
      tv : tv
    };
    var postData = $.extend(default_data,data);
    
    return $.ajax(addHeaderLog({
      url : url,
      type : "POST",
      dataType : "json",
      data : JSON.stringify(postData)
    }));
  }
}

module.exports.get_fetch = function(url){
  return function(data){
    data = data || {};
    var default_data = {
      cityId : cityId,
      version : VERSION,
      tv : tv
    };
    var getData = $.extend(default_data,data);
    
    return $.ajax(addHeaderLog({
      url : url,
      cache : false,
      dataType : "json",
      data : getData
    }));
  }
}



module.exports.post_fetch = function(url){
  return function(data){
    return $.ajax(addHeaderLog({
      url : url,
      cache : false,
      dataType : "json",
      data : JSON.stringify(data),
      type : 'POST'
    }));
  }
}




module.exports.initJuicerFn = function(_city){
  _city = _city || city
  var juicer = require("juicer");
  var enname = _city.enname || "beijing";
  juicer.register("product_url",function(id){
    return "/"+enname+"/product/"+id;
  });

  juicer.register("shop_url",function(id){
    return "/"+enname+"/shop/"+id;
  });

  juicer.register("stylist_url",function(id){
    return "/"+enname+"/stylist/"+id;
  });

  juicer.register("album_url",function(id){
    return "/"+enname+"/album/"+id;
  });
}


module.exports.getDistance = function(end_lat,end_lng){
  var deferred = $.Deferred();
  get_geo().done(function(lat,lng){
    var distance = geo.getDistance({
      latitude : lat ,
      longitude : lng
    },{
      latitude : end_lat,
      longitude : end_lng
    });
    if (distance > 1000 ) {
      var dis = Math.round(geo.convertUnit("km",distance) * 100)/100;
      if (dis > 1000) {
        txt = "1000km以上";
      }else{
        txt = Math.round(geo.convertUnit("km",distance) * 100) / 100 + "km";
      }

    } else {
      txt = distance +"m";
    }
    deferred.resolve(txt);
  }).fail(function(){
    deferred.reject();
  });
  return deferred.promise();
}

module.exports.getTwoPointDistance = function(start_lng,start_lat,end_lng,end_lat){
  var distance = geo.getDistance({
    latitude : start_lat ,
    longitude : start_lng
  },{
    latitude : end_lat,
    longitude : end_lng
  });
  if (distance > 1000 ) {
    var dis = Math.round(geo.convertUnit("km",distance) * 100)/100;
    if (dis > 1000) {
      txt = "1000km以上";
    }else{
      txt = Math.round(geo.convertUnit("km",distance) * 100) / 100 + "km";
    }

  } else {
    txt = distance +"m";
  }
  return txt;
}

//userinfo in sessionStore  or pass object
module.exports.checkPass = function(userinfo){
  if (!userinfo) return false;
  var t = dateZone(new Date().getTime()).getTime();
  var s = userinfo.begin_time * 1000 , e = userinfo.end_time * 1000;
  return (userinfo.status == 0 && t >= s && t <= e);
}

//userinfo in sessionStore  or pass object
module.exports.checkGift = function(gift){
  var t = dateZone(new Date().getTime()).getTime();
  var s = gift.use_begin_time * 1000 , e = gift.use_end_time * 1000;
  return (gift.status === 0 && t >= s && t <= e);
}


function dateZone(time){
  var date_offset = (new Date().getTimezoneOffset() + 480 ) * 60000;
  var date = new Date(time*1 + date_offset);
  return date;
}
module.exports.dateZone = dateZone;

module.exports.dateZoneTime = function(time){
  var date_offset = (new Date().getTimezoneOffset() + 480 ) * 60000;
  return time*1 + date_offset;
  
};

module.exports.resetDateZone = resetDateZone;
function resetDateZone(time){
  var date_offset = (new Date().getTimezoneOffset() + 480 ) * 60000;
  var resetTime = time - date_offset;
  return resetTime;
}


module.exports.initGoBack = function(){
  $("#go-back").on('click',function(e){
    e.preventDefault();
    setTimeout(function(){
      window.history.go(-1);
    },0);
  });
  $("#am-home").on('click',function(e){
    e.preventDefault();
    var url = window.localStorage.getItem("user_last_home") || "/";
    location.href = url;
  });
}

module.exports.setDocTitle = function(title){
  document.title = title;
  var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {      setTimeout(function() {        $iframe.off('load').remove()      }, 0)    }).appendTo($(document.body));
}

module.exports.setLocHash = function(hash){
  loc.hash = hash;
}
function addHeaderLog(opt){
  if (!opt.headers) {
    opt.headers = {};
  }
  if (ses && ses.getItem("latlng")) {
    var latlng = ses.getItem("latlng").split("_");
    opt.headers.extend = JSON.stringify({longitude:latlng[1],latitude:latlng[0]});
  }
  return opt;

}

function clklog(action){
      var psid = cookies.getItem("psid") , tcid = cookies.getItem("tcid") , uid = cookies.getItem("uin")|| cookies.getItem("openid");
      (new Image()).src="http://bc.hiamily.com/browser?type=click&psid="+psid+"&tcid="+tcid+"&uid="+uid+"&content="+action+"&page="+encodeURIComponent(location.href);
}
var __init_log__ = false;

module.exports.clklog = clklog;

module.exports.initLog = function(){
  if (__init_log__){
    return;
  }
  __init_log__ = true;
  var hasTouchStartEvent = 'ontouchstart' in document.createElement( 'div' );

  document.body.addEventListener(hasTouchStartEvent ? "touchstart" : "mousedown",function(e){
    var dom = e.target , act;
    while (dom) {
      if (act = dom.getAttribute("data-bc")){
        clklog(act);
        break;
      }
      dom = dom.parent;
    }
  },false);

};


//启动日志记录拦截
setTimeout(function(){
  $(function(){
    module.exports.initLog();
  })
},100);


module.exports.stopBodyScroll = function(){
  var $gbody = $("#gbody");
  if ($gbody.length) {
    $gbody.on("touchmove",function(e){
      e.stopPropagation();
    });
    $(document).on("touchmove",function(){
      e.preventDefault();
    });
  }


}
