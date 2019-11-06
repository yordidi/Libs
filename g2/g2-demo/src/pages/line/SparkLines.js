/**
 * 日期：2017-08-28	
 * descripte: 走势图
 * 走势线是一种紧凑简洁的数据趋势表达方式，它通常以折线图为基础，
 * 大小与文本相仿，往往直接嵌入在文本或表格中。由于尺寸限制，趋势图
 * 无法表达太多的细节信息，常用于商业数据表达，如股票走势、市场行情等。
 * 注意： style在Chart上无效。可以用一个设定了style的包裹层。
 */

import React, { Component } from 'react'
import createG2 from 'g2-react'
import G2 from 'g2'

const Chart = createG2(chart => {
	chart.axis(false);
	chart.tooltip({
		title: null
	});
	chart.line().position('x*y').tooltip('x*y').size(2);
	chart.render();
});

class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data1: [
				{"x":1,"y":48.93},{"x":2,"y":52.68},{"x":3,"y":56.44},{"x":4,"y":61.31},{"x":5,"y":66.03},{"x":6,"y":71.42},{"x":7,"y":72.34},{"x":8,"y":71.69},{"x":9,"y":70.75},{"x":10,"y":70}
			],
			data2: [
				{"x":1,"y":104.1},{"x":2,"y":106.2},{"x":3,"y":104.97},{"x":4,"y":105.63},{"x":5,"y":106.4},{"x":6,"y":107.24},{"x":7,"y":105.59},{"x":8,"y":106.5},{"x":9,"y":105.97},{"x":10,"y":104.66}
			],
			width: 100,
			height: 18,
			plotCfg: {
				margin: [0, 10]
			}
		}
	}
	render() {
		return (
			<div>
				side of the flow of the text, i.e.:
				<div style={{display:'inline-block'}}>
					<Chart 
						data={this.state.data1}
						width={this.state.width}
						height={this.state.height}
						plotCfg={this.state.plotCfg}
						/>
				</div>
				temperature 22.4 °C', or be set inside it, 
				<Chart 
					data={this.state.data2}
					width={this.state.width}
					height={this.state.height}
					plotCfg={this.state.plotCfg}
					/>,
				to visualize evidence on the spot.
			</div>
		);
	}
}

export default MyComponent