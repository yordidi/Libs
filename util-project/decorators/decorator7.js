/**
 * es6类的装饰器函数
 */

// 方法装饰器
function funcDecorator(target, prop, descriptor) {
    const _value = descriptor.value
    descriptor.value = function () {
        _value.apply(this, arguments)
        console.log('method is excuted...')
    }
}

// 属性装饰器
function attrDecorator(target, prop, descriptor) {
    target.bar = 'baz'
}

@attrDecorator
class A {
    constructor() {
        this.attr = 'attr'
    }

    @funcDecorator
    foo() {
        console.log(this.attr)
    }
}

const aInstance = new A;

console.log('>>>>>', aInstance.bar);  // >>>>> undefined

console.log('>>>>>', A.bar);  // >>>>> baz

aInstance.foo();  // method is excuted...

