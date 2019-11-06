/**
 * 验证lodash-decorators
 * 1. 类的静态方法无效
 * 2. 类的实例方法无效
 */

import { After } from 'lodash-decorators'

class A {
  @After(3)
  foo() {
    console.log('this>>>>', this)
    console.log('excute...')
  }
}

const intanceA = new A

intanceA.foo()
intanceA.foo()
intanceA.foo()
