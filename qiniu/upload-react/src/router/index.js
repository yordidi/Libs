import React from "react"
import { Router, Route, browserHistory } from 'react-router'
import Simple from "../components/Simple"
import Multiple from "../components/Multiple"

export default () => (
	<Router history={browserHistory}>
		<Route path="/" component={Simple} />
		<Route path="/multiple" component={Multiple} />
	</Router>
)
