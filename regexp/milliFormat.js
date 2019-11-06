const reg = /(?=(?!^)(\d{3})+$)/g;

const str = '123456789'

// str.replace(reg, function(match, p1, p2, p3, p4) {
// 	console.log('match===', match)
// 	console.log('p1===', p1)
// 	console.log('p2===', p2)
// 	console.log('p3===', p3)
// 	console.log('p4===', p4)
// })

console.log(str.replace(reg, ','))