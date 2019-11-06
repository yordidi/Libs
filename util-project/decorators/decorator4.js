/**
 * 继承对象的方法装饰
 */

// class Super {
//
// }
function Super() {

}

function log(target, key, descriptor) {
  console.log('target >>>', target) // Sub实例
  console.log('target.hasOwnProperty >>>', target.hasOwnProperty('prototype')) // false
  console.log(target.hasOwnProperty('constructor')) // true
  console.log('>>>',target.constructor) // class Sub
  console.log(target.__proto__) // Super {}
}

class Sub extends Super{
  constructor() {
    super()
  }
  @log
  foo() {

  }
}

const sub = new Sub

sub.foo()

console.log('Sub.constructor >>>>',Sub.constructor)  // Sub.constructor >>>> function Function() { [native code] }
console.log('Sub.hasOwnProperty >>>>',Sub.hasOwnProperty('prototype')) // Sub.hasOwnProperty >>>> true
