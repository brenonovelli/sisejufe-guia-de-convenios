import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import District from './district';
import Segment from './segment';

export default function City({ locals }) {
	const [handleLocals, sethandleLocals] = useState([]);

	useEffect(() => {
		const checkChildren = id => {
			return Object.values(locals)
				.filter(cidade => cidade.id === id)
				.map(cidade => Object.values(cidade.bairros))
				.flat()
				.filter(bairro => bairro.count > 0).length;
		};

		const newChildCount = Object.values(locals)
			.map(local => {
				return { ...local, countChild: checkChildren(local.id) };
			})
			.filter(item => item.countChild > 0 || item.count > 0);
		sethandleLocals(newChildCount);
		// sethandleLocals(Object.values(locals));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function toogleVisibility(id) {
		const newHandleLocals = handleLocals.map(local => {
			return local.id === id ? { ...local, active: !local.active } : local;
		});
		sethandleLocals(newHandleLocals);
	}

	return handleLocals.length > 0 ? (
		<ul className="lista_de_cidades child">
			{/* {console.log(handleLocals)} */}
			{handleLocals.map(local =>
				local.countChild > 0 || local.count > 0 ? (
					<li
						key={local.id}
						id={'itemlocal' + local.id}
						className={local.active ? 'active' : 'closed'}
					>
						<Link
							to={'/rap/sisejufe/guia-de-convenios/' + local.slug}
							onClick={() => toogleVisibility(local.id)}
						>
							<i className="icone fas fa-caret-right" />
							{local.name}
						</Link>
						<Segment idParent={local.id} />
						<District locals={local.bairros} />
					</li>
				) : (
					false
				)
			)}
		</ul>
	) : (
		false
	);
}
