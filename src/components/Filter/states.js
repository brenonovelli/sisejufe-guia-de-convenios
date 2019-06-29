import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import City from './city';
import Segment from './segment';

export default function States({ locals }) {
	const [handleLocals, sethandleLocals] = useState([]);

	useEffect(() => {
		sethandleLocals(Object.values(locals));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function toogleVisibility(id) {
		const newHandleLocals = handleLocals.map(local => {
			return local.id === id ? { ...local, active: !local.active } : local;
		});
		sethandleLocals(newHandleLocals);
	}

	// const envLocalWP = '/rap/sisejufe/guia-de-convenios/';
	const envLocalWP = '/';

	return handleLocals.length > 0 ? (
		<ul className="lista_de_estados child">
			{handleLocals.map(local => (
				<li
					id={'itemlocal' + local.id}
					key={local.id}
					className={local.active ? 'active' : 'closed'}
				>
					<Link
						onClick={() => toogleVisibility(local.id)}
						to={envLocalWP + local.slug}
					>
						<i className="icone fas fa-caret-right" />
						{local.name}
					</Link>
					<Segment idParent={local.id} />
					<City locals={local.cidades} />
				</li>
			))}
		</ul>
	) : (
		false
	);
}
