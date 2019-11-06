let arr = []

for (let i = 0;i < 10;i++) {
  if (i === 5) {
    continue;
  }
  arr.push(i)
}

// console.log(arr) // [0, 1, 2, 3, 4, 6, 7, 8, 9]


let arr2 = []

for (let i = 0;i < 10;i++) {
  if (i === 5) {
    return false;
  }
  arr2.push(i)
}

console.log(arr2) // [0, 1, 2, 3, 4, 6, 7, 8, 9]
