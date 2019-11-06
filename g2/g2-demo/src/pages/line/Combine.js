/**
 * 日期： 2017-08-28
 * decription: 合并列
 */

import React, { Component } from 'react'
import createG2 from 'g2-react'
import axios from 'axios'
import { Frame } from 'g2'

const Chart = createG2(chart => {
	chart.col('date', {
		type: 'time',
		mask: 'yyyy.mm',
		tickCount: 12
	});
	chart.col('value', {
		alias: 'Temperature, ºF'
	});
	chart.legend({
		position: 'bottom'
	});
	chart.axis('date', {
		line: null,
		tickLine: {
			stroke: '#000',
			value: 6
		},
		title: null
	});
	chart.axis('value', {
		tickLine: {
			stroke: '#000',
			value: 6
		},
		labels: {
			label: {
				fill: '#000'
			}
		},
		line: {
			stroke: '#000'
		},
		grid: null
	});
	chart.line().position('date*value').color('city', ['#1f77b4', '#ff7f0e', '#2ca02c'])
		 .shape('spline').size(2);
	chart.render();
});

class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {}
		}
	}
	componentDidMount() {
		axios.get('/src/data/avg-temp.json').then(response => {
			const data = response.data;
			let frame = new Frame(data);
			frame = Frame.combinColumns(frame, ['New York', 'San Francisco', 'Austin'], 'value', 'city', 'date');
			this.setState({
				data: frame
			})
		})
	}
	render() {
		return (
			<div>
				{
					this.state.data.data && this.state.data.data.length > 0 ? 
					<Chart
						data={this.state.data.data}
						width={800}
						height={600}
						/>
					:
					<div></div>
				}
			</div>
		);
	}
}

export default MyComponent