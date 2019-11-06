var $ = require("zepto");
var utils = require("utils");
var bridge = require("./bridge_api");
bridge.init(function(data){
});
window.goShop = function(shopid){
    bridge.goShop(shopid);
}
window.goProxy = function(){
    var url = document.getElementById("url").value;
    var param = document.getElementById("param").value;
    if (url ) {
        if (param) {
           var _p = utils.get_args(param);
           bridge.proxy(url,_p).done(function(data){
               alert(JSON.stringify(data));
           });
        } else {
           bridge.proxy(url,{}).done(function(data){
               alert(JSON.stringify(data));
           });
        } 
    } else {
           bridge.proxy("get_album_list",{}).done(function(data){
               alert(typeof data);
               alert(JSON.stringify(data));
           });
    }
}
window.goPrd = function(id){
    bridge.goPrd(id);
}

window.goAlbum = function(id){
    bridge.goAlbum(id);
}

window.goHome = function(){
    bridge.goHome();
}
window.getYHQ = function(){
    bridge.isLogin().done(function(data){
        bridge.proxy("receive_coupon",{code:"12345543"}).done(function(data){
            alert(JSON.stringify(data));
        }).fail(function(data){
              alert("fail111111==="+JSON.stringify(data));
        }) 
    }).fail(function(){
        bridge.login();
    })        

}
window.goUserCenter = function(){
    alert(123);
    bridge.goUserCenter();
}

$(function(){
   bridge.isLogin().done(function(){
       bridge.getUserInfo().done(function(data){
          var uin = data.uin;
          bridge.proxy("check_coupon",{code : "12345543"}).done(function(data){
              alert("check=="+JSON.stringify(data));
          }).fail(function(){
              alert("fail==="+JSON.stringify(data));
          })
       });
   }).fail(function(){
       alert("no login")
   });
});


