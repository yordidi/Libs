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
 * 继承对象的方法装饰
 */

let Super = class Super {};


function log(target, key, descriptor) {
  console.log('target >>>', target); // Sub实例
  console.log('target.hasOwnProperty >>>', target.hasOwnProperty('prototype')); // false
  console.log(target.hasOwnProperty('constructor')); // true
  console.log('>>>', target.constructor); // class Sub
  console.log(target.__proto__); // Super {}
}

let Sub = (_class = class Sub extends Super {
  constructor() {
    super();
  }

  foo() {}
}, (_applyDecoratedDescriptor(_class.prototype, 'foo', [log], Object.getOwnPropertyDescriptor(_class.prototype, 'foo'), _class.prototype)), _class);


const sub = new Sub();

sub.foo();

console.log('Sub.constructor >>>>', Sub.constructor);
console.log('Sub.hasOwnProperty >>>>', Sub.hasOwnProperty('prototype'));
