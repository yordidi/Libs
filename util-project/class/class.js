/**
 * es6的类
 */

// class A {
//   instanceAttr = '实例属性';
//   static classAttr = 'class属性';
//
//   print() {
//     console.log('普通函数打印结果：');
//     console.log(this);
//     console.log('instanceAttr===', this.instanceAttr);
//     console.log('classAttr===', this.classAttr)
//   }
//
//   arrowPrint = () => {
//     console.log('箭头函数打印结果：');
//     console.log(this);
//     console.log('instanceAttr===', this.instanceAttr);
//     console.log('classAttr===', this.classAttr)
//   }
// }

// A.arrowPrint()

// const Instance = new A;

// Instance.print();

// Instance.arrowPrint();
//
// console.log('-----------')
//
// console.log(A)
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

class B {
  foo() {
    // do something
  }
}

console.log('>>>', Object.getOwnPropertyDescriptors(B.prototype, 'foo'))
