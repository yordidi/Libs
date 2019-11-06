
/**
 * 2017-10-12 by yaodi 未完成
 * 将取出的列表按从A-Z进行排列，以便展示
 * 65-90是26个英文字母。
 * @return {Object} [description]
 */
const sortgroupcity = () => {
    let sortobj = {};
    for (let i = 65; i <= 90; i++) {
        if (this.groupcity[String.fromCharCode(i)]) {
            sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
        }
    }
    return sortobj
}

export default sortgroupcity
