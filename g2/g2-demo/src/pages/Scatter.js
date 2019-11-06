import React, { Component } from 'react'
import createG2 from 'g2-react'
import { Stat, Frame } from 'g2'
import axios from 'axios'

const Chart = createG2(chart => {
	const frame = chart.get('data');
	const hAvg = Frame.mean(frame, 'height'); //计算体重的均值
	const wAvg = Frame.mean(frame, 'weight'); //计算身高均值
	const lineCfg = { //线的配置信息
		stroke: '#94E08A'
	};
	chart.cols({
		weight: {
			alias: '体重(kg)'
		},
		height: {
			alias: '身高(cm)'
		}
	});
	chart.tooltip({
		title: null,
		crosshairs: {
			type: 'cross'
		}
	});

	chart.point().position('height*weight').color('gender', ['rgba(223, 83, 83, 0.7)', 'rgba(119, 152, 191, 0.7)']).shape('gender', ['circle', 'diamond']).size(6).tooltip('gender*height*weight');
	chart.guide().tag([hAvg, 'min'], [hAvg, 'max'], '身高平均值: ' + hAvg.toFixed(2), {line:lineCfg});
  	chart.guide().tag(['min', wAvg], ['max', wAvg], '体重平均值: ' + wAvg.toFixed(2), {line:lineCfg});
  	chart.render();
});

class Scatter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
          	forceFit: true,
          	width: 500,
          	height: 450,
		}
	}
	componentDidMount() {
        const self = this;
        axios.get('src/data/scatter.json').then(function (response) {
          self.setState({
            data: response.data
          });
        }).catch(function (error) {
          console.log(error);
        });
    }
  	render() {
    	if (this.state.data.length === 0) {
      		return (<div></div>);
    	} else {
      		return (
	        	<div>
		          <Chart
		            data={this.state.data}
		            width={this.state.width}
		            height={this.state.height}
		            plotCfg={this.state.plotCfg}
		            forceFit={this.state.forceFit} />
	  			</div>
      		);
    	}
    }
}

export default Scatter