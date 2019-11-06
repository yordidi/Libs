/**
 * 日期：2017-08-25
 * descriptions: slider插件
 * https://antv.alipay.com/g2/demo/02-line/line-01.html
 * difficulty：slider没渲染好(已解决，在data没有get到的时候不渲染Chart组件)
 */

import React, { Component } from 'react'
import createG2 from 'g2-react'
import G2 from 'g2'
import 'g2-plugin-slider'
import axios from 'axios'

const Chart = createG2(chart => {
	chart.col('date', {
		type: 'time',
		mask: 'yyyy-mm-dd',
		tickCount: 4,
		alias: '日期',
		nice: false
	});
	chart.col('aqi', {
		min: 0,
		ticks: [0, 50, 100, 150, 200, 300, 500],
		alias: 'AQI(空气质量指数)'
	});
	chart.axis('aqi', {
		grid: null
	});
	chart.axis('date', {
		labels: {
			autoRotate: false
		}
	});
	chart.line().position('date*aqi');
	chart.guide().rect(['min', 0], ['max', 50], {
		fill: '#5AC405',
		fillOpacity: 0.4
	});
	chart.guide().rect(['min', 50], ['max', 100], {
		fill: '#F9C709',
		fillOpacity: 0.4
	});
	chart.guide().rect(['min', 100], ['max', 150], {
		fill: '#FD942C',
		fillOpacity: 0.4
	});
	chart.guide().rect(['min', 150], ['max', 200], {
	    fill: '#e4440D',
	    fillOpacity: 0.4
  	});
  	chart.guide().rect(['min', 200], ['max', 300], {
	    fill: '#810043',
	    fillOpacity: 0.4
  	});
	chart.guide().rect(['min', 300], ['max', 500], {
	    fill: '#45001B',
	    fillOpacity: 0.4
  	});

  	const slider = new G2.Plugin.slider({
  		domId: 'slider', //DOM id
  		height: 26,
  		xDim: 'date',
  		yDim: 'aqi',
  		charts: chart,
  		start: '2011-06-02', //起始原始数据
  		end: '2012-03-10'  //结束原始数据
  	});
  	slider.render();
});

class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			forceFit: true,
			width: 500,
			height: 400
		}
	}
	componentDidMount() {
		axios.get('/src/data/peking-aqi.json').then(response => {
			this.setState({
				data: response.data
			});
		}).catch(error => console.log(error));
	}
	render() {
		return (
			<div>
				<h4>杭州市 2010-2015年 AQI 指数</h4>
				{
					this.state.data.length === 0 ?
					<div>
					</div>
					: 
					<Chart 
						data={this.state.data}
						width={this.state.width}
						height={this.state.height}
						forceFit={this.state.forceFit}
						/>
				}
				<div id="slider"></div>
			</div>
		)
	}
}

export default MyComponent