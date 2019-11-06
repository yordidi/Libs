/**
 * 2017-10-12 by yaodi 
 * 给一段指定的英文字符串加密
 * @params {String} [英文字符串]
 * @return {String} [加密好的字符串]
 */

const makesalt = origin_string = > {
	let secret_string = ''

	for ( var i=0; i < orgin_string.length; i++ ) {
	    secret_string += String.fromCharCode(str.charCodeAt(i)-520);
	}
	return secret_string
}

export default makesalt