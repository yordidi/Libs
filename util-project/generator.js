/**
 * transform-async-to-generator
 * https://babeljs.io/docs/plugins/transform-async-to-generator/
 * 无论async/await还是generator，可以在函数体内控制异步调用的执行
 * 顺序，但是该函数本身返回的又是一个promise对象。所以呢
 */

import axios from 'axios'

export function foo() {
  return new Promise((resolve, reject) => {
    axios.get('http://gank.io/api/data/Android/10/1').then(res => {
      resolve(res.data)
    }).catch(err => reject(err))
  })
}

export async function bar() {
  const dataList = await foo();
  console.log('2----')

  return dataList
}

function bar2() {
  foo().then(res => {
    console.log('res')
    return res
  }).catch( err => err)
}

function output() {

  const res = bar2();
  console.log('-------')
  console.log(res)
}
/*
打印顺序：---- 、undefined 、 res
 */
output();
