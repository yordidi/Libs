'use strict';

/**
 * es6的类
 */

let A = class A {
  constructor() {

    this.arrowPrint = () => {

    };
  }

  print() {

  }

};
A.classAttr = 'class属性';


const Instance = new A();

Instance.print();

Instance.arrowPrint();

console.log('-----------');

console.log(A);
// A.print()

// A.arrowPrint()

// 类和实例的属性 不是共享的？？？
// console.log('class属性=====')
// console.log(A.instanceAttr)  //undefined。因为a是实例属性
// console.log(A.classAttr)  //class属性
//
// console.log('实例属性=====')
// console.log(Instance.instanceAttr)  // 实例属性
// console.log(Instance.classAttr)  // undefined
