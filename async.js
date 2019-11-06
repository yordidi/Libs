// const count = () => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve(100)
// 		}, 1000)
// 	})
// }

// const list = () => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve([10, 100, 1000])
// 		}, 1000)
// 	})
// }

// const getList = async () => {
// 	const c = await count();
// 	const l = await list();
// 	return { count: c, list: l }
// }

// console.log(getList())

// getList().then(data => {
// 	console.log('data')
// 	console.log(data)
// }).catch(err => {
// 	console.log('err')
// 	console.log(err)
// })

// async function getList() {
// 	const rs = await count()
// 	console.log('rs----')
// 	console.log(rs)
// }

// getList()

// const reDate = /(\d{2})-(\d{2})-(\d{4})/,
//       match = reDate.exec('2018-08-06');
// console.log(match);
// [2018-08-06, 08, 06, 2018]

// 但此时年月日的索引就改变了
// match[3] // 2018
// match[1] // 08
// match[2] // 06


setTimeout(function(){
    console.log(4)
}, 30) 
setTimeout(function(){
    console.log(3)
}, 20) 
for (var i=0; i<1000000; i++) {
    // console.log(1)
}
setTimeout(function(){
    console.log(2)
}, 100) 