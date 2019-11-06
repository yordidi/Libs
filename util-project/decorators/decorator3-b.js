'use strict';

var _desc, _value, _obj, _init;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

/**
 * @titile 对象字面量的装饰器函数
 * @dest decorators/decorator3.js
 * 1. 不能用类装饰器
 * 2. target是对象字面量本身
 * 3. 装饰对象字面量没有意义
 */

function decorator(target, prop, descriptor) {
    console.log('descriptor>>>>>', descriptor); // descriptor>>>>> { value: [Function: foo],
    // writable: true,
    //  enumerable: true,
    //  configurable: true }
}

function f(target, prop, descriptor) {
    console.log('f target>>>>>', target);
    target.isDecorator = true;
}

// @f  // 报错
const A = (_obj = {
    foo() {},

    bar: {}

    // 装饰器函数编译时运行，这里不需要调用foo函数
    // A.foo()
}, (_applyDecoratedDescriptor(_obj, 'foo', [decorator], Object.getOwnPropertyDescriptor(_obj, 'foo'), _obj), _applyDecoratedDescriptor(_obj, 'bar', [f], (_init = Object.getOwnPropertyDescriptor(_obj, 'bar'), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
        return _init;
    }
}), _obj)), _obj);console.log(A.bar.isDecorator);
console.log(A.isDecorator);
