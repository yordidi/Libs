'use strict';

var _class, _desc, _value, _class2;

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

let A = topDecorator(_class = (_class2 = class A {
  foo() {}
}, (_applyDecoratedDescriptor(_class2.prototype, 'foo', [fooDecorator], Object.getOwnPropertyDescriptor(_class2.prototype, 'foo'), _class2.prototype)), _class2)) || _class;

function topDecorator(target, name, descriptor) {
  console.log('this >', this);
  console.log('target >', target);
  return descriptor;
}

function fooDecorator(target, name, descriptor) {
  return descriptor;
}
