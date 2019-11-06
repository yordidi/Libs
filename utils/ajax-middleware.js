/**
 * ajax中间件
 * ajax(v1.5以上) + Defered对象
 * 1.5以上的ajax返回一个promise对象，而之前版本的ajax返回一个xml
 * httprequest对象
 * 植入两个功能：
 * 1、返回promise对象 
 * 2、统一处理服务端接口返回"未登录"的情况。
 * 2017-10-30
 */

export const ajaxRequestSuper = (url, type = "GET", data) => (
	$.ajax({
	  type: type,
	  url: url,
	  data: data,
	  dataType: "json"
	}).then( res => {
		if (res.ret === 2) {
			alert('提示信息', '请先登录', [
			  { text: '确定', onPress: () => { 
			  	setTimeout( () => 
			  		window.location.href = "/login?backurl=" + window.location.pathname
			  		, 1000)
			  } }
			])
			return $.Deferred().reject().promise();
		}
		return $.Deferred().resolve(res).promise();
	})
);

/**
 * ajax中间件
 * 
 * 植入一个功能：
 * 1、返回promise对象 
 * 2017-10-30
 */

 export const ajaxRequest = (url, type = "GET", data) => (
 	$.ajax({
 	  type: type,
 	  url: url,
 	  data: data,
 	  dataType: "json"
 	}).then( res => {
 		return $.Deferred().resolve(res).promise();
 	})
 );