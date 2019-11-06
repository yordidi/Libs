/**
 * 模仿Vue组件中的methods被装饰
 */

function log(target, prop, descriptor) {
    return descriptor
}

const methods = {
    @log
    handleClick() {

    }
}
