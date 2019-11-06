/**
 * function变量的原型对象上添加方法，这个方法调用时的执行上下文(this) 是什么？
 * 1. object对象的方法调用时，方法的执行上下文(this) 是该object
 */

function foo () {

}

foo.bar = function () {
  console.log('this >', this)
  console.log('foo.prototype.bar')
}

foo.bar()


const obj = {
  fzz() {
    console.log('this >', this)
    console.log('obj.fzz')
  }
}

obj.fzz()
