import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import States from './states';
import Segment from './segment';

export default function Locals({ locals }) {
	const [handleLocals, sethandleLocals] = useState([]);

	useEffect(() => {
		sethandleLocals(locals);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function toogleVisibility(id) {
		const newHandleLocals = handleLocals.map(local => {
			return local.id === id ? { ...local, favorite: !local.favorite } : local;
		});
		sethandleLocals(newHandleLocals);
	}

	// const envLocalWP = '/rap/sisejufe/guia-de-convenios/';
	const envLocalWP = '/';

	return (
		<ul className="lista_de_locais">
			{handleLocals.map(local => (
				<li
					id={'itemlocal' + local.id}
					key={local.id}
					className={local.favorite ? 'active' : 'closed'}
				>
					<Link
						onClick={() => toogleVisibility(local.id)}
						to={envLocalWP + local.slug}
					>
						<i className="icone fas fa-caret-right" />
						{local.name}
					</Link>
					<Segment idParent={local.id} />
					<States locals={local.estados} />
				</li>
			))}
		</ul>
	);
}
