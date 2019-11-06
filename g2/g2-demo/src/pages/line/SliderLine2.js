/**
 * 日期：2017-08-25
 * descriptions: slider插件（控制两个chart）
 * https://antv.alipay.com/g2/demo/02-line/line-02.html
 * difficulty：在react实例化两个chart对象
 */

import React, { Component } from 'react'
import createG2 from 'g2-react'
import G2 from 'g2'
import  axios from 'axios'
import 'g2-plugin-slider'

const Chart = createG2(chart => {
	const data = chart.get('data');  //获取frame
	chart.destroy(); //销毁 chart对象
	//流量
	let flowChart = new G2.Chart({
		id: 'c1',
		forceFit: true,
		height: 250
	});
	flowChart.source(data, {
		time: {
			type: 'time',
			tickCount: 8,
			mask: 'm/dd H:mm'
		}
	});
	flowChart.axis('time', {
		title: null,
		labelOffset: 35
	});
	flowChart.axis('flow', {
		title: null
	});
	flowChart.line().position('time*flow').color('#B03A5B').size(2);
	flowChart.guide().text(['min', 'max'], '流量(m^3/s)');

	//降雨量
	let rainChart = new G2.Chart({
		id: 'c1',
		forceFit: true,
		height: 180,
		plotCfg: {
			margin: [5, 80]
		}
	});

	rainChart.source(data, {
		time: {
			type: 'time',
			mask: 'm/dd H:mm'
		}
	});

	rainChart.axis('time', {
		time: null,
		labels: null
	});
	rainChart.axis('rain', {
		title: null
	});
	rainChart.coord().reflect('y');
	rainChart.line().position('time*rain').color('#293c55').size(2);
	rainChart.guide().text(['min', 'max'], '降雨量(mm)');

	const slider = new G2.Plugin.slider({
		domId: 'slider', //DOM id
		height: 26,
		xDim: 'time',
		yDim: 'flow',
		charts: [flowChart, rainChart]
	});
	slider.render();

})

class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}
	componentDidMount() {
		axios.get('/src/data/rain-flow.json').then(response => {
			this.setState({
				data: response.data
			});
		}).catch(error => console.log(error))
	}
	render() {
		return (
			<div>
				<h4>某城市某时间段雨量流量关系图</h4>
				{
					this.state.data.length === 0 ?
					<div></div>
					:
					<Chart
						data={this.state.data}
						width={0}
						height={0}
						/>
					
				}
				<div id="c1"></div>
				<div id="slider"></div>
			</div>
		)
	}
}

export default MyComponent