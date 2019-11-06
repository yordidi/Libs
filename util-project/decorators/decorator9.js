/**
 * 函数的装饰器
 * @结论： babel提示装饰器只能装饰class
 * @param prop
 * @param descriptor
 * @returns {*}
 */

function log(target, prop, descriptor) {
    const value = descriptor.value

    descriptor.value = function () {
        value.apply(this, arguments)
    }

    return descriptor
}

@log
function bar() {
    console.log('bar is excuting....')
}

bar()
