/**
 * 去除前后空格
 * @param  {[type]} target [需要去除的变量值]
 * @return {[String]}        [去除后的变量值]
 */
function trimSpace( target ) {
  const str = target + '';
  return target.replace(/\s+|\s+/g, '')
}
