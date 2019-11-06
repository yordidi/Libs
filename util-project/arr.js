/*
 * array sort
 * 2018-4-23
 */

// 声明一个数组
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * sort 排序
 * [ 2, 1, 3, 4, 7, 6, 9, 5, 8 ]
 * [ 2, 3, 9, 1, 4, 7, 5, 6, 8 ]
 * [ 2, 3, 9, 6, 4, 7, 1, 8, 5 ]
 * [ 9, 2, 7, 3, 4, 6, 1, 5, 8 ]
 * [ 7, 2, 9, 3, 1, 4, 5, 8, 6 ]
 * [ 6, 9, 1, 7, 2, 3, 5, 8, 4 ]
 * [ 6, 9, 1, 7, 3, 2, 5, 4, 8 ]
 * [ 6, 9, 1, 3, 7, 2, 4, 8, 5 ]
 * [ 4, 2, 7, 3, 6, 9, 8, 5, 1 ]
 * [ 7, 6, 2, 3, 5, 9, 4, 8, 1 ]
 * [ 3, 7, 9, 4, 6, 2, 5, 1, 8 ]
 * [ 7, 3, 4, 9, 5, 6, 2, 8, 1 ]
 * [ 4, 7, 3, 9, 8, 5, 6, 2, 1 ]
 * [ 7, 4, 3, 9, 5, 8, 2, 6, 1 ]
 * [ 7, 4, 3, 9, 1, 5, 8, 2, 6 ]
 * [ 9, 1, 4, 7, 3, 5, 2, 6, 8 ]
 * [ 4, 1, 9, 5, 3, 7, 6, 2, 8 ]
 * [ 5, 9, 2, 4, 1, 3, 6, 8, 7 ]
 * [ 4, 5, 2, 9, 3, 1, 8, 6, 7 ]
 * [ 2, 4, 5, 9, 8, 3, 1, 6, 7 ]
 * 结论：由于sort函数是依次比较，因此位置并不是全部随机的。
 */
function foo() {
  arr.sort(function() {
    return Math.random() - 0.5
  });

  console.log(arr);
}

// for( let i = 0; i < 20; i++) {
//   foo();
// }

/**
 * 真*随机排序
 * 结论：位置完全随机
 */

function random(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
}
function shuffle(arr) {
  let length = arr.length,
      shuffled = Array(length);

  for(let index = 0, rand; index < length; index++) {
    rand = random(0, index);
    // 随机值 小于当前位置，填补某些位置一直随机不到的情况
    if (rand !== index) {
      shuffled[index] = shuffled[rand];

    }
    // 随机位置 插入一个值
    // 位置完全随机
    shuffled[rand] = arr[index];
  }
  return shuffled;

}


for(let i = 0; i < 20; i++) {

  console.log(shuffle(arr));

}

