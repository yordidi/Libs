/**
 * es6类的方法装饰和类装饰区别
 * 1. 属性装饰器接受1个参数，即类本身。装饰类的静态属性（子类和实例无法继承）
 * 2.
 */

@topDecorator
class A {
    @fooDecorator
    foo() {

    }
}

/**
 * @title 属性装饰器
 * @param target [ class本身 ]
 * @param prop [ 方法名 ]
 * @param descriptor [ 属性描述符 ]
 * @returns {*}
 */
function topDecorator(target, prop, descriptor) {
    console.log('topDecorator this >', this);
    console.log('topDecorator target >', target);
    console.log('topDecorator prop >', prop);
    console.log('topDecorator descriptor >', descriptor);
}

/**
 * @title 方法装饰器
 * @param target [ class的原型对象 }
 * @param prop [ 方法名 ]
 * @param descriptor [ 属性描述符 ]
 * @returns descriptor [ 属性描述符 ]
 */
function fooDecorator(target, prop, descriptor) {
    console.log('fooDecorator this >', this);
    console.log('fooDecorator target >', target);
    console.log('topDecorator prop >', prop);
    console.log('topDecorator descriptor >', descriptor);
    return descriptor
}
