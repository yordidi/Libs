import mockjs from 'mockjs'

function getFakeList() {
	return mockjs.mock({
		'list|100': [{
			'key|+1': 1,
			name: mockjs.Random.ip(),
			'age': /^c[3-4]/,
			'type|1': ['基线', '试验田', '试验田-shadow'],
			'address': /\d{3}\,\d{2,3}(\,\d{2,3})?$/
		}]
	})
}

// const fakeList = getFakeList()
// console.log(fakeList.list.slice(2, 5))


// -----------------------------------------

function queryAppList () {
  return mockjs.mock({
    'list|10': [
      {
        "id|+1": 1,
        'name': mockjs.Random.ctitle(5),
        thumb: mockjs.Random.image('120x120'),
        'isAuthored|5-10': true,
        subName: mockjs.Random.ctitle(4,10),
        type: '游戏(宠物养成)',
        distance: '10.5M'
      }
    ]
  })

}

// queryAppList()
console.log(queryAppList());


