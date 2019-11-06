/**
 * 日期：2017-08-28
 * descripe: 极坐标
 * difficulty: 极坐标的原点是哪里？ 为何是 -3.5呢？
 */

import React, { Component } from 'react'
import createG2 from 'g2-react'
import G2 from 'g2'

const Chart = createG2(chart => {
	const data = chart.get('data').data;
	chart.col('count', {
		max: 12
	});
	chart.coord('theta', {
		inner: 0.2
	});
	chart.interval().position('term*count')
		 .color('#009999').shape('line');
	chart.point().position('term*count').color('#009999')
		 .shape('circle');
	for (let i = 0, l = data.length; i < l; i++) {
		const obj = data[i];
		chart.guide().text([obj.term, 0], obj.term + ' ', {
			textAlign: 'right'
		});
	}
	chart.guide().text([-3.5, 0], 'Music', {
		textAlign: 'center',
		fontSize: 28,
		fill: '#066'
	});
	chart.render();
});

class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{"term":"Zombieland","count":9},
		        {"term":"Wieners","count":8},
		        {"term":"Toy Story","count":8},
		        {"term":"trashkannon","count":7},
		        {"term":"the GROWLERS","count":6},
		        {"term":"mudweiser","count":6},
		        {"term":"ThunderCats","count":4},
		        {"term":"The Taqwacores - Motion Picture","count":4},
		        {"term":"The Shawshank Redemption","count":2},
		        {"term":"The Olivia Experiment","count":1}
			],
			plotCfg: {
				margin: [20, 80]
			}
		}
	}
	render() {
		return (
			<div>
				<Chart 
					data={this.state.data}
					plotCfg={this.state.plotCfg}
					width={800}
					height={500}
					/>
			</div>
		);
	}
}

export default MyComponent