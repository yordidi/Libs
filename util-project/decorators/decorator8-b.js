'use strict';

var _desc, _value, _class;

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
 * this作用域丢失
 * @returns {*}
 */

const log = (target, prop, descriptor) => {
    const value = descriptor.value;
    descriptor.value = (...args) => {
        console.log('foo is excuting...');
        console.log('target>>>>>', target);
        console.log(target.hasOwnProperty('bar'));
        value.apply(target, args);
    };
    return descriptor;
};

let A = (_class = class A {
    foo() {
        console.log('foo this>>>>>>', this);
        console.log(this.bar);
    }
}, (_applyDecoratedDescriptor(_class.prototype, 'foo', [log], Object.getOwnPropertyDescriptor(_class.prototype, 'foo'), _class.prototype)), _class);
A.bar = 'bar of A';


console.log('a.bar>>>>', A.bar);

const instance = new A();

instance.foo();
