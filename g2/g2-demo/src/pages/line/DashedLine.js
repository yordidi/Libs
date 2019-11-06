/**
 * 日期：2017-08-25
 * descriptions: 带虚线部分的折线图
 * https://antv.alipay.com/g2/demo/02-line/line-of-dashed.html
 * difficulty：怎么给Chart组件传递两个data(即json数组)
 */

import React, { Component } from 'react'
import createG2 from 'g2-react'

const second = 1000;
const minute = 1000 * 60;
const hour = 60 * minute;
const day = 24 * hour;

const toInterge = (number, fix=1) => {
	if (Math.round(number) === number) {
		return `${number}`;
	}
	return `${Number(number).toFixed(fix)}`;
}

const humanizeDuration = (duration, fix=1) => {
	if (duration === 0) {
		return 0;
	}
	if (duration < minute) {
		return `${toInterge(duration / second, fix)} 秒`;
	}
	if (duration < hour) {
		return `${toInterge(duration / minute, fix)} 分`;
	}
	if (duration < day) {
		return `${toInterge(duration / hour, fix)} 小时`;
	}
	return `${toInterge(duration / hour / 24, fix)} 天`;
}

const pick = (data, field) => {
	return data.map(item => {
		const result = {};
		for (const key in item) {
			if (item.hasOwnProperty(key) && field.indexOf(key) !== -1) {
				result[key] = item[key]
			}
		}
		return result;
	})
}

const Chart = createG2(chart => {
	const frame = chart.get('data');

	chart.legend({
		mode: false,
		position: 'bottom',
		dy: 5
	});
	chart.axis('date', {
		title: false
	});
	const scale = {
		date: {
			alias: '日期',
			type: 'time',
			mask: 'mm-dd'
		},
		pv: {
			alias: '进入次数',
			min: 0
		},
		time: {
			alias: '平均时长',
			formatter: value => humanizeDuration(value,0)
		},
		count: {
			alias: '次数'
		}
	}

	const view1 = chart.createView();
	view1.source(pick(frame.data, ['pv', 'time', 'date']), scale);
	view1.line().position('date*time').color('#9AD681').size(2);
	// chart.line().position('date * time').size(3);
	chart.render();
})

class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{"date":1489593600000, "pv":17, "successRate":0.23529411764705882, "time":12351000, "count":4},
		        {"date":1489680000000, "pv":10, "successRate":0.6, "time":18000, "count":6},
		        {"date":1489766400000, "pv":3, "successRate":0, "time":0, "count":0},
		        {"date":1489852800000, "pv":3, "successRate":0, "time":0, "count":0},
		        {"date":1489939200000, "pv":18, "successRate":0.2222222222222222, "time":21157000, "count":4},
		        {"date":1490025600000, "pv":32, "successRate":0.25, "time":3543000, "count":8},
		        {"date":1490112000000, "pv":25, "successRate":0.56, "time":10000, "count":14},
		        {"date":1490198400000, "pv":23, "successRate":0.43478260869565216, "time":24000, "count":10},
		        {"date":1490284800000, "pv":7, "successRate":0.2857142857142857, "time":0, "count":2}
			],
			height: 320,
			width: 400,
			plotCfg: {
				margin: [ 40, 80, 80, 80 ]
			},
			forceFit: true
		}
	}
	render() {
		return (
			<div>
				<Chart 
					data={this.state.data}
					height={this.state.height}
					width={this.state.width}
					forceFit={this.state.forceFit}
					plotCfg={this.state.plotCfg}
					/>
			</div>
		)
	}
}

export default MyComponent
