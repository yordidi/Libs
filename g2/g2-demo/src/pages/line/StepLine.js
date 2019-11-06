/**
 * 日期：2017-08-28
 * descripe: step-line。通过shape设定图形类型
 * shape的第二个参数是数组。（设定字符串，无效）
 */

import React, { Component } from 'react'
import createG2 from 'g2-react'
import G2 from 'g2'

const Chart = createG2(chart => {
	chart.line().position('x*y').color('type')
		 .size(3).shape('type', ['vh']); //shape的第二个参数是数组，不能是string
	chart.render();
});

class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{x: 1,y: 55,type: 'vh'},
		        {x: 2,y: 60,type: 'vh'},
		        {x: 3,y: 57,type: 'vh'},
		        {x: 4,y: 52,type: 'vh'},
		        {x: 5,y: 58,type: 'vh'},
		        {x: 1,y: 45,type: 'hv'},
		        {x: 2,y: 40,type: 'hv'},
		        {x: 3,y: 47,type: 'hv'},
		        {x: 4,y: 42,type: 'hv'},
		        {x: 5,y: 48,type: 'hv'},
		        {x: 1,y: 35,type: 'hvh'},
		        {x: 2,y: 30,type: 'hvh'},
		        {x: 3,y: 37,type: 'hvh'},
		        {x: 4,y: 32,type: 'hvh'},
		        {x: 5,y: 38,type: 'hvh'},
		        {x: 1,y: 25,type: 'vhv'},
		        {x: 2,y: 20,type: 'vhv'},
		        {x: 3,y: 27,type: 'vhv'},
		        {x: 4,y: 22,type: 'vhv'},
		        {x: 5,y: 28,type: 'vhv'}
			]
		}
	}
	render() {
			return (
				<div>
					<Chart 
						data={this.state.data}
						width={800}
						height={600}
						/>
				</div>
			);
		}	
}

export default MyComponent