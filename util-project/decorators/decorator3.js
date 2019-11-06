/**
 * @titile 对象字面量的属性装饰器和方法装饰器
 * @dest decorators/decorator3.js
 * 1.
 * 2. target是对象字面量本身
 * 3. 装饰对象字面量没有意义
 */

function decorator(target, prop, descriptor) {
    console.log('descriptor>>>>>', descriptor) // descriptor>>>>> { value: [Function: foo],
                                               // writable: true,
    //  enumerable: true,
    //  configurable: true }

}

function f(target, prop, descriptor) {
    console.log('f target>>>>>', target)
    target.isDecorator = true
}

// @f  // 报错
const A = {
    @decorator
    foo() {

    },
    @f
    bar: {

    }
}

// 装饰器函数编译时运行，这里不需要调用foo函数
// A.foo()
console.log(A.bar.isDecorator) // undefined
console.log(A.isDecorator) // true

