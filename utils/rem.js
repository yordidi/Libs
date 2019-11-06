/**
 * 动态计算html的fontSize
 * 使用方法：import './rem.js'
 * 
 */

(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            //布局视口。禁止缩放情况下，布局视口等于视觉视口
            var clientWidth = docEl.clientWidth; 
            if (!clientWidth) return;
            docEl.style.fontSize = 50 * (clientWidth / 375) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);