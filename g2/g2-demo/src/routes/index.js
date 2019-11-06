import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from '../components/App';
import Hello from '../components/Hello';
// import Vx from '../pages/Vx';
import Scatter from '../pages/Scatter';
import SimpleLine from '../pages/line/SimpleLine';
import DashedLine from '../pages/line/DashedLine';
import SliderLine from '../pages/line/SliderLine';
import SliderLine2 from '../pages/line/SliderLine2';
import Combine from '../pages/line/Combine';
import StepLine from '../pages/line/StepLine';
import SparkLines from '../pages/line/SparkLines';
import RedialLine from '../pages/line/RedialLine';

/*
 * Define routes
 */
const routes = [{
	path: '/',
	component: App,
	indexRoute: { component: Hello },
	childRoutes: [
		{
			path: '/scatter',
			component: Scatter
		},
		{
			path: '/simpleline',
			component: SimpleLine
		},
		{
			path: '/dashline',
			component: DashedLine
		},
		{
			path: '/sliderline',
			component: SliderLine
		},
		{
			path: '/sliderline2',
			component: SliderLine2
		},
		{
			path: '/combine',
			component: Combine
		},
		{
			path: '/stepline',
			component: StepLine
		},
		{
			path: '/sparklines',
			component: SparkLines
		},
		{
			path: '/redialline',
			component: RedialLine
		}
	]
}];

export default () => (
	<Router history={browserHistory} routes={routes} />
);