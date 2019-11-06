/**
 * Title：转换时间格式 工具
 * Date: 2018-4-23
 * Author: yaodi
 */

/**
 * 计算距离目标日子的剩余天数、小时、分钟、秒
 * @param  {[Number]} year   [年]
 * @param  {[Number]} month  [description]
 * @param  {[Number]} date   [description]
 * @param  {[Number]} hour   [description]
 * @param  {[Number]} minute [description]
 * @param  {[Number]} second [description]
 * @return {[Object]}        [description]
 */
export const diff_time = (year, month, date, hour, minute, second) => {
	//目标时间
	let goalTime = new Date();
	goalTime.setFullYear(year)
	goalTime.setMonth(month-1)
	goalTime.setDate(date)
	goalTime.setHours(hour)
	goalTime.setMinutes(minute)
	goalTime.setSeconds(second)
	//现在时间
	const nowTime = new Date().getTime();
	//差值时间
	const restTime = goalTime.getTime() - nowTime;
	//差值时间小于0  返回null
	if (restTime < 0) return;
	//处理剩余时间，需要返回格式
	const Day = parseInt((restTime/(24 * 60 * 60 * 1000)));
	const Hour = fixedNum((restTime%(24 * 60 * 60 * 1000)) /(60 * 60 * 1000));
	const Minute = fixedNum((restTime % (24 * 60 * 60 * 1000)) %(60 * 60 * 1000) / (60 * 1000));
	const Seconds = fixedNum((restTime % (24 * 60 * 60 * 1000)) %(60 * 60 * 1000) % (60 * 1000) / 1000);

	return { Day, Hour, Minute, Seconds };
}
/**
 * 修正时间格式，小于10，首位加0
 * @param  {[Number]} num [description]
 * @return {[String]}     [description]
 */
export const fixedNum = num => {
	let resNum = parseInt(num);
	return resNum > 9 ? resNum : `0${resNum}`;
}

/**
 * 时间戳转化成日期格式
 * @param  {Number} times [时间戳]
 * @return {String}       [description]
 */
export function formatDate(times) {

  const date = new Date(times);
  var options = {
       year: "numeric", month: "short",
      day: "numeric", hour: "2-digit", minute: "2-digit"
  };
  return date.toLocaleTimeString("ja-JP", options);
}