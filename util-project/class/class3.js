/**
 * 继承类的constructor
 */

class A {

}

class B extends A {
  constructor() {
    super()
  }
}

console.log('B.constructor >>> ', B.constructor)
console.log(B.constructor)
