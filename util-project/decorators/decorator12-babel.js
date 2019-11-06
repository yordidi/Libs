'use strict';

var _desc, _value2, _class;

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

function log1(target, prop, descriptor) {
    console.log('log1 init');
    const _value = descriptor.value;
    descriptor.value = function () {
        console.log('log1 excuting');
        _value.apply(this, arguments);
    };
}

function log2(target, prop, descriptor) {
    console.log('log2 init');
    const _value = descriptor.value;

    descriptor.value = function () {
        console.log('log2 excuting');
        _value.apply(this, arguments);
    };
}

let A = (_class = class A {
    bar() {
        console.log('bar');
    }
}, (_applyDecoratedDescriptor(_class.prototype, 'bar', [log1, log2], Object.getOwnPropertyDescriptor(_class.prototype, 'bar'), _class.prototype)), _class);


const a = new A();

a.bar();
