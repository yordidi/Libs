/**
 * 日期：2017-08-25
 * descriptions: 简单的折线图
 * 可以是虚线
 * difficulty：no
 */

import React, { Component } from 'react'
import createG2 from 'g2-react'
import { Stat, Frame } from 'g2'

const Chart = createG2(chart => {
	chart.col('month', {
		alias: '月份',
		range: [0, 1]
	});
	chart.col('temperature', {
		alias: '平均温度(℃)'
	});
	chart.line().position('month * temperature').size(2).style({
		lineDash: [ 4, 4 ]
	});
	chart.render();
});

class SimpleLine extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{month: 'Jan', temperature: 7.0},
	            {month: 'Feb', temperature: 6.9},
	            {month: 'Mar', temperature: 9.5},
	            {month: 'Apr', temperature: 14.5},
	            {month: 'May', temperature: 18.2},
	            {month: 'Jun', temperature: 21.5},
	            {month: 'Jul', temperature: 25.2},
	            {month: 'Aug', temperature: 26.5},
	            {month: 'Sep', temperature: 23.3},
	            {month: 'Oct', temperature: 18.3},
	            {month: 'Nov', temperature: 13.9},
	            {month: 'Dec', temperature: 9.6}
			],
			forceFit: true,
			width: 500,
			height: 450
		}
	}
	render() {
		return (
			<div>
				<Chart
					data={this.state.data}
					width={this.state.width}
					height={this.state.height}
					forceFit={this.state.forceFit}
					/>
			</div>
		)
	}
}

export default SimpleLine