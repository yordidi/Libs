'use strict';

var _desc, _value, _obj;

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
 */

function decorator(target, prop, descriptor) {
  console.log('target >>>>', target); // target >>>> { foo: [Function: foo] }
  console.log('target.hasOwnProperty(\'constructor\') >>>>', target.hasOwnProperty('constructor')); // target.hasOwnProperty('constructor') >>>> false
  console.log('target.constructor >>>>', target.constructor); // target.constructor >>>> function Object() { [native code] }
  console.log('prop >>>>>', prop); // prop >>>>> foo
  console.log('descriptor>>>>>', descriptor); // descriptor>>>>> { value: [Function: foo],
  // writable: true,
  //  enumerable: true,
  //  configurable: true }

}

function f(target, prop, descriptor) {}

// @f  // 报错
const A = (_obj = {
  foo() {}
}, (_applyDecoratedDescriptor(_obj, 'foo', [decorator], Object.getOwnPropertyDescriptor(_obj, 'foo'), _obj)), _obj);

// 装饰器函数编译时运行，这里不需要调用foo函数
// A.foo()
