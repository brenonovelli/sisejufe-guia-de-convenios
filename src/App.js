import React from 'react';

import Routes from './routes';

// import Filter from './components/Filter';
import Agreements from './components/Agreements';

export default function App() {
	return (
		<div className="AppConvenios container py-5">
			<div className="row">
				<Routes />
				<Agreements />
			</div>
		</div>
	);
}
