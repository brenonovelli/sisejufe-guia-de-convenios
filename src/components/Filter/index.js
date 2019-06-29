import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Locals from './locals';
import { fetchAgreementsLocals } from '../../store/actions/convenio_locais';
import { fetchAgreementsSegments } from '../../store/actions/convenio_segmento';
import * as filterActions from '../../store/actions/filter';

export default function Filter({ match }) {
	const dispatch = useDispatch();

	const localId = match.params.local ? match.params.local : [];
	const segmentoId = match.params.segmento ? match.params.segmento : [];

	useEffect(() => {
		function toggleAgreements(segmento, local) {
			dispatch(filterActions.toggleAgreements(segmento, local));
		}

		toggleAgreements(localId, segmentoId);
	}, [dispatch, localId, segmentoId]);

	useEffect(() => {
		dispatch(fetchAgreementsLocals());
		dispatch(fetchAgreementsSegments());
	}, [dispatch]);

	const { convenio_locais } = useSelector(state => ({
		convenio_locais: state.convenio_locais,
		loading_convenio_locais: state.convenio_locais.loading,
		error_convenio_locais: state.convenio_locais.error
	}));

	if (convenio_locais.error) {
		return <div>Error! {convenio_locais.error.message}</div>;
	}

	if (convenio_locais.loading) {
		return <div>Carregando locais...</div>;
	}
	
	// Criando a lista de locais
	const rootLocals = convenio_locais.items
		.filter(local => local.parent === 0)
		.map(localRoot => ({
			...localRoot,
			estados: {
				...convenio_locais.items
					.filter(estadoParent => estadoParent.parent === localRoot.id)
					.map(estadoInner => ({
						...estadoInner,
						cidades: {
							...convenio_locais.items
								.filter(cidadeParent => cidadeParent.parent === estadoInner.id)
								.map(cidadeInner => ({
									...cidadeInner,
									bairros: {
										...convenio_locais.items.filter(
											bairroParent => bairroParent.parent === cidadeInner.id
										)
									}
								}))
						}
					}))
			}
		}));

	return (
		<div className="FilterList col-3">
			<Locals locals={rootLocals} />
		</div>
	);
}
