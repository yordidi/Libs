function startMove(obj, json, fn) {
	clearInterval(obj.iTimer);
	var iCur = 0;
	var iSpeed = 0;
		
	obj.iTimer = setInterval(function() {
		
		var iBtn = true;
					
		for ( var attr in json ) {
							
			var iTarget = json[attr];
			
			if (attr == 'opacity') {
				iCur = Math.round(css( obj, 'opacity' ) * 100);
			} else {
				iCur = parseInt(css(obj, attr));
			}
			
			iSpeed = ( iTarget - iCur ) / 8;    //速度由距离决定，距离越远，速度越大
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);  //样式bug，值取整进行调整,js不认小数位
			
			if (iCur != iTarget) {
				iBtn = false;
				if (attr == 'opacity') {
					obj.style.opacity = (iCur + iSpeed) / 100;
					obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
				} else {
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
			
		}
		
		if (iBtn) {
			clearInterval(obj.iTimer);
			fn && fn.call(obj);
		}
		
	}, 30);
}

function css(obj, attr) {    //得到节点计算后的样式   不能取复合样式  要这样 css(this,"backgroundColor")
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}