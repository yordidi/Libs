'use strict';

var _class, _desc, _value2, _class2;

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
 * es6类的装饰器函数
 */

// 方法装饰器
function funcDecorator(target, prop, descriptor) {
    const _value = descriptor.value;
    descriptor.value = function () {
        _value.apply(this, arguments);
        console.log('method is excuted...');
    };
}

// 属性装饰器
function attrDecorator(target, prop, descriptor) {
    target.bar = 'baz';
}

let A = attrDecorator(_class = (_class2 = class A {
    foo() {}
}, (_applyDecoratedDescriptor(_class2.prototype, 'foo', [funcDecorator], Object.getOwnPropertyDescriptor(_class2.prototype, 'foo'), _class2.prototype)), _class2)) || _class;

const aInstance = new A();

console.log('>>>>>', aInstance.bar); // >>>>> undefined

console.log('>>>>>', A.bar); // >>>>> baz

aInstance.foo(); // method is excuted...
