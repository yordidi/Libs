import { After, Debounce, Throttle } from 'lodash-decorators'

class MyClass {
  value = 100;

  @Debounce(3, {
    // immediate: true
  })
  add(a) {
    this.value += a;
  }

  @Debounce(10, {
    leading: false
  })
  substract(a) {
    this.value -= a;
  }
}

const myClass = new MyClass();

// // myClass.add(10);
// myClass.substract(10);

// console.log(myClass.value); // => 110

// // myClass.add(50);
// myClass.substract(20);

// console.log(myClass.value); // => 110;

setInterval(() => {
  myClass.substract(20);
  console.log(myClass.value);
}, 3)

// let count = 0;

// let timer = setInterval(() => {
//   count++
//   if (count == 5) {
//     clearInterval(timer)
//   }
//   myClass.add(50);
//   console.log(myClass.value); // => 120;
// }, 11);
