import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import Agreements from './components/Agreements';
import Filter from './components/Filter';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" exact component={Filter} />
			<Route path="/:local" exact component={Filter} />
			<Route path="/:local/:segmento" component={Filter} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
