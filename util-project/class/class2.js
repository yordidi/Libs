/**
 * class声明类的constructor
 */

class A {

}

console.log('A.constructor >>> ', A.constructor)  // A.constructor >>>  function Function() { [native code] }
console.log('A.hasOwnProperty >>>', A.hasOwnProperty('prototype')) // A.hasOwnProperty >>> true

/**
 * function声明类的construtor
 */

function B() {

}
console.log('B.constructor >>> ', B.constructor)  // B.constructor >>>  function Function() { [native code] }
console.log('B.hasOwnProperty >>>', B.hasOwnProperty('prototype')) // B.hasOwnProperty >>> true

/**
 * 对象字面量的constructor
 */
const C = {

}

console.log('C.constructor >>> ', C.constructor)  // C.constructor >>>  function Function() { [native code] }
console.log('C.hasOwnProperty >>>', C.hasOwnProperty('prototype'))  // C.hasOwnProperty >>> false

// 如何判断一个对象可以被继承？
