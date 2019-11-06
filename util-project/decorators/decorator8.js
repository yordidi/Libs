/**
 * this作用域丢失
 * 奇怪es6类的实例属性是绑定实例上，而不是在类的原型对象上？
 */

const log = (target, prop, descriptor) => {
    const value = descriptor.value;
    descriptor.value = (...args) => {
        console.log('foo is excuting...');
        console.log('target>>>>>', target) // target>>>>> A {}
        console.log(target.hasOwnProperty('bar')) // false
        console.log(target.hasOwnProperty('foo')) // true
        console.log(target === A.prototype)  // true
        console.log(A.prototype.bar) // undefined
        value.apply(target, args)
    }
}

class A {
     bar = 'bar of A'

    @log
    foo() {
        console.log('foo this>>>>>>', this)
        console.log(this.bar)
    }
}

console.log('a.bar>>>>', A.bar) // undefined
console.log('a.prototype.bar>>>>', A.prototype.bar) // undefined

const instance = new A()
console.log('a.prototype.bar>>>>', A.prototype.bar) // undefined
console.log('a.prototype.bar>>>>',instance.bar) // 'bar of A'

instance.foo()

console.log('instance.bar>>>>>', instance.bar) // 'bar of A'
