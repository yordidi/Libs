const arr = [1, 5, 4, 3, 9, 10]

arr.sort((a, b) => {
    console.log('a>>>>>>', a)
    console.log('b>>>>>>', b)

    if (a > b) {
        return -1
    }
    if (a === b) {
        return 0
    }
    if (a < b) {
        // 交换位置 5，1 ==> 5, 4, 1 ==>
        return 1
    }
})

console.log(arr)
