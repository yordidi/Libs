function decoratorBar(target, prop, descriptor) {
  const method = descriptor.value
  descriptor.value = function () {

    console.log('this >>>>', this) // this >>>> { foo: [Function: foo], bar: [Function] }

    console.log(this === target) // true

    method.apply(this, arguments)
  }

  return descriptor;
}

const A = {

  @decoratorBar
  bar() {
    console.log('bar excute..')
  }
}


A.bar()
