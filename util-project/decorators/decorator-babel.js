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

/**
 * es6类的装饰器
 * 1. 先执行类修饰器，再执行方法修饰器
 * 2. 类修饰器函数的第一个参数target，是类本身；方法修饰器函数的第一个参数target，是类的实例
 * 3. 类修饰器函数没有第二和第三个参数
 */

// 方法装饰器
const log = (target, prop, descriptor) => {
  var oldValue = descriptor.value;

  descriptor.value = function () {

    console.log('arguments >>>', arguments); // { '0': 2, '1': 4 }

    console.log('prop >>>>', prop); // prop >>>> add

    console.log('this >>>>', this); // this >>>> Math {}

    console.log('target >>>>', target); // target >>>> Math {}
    return oldValue.apply(target, arguments);
  };

  return descriptor;
};

// 类的修饰器
function decorator(target, prop, descriptor) {
  console.log('decorator target >>>>', target); // decorator target >>>> class Math {
  //   add(a, b) {
  //     return a + b;
  //   }
  // }

  console.log('decorator prop >>>>', prop); // decorator prop >>>> undefined
  console.log('decorator descriptor >>>>', descriptor); // decorator descriptor >>>> undefined
}

let Math = decorator(_class = (_class2 = class Math {
  add(a, b) {
    return a + b;
  }
}, (_applyDecoratedDescriptor(_class2.prototype, 'add', [log], Object.getOwnPropertyDescriptor(_class2.prototype, 'add'), _class2.prototype)), _class2)) || _class;

const math = new Math();

// passed parameters should get logged now
math.add(2, 4);
