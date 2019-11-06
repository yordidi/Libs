/**
 * es6类的装饰器
 * 1. 先执行类修饰器，再执行方法修饰器
 * 2. 类修饰器函数的第一个参数target，是类本身；方法修饰器函数的第一个参数target，是类的实例
 * 3. 类修饰器函数没有第二和第三个参数
 */

// 方法装饰器
const log = (target, prop, descriptor) => {
  var oldValue = descriptor.value;

  descriptor.value = function() {

    console.log('arguments >>>', arguments) // { '0': 2, '1': 4 }

    console.log('prop >>>>', prop)  // prop >>>> add

    console.log('this >>>>', this) // this >>>> Math {}

    console.log('target >>>>', target) // target >>>> Math {}
    return oldValue.apply(target, arguments);
  };

  // return descriptor;
}

// 类的修饰器
function decorator(target, prop, descriptor) {
  console.log('decorator target >>>>', target) // decorator target >>>> class Math {
                                              //   add(a, b) {
                                              //     return a + b;
                                              //   }
                                              // }

  console.log('decorator prop >>>>', prop)   // decorator prop >>>> undefined
  console.log('decorator descriptor >>>>', descriptor)  // decorator descriptor >>>> undefined
}

@decorator
class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

const math = new Math();

// passed parameters should get logged now
console.log('result >>>>' , math.add(2, 4));
