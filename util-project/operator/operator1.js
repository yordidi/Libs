const foo = {
  name: 'yaodi',
  age: 22,
  books: [1, 2, 3]
}

let { name, age, books } = foo

let newBooks = foo.books

console.log('before name>>>>>', name)
console.log('before age>>>>>', age)

age++
books[0] = 4
newBooks.push(4)


console.log('after age>>>>>', age)
console.log('after foo>>>>>', foo)
console.log('after books>>>>>', books)
console.log('after newBooks>>>>>', newBooks)


onsubmit: confirm(validateData())

onsubmit() == confirm(validateData())()
