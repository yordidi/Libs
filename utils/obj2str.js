/**
 * 对象转换成字符串 2017-10-12 并没有看懂
 */

const obj2str = o => {
	let r = [];
	//如果是字符串，加上转义符号
	if(typeof o == "string"){ 
	  return "\"" + o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\""; 
	} 
	//如果是对象
	if(typeof o == "object"){ 
		//如果非数组	
	    if(!o.sort){ 
		  for(var i in o){ 
		    r.push(i +":"+ obj2string(o[i])); 
		  } 
		  if(!!document.all&&!/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)){ 
		   	r.push("toString:"+ o.toString.toString()); 
		  } 
		  r = "{"+r.join()+"}"; 
		}else{ 
		  for(var i = 0;i < o.length;i++){ 
		   r.push(obj2string(o[i])) 
		  } 
		  r="["+r.join()+"]"; 
		} 
	 	return r; 
	} 
	return o.toString(); 
}

function obj2string(o){ 
 
}