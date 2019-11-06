var XLSX = require('xlsx');
var fs = require('fs');

var workbook = XLSX.readFile('./china.xlsx');
var sheet_name_list = workbook.SheetNames;

sheet_name_list.forEach(function(item, index) {
  var worksheet = workbook.Sheets[item];
  var jsonResult = sortJson(XLSX.utils.sheet_to_json(worksheet, {raw: true, defval: '空'}));

  fs.writeFile('zx1.json', JSON.stringify(jsonResult), function(err) {
    if(err) throw err;
    console.log('写入完毕');
  })
})


function sortJson(impJSON) {

  fs.writeFile('zx2.json', JSON.stringify(impJSON), function(err) {
    if(err) throw err;
    console.log('写入zx2完毕');
  })

  let result = []

  impJSON.forEach(item => {
    const { province, district, city } = item;
    const findProvince = result.find(it => it.label === province)
    // 已存在省份
    if (findProvince) {
      if (city === '空') return;
      const { children: citys } = findProvince
      if (Array.isArray(citys)) {

        const findCity = citys.find(it => it.label === city)
        // 已存在城市
        if (findCity) {
          if (district === '空') return;
          const { children: districts } = findCity

          if (Array.isArray(districts)) {
            const findDistrict = districts.find(it => it.label === district)
            // 不存在地区，则添加
            if (!findDistrict) {
              findCity.children.push({
                label: district,
                value: district,
              })
            }
          } else {
            findCity.children = [{
              label: district,
              value: district,
            }]
          }

        } else {
          // 不存在城市，则添加
          const cityItem = {
            label: city,
            value: city,
          }

          if (district !== '空') {
            cityItem.children = [{
              label: district,
              value: district,
            }]
          }
          findProvince.children.push(cityItem)
        }
      } else {
        // 不存在城市，则添加
        const cityItem = {
          label: city,
          value: city,
        }

        if (district !== '空') {
          cityItem.children = [{
            label: district,
            value: district,
          }]
        }
        findProvince.children.push(cityItem)

      }
    } else {
      // 不存在省份，则添加
      const provinceItem = {
        label: province,
        value: province,
      }
      if (city !== '空') {
         provinceItem.children = [
           {
             label: city,
             value: city,
           }
         ]
         if (district !== '空') {
            provinceItem.children[0].children = [
              {
                label: district,
                value: district,
              }
            ]

         }
      }

      result.push(provinceItem)
    }

  })

  return result;
}
