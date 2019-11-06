/**
 * date: 2018/12/27
 * 1. replace 不改变原字符串
 * 2. 去空格
 * 3. 去tag标签
 *
 * @type {string}
 */

const str = `<span style="color:blue">2018/12/27 下午15:48在</span>
                        <span style="color: red">浏览器搜索</span>
                        <span style="color: blue">中</span>
                        <span style="color: green">搜索了</span>
                        <span style="color: blue">阿登纳</span>`;


console.log(str.replace(/<[^>]+>/g, '').replace(/\s+/g, ''))

console.log(str)
