/**
 * 数据拷贝
 * @param  {type} obj  [拷贝对象]
 * @param  {Boolean} deep [是否深拷贝]
 * @return {Object}  target   [对象]
 */
function copyData (sourceData, target, deep) {
    if (typeof sourceData === "function") {
      return new Function("return " + sourceData.toString())();
    } else if (sourceData === null || (typeof sourceData !== "object")) {
        return sourceData;
    } else {
        var name, target = Array.isArray(sourceData) ? [] : {}, value;

        for (name in sourceData) {
            value = sourceData[name];

            if (value === sourceData) {
              continue;
            }

            if (deep) {
                if (typeof value === 'Object') {
                    target[name] = copy(value,deep);
                } else if (typeof value === 'function') {
                    target[name] = new Function("return " + value.toString())();
                } else {
                  target[name] = value;
                }
            } else {
              target[name] = value;
            }
        }
        return target;
    }　
}
