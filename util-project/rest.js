const arr1 = [{
  name: '11'
}, {
  name: '22'
}]

const arr2 = [...arr1];

console.log(arr1) // => [ { name: '11' }, { name: '22' } ]

arr2[1].name = 'yaodi'

console.log(arr1[1]) // => { name: 'yaodi' }

console.log(arr1) // => [ { name: '11' }, { name: 'yaodi' } ]

console.log(arr2) // => [ { name: '11' }, { name: 'yaodi' } ]
