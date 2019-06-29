import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import Agreements from './components/Agreements';
import Filter from './components/Filter';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/rap/sisejufe/guia-de-convenios/" exact component={Filter} />
			<Route
				path="/rap/sisejufe/guia-de-convenios/:local"
				exact
				component={Filter}
			/>
			<Route
				path="/rap/sisejufe/guia-de-convenios/:local/:segmento"
				component={Filter}
			/>
		</Switch>
	</BrowserRouter>
);

export default Routes;
