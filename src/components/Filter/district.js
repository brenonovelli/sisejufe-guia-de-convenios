import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import Segment from './segment';

export default function District({ locals }) {
	const localFiltered = Object.values(locals).filter(item => item.count !== 0);

	const [handleLocals, sethandleLocals] = useState([]);

	useEffect(() => {
		sethandleLocals(localFiltered);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function toogleVisibility(id) {
		const newHandleLocals = handleLocals.map(local => {
			return local.id === id ? { ...local, active: !local.active } : local;
		});
		sethandleLocals(newHandleLocals);
	}

	return handleLocals.length > 0 ? (
		<ul className="lista_de_bairros child">
			{handleLocals.map(local => (
				<li
					id={'itemlocal' + local.id}
					key={local.id}
					className={local.active ? 'active' : 'closed'}
				>
					<Link
						onClick={() => toogleVisibility(local.id)}
						to={'/rap/sisejufe/guia-de-convenios/' + local.slug}
					>
						<i className="icone fas fa-caret-right" />
						{local.name}
						<span className="count">{local.count}</span>
					</Link>
					<Segment idParent={local.id} />
				</li>
			))}
		</ul>
	) : (
		false
	);
}
