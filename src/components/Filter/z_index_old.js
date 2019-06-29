import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchAgreementsLocals } from '../../store/actions/convenio_locais';
import { fetchAgreementsSegments } from '../../store/actions/convenio_segmento';
import * as filterActions from '../../store/actions/filter';

export default function Filter() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAgreementsLocals());
		dispatch(fetchAgreementsSegments());
	}, [dispatch]);

	const {
		agreements,
		convenio_locais,
		loading_convenio_locais,
		error_convenio_locais,
		convenio_segmento,
		loading_convenio_segmento,
		error_convenio_segmento
	} = useSelector(state => ({
		agreements: state.agreements.items,
		convenio_locais: state.convenio_locais.items,
		loading_convenio_locais: state.convenio_locais.loading,
		error_convenio_locais: state.convenio_locais.error,
		convenio_segmento: state.convenio_segmento.items,
		loading_convenio_segmento: state.convenio_segmento.loading,
		error_convenio_segmento: state.convenio_segmento.error
	}));

	if (error_convenio_locais) {
		return <div>Error! {error_convenio_locais.message}</div>;
	}

	if (loading_convenio_locais) {
		return <div>Carregando locais...</div>;
	}

	if (error_convenio_segmento) {
		return <div>Error! {convenio_segmento.message}</div>;
	}

	if (loading_convenio_segmento) {
		return <div>Carregando segmentos...</div>;
	}

	/* Functions Local */
	function toggleLocal(local) {
		dispatch(filterActions.toggleLocal(local));
	}
	function toggleSegment(segmento) {
		dispatch(filterActions.toggleSegment(segmento));
	}
	function toggleAgreements(segmento, local) {
		dispatch(filterActions.toggleAgreements(segmento, local));
	}

	const convenio_locais_filtered = convenio_locais;

	// const convenio_locais_filtered = convenio_locais.filter(
	// 	local => local.count >= 1
	// );

	function list() {
		// const list = convenio_locais_filtered.map(pais => pais);
		// const filtered_parent_obj_to_segment = filtered_parent_obj_filtered.map(
		// 	segmento =>
		// 		convenio_segmento.filter(
		// 			segmentoParent => segmentoParent.id === segmento
		// 		)
		// );
		// const rootLocals = convenio_locais_filtered.filter(
		// 	local => local.parent === 0
		// );

		const rootLocals = convenio_locais_filtered
			.filter(local => local.parent === 0)
			.map(localRoot => ({
				...localRoot,
				estados: {
					...convenio_locais_filtered
						.filter(estadoParent => estadoParent.parent === localRoot.id)
						.map(estadoInner => ({
							...estadoInner,
							cidades: {
								...convenio_locais_filtered
									.filter(
										cidadeParent => cidadeParent.parent === estadoInner.id
									)
									.map(cidadeInner => ({
										...cidadeInner,
										bairros: {
											...convenio_locais_filtered.filter(
												bairroParent => bairroParent.parent === cidadeInner.id
											)
										}
									}))
							}
						}))
				}
			}));

		console.log(rootLocals);

		// 	const filtered_parent_obj_to_segment = filtered_parent_obj_filtered.map(
		// 		segmento =>
		// 			convenio_segmento.filter(
		// 				segmentoParent => segmentoParent.id === segmento
		// 			)
		// 	);

		// filtered_parent_obj_to_segment.map(segmento =>
		// 	segmento.map(segmentoInner => (
		// 		toggleAgreements(segmentoInner.id, idParent)
		// 	))
		// )
	}
	list();

	function list_de_locais(idParent = 0) {
		const convenio_locais_filtered_parent = convenio_locais_filtered.filter(
			local => local.parent === idParent
		);
		if (convenio_locais_filtered_parent.length) {
			return convenio_locais_filtered_parent.map(local => (
				<li key={local.id}>
					<button
						type="submit"
						className="btn"
						onClick={() => toggleLocal(local.id)}
					>
						<strong>{local.name} </strong>
						<small>({local.count})</small>
					</button>
					{lista_de_estados(local.id)}
				</li>
			));
		}
	}
	// Estados
	function lista_de_estados(idParent) {
		const convenio_estados_filtered_parent = convenio_locais_filtered.filter(
			estado => estado.parent === idParent
		);
		if (convenio_estados_filtered_parent.length) {
			return (
				<ul className="lista_de_estados child">
					{convenio_estados_filtered_parent.map(estado => (
						<li key={estado.id}>
							<button
								type="submit"
								className="btn"
								onClick={() => toggleLocal(estado.id)}
							>
								<strong>{estado.name} </strong>
								<small>({estado.count})</small>
							</button>
							{lista_de_cidades(estado.id)}
						</li>
					))}
				</ul>
			);
		}
	}
	// Cidades
	function lista_de_cidades(idParent) {
		const convenio_cidades_filtered_parent = convenio_locais_filtered.filter(
			cidade => cidade.parent === idParent
		);
		if (convenio_cidades_filtered_parent.length) {
			return (
				<ul className="lista_de_cidades child">
					{convenio_cidades_filtered_parent.map(cidade => (
						<li key={cidade.id}>
							<button
								type="submit"
								className="btn"
								onClick={() => toggleLocal(cidade.id)}
							>
								<strong>{cidade.name} </strong>
								<small>({cidade.count})</small>
							</button>
							{lista_de_bairros(cidade.id)}
						</li>
					))}
				</ul>
			);
		}
	}
	// Bairros
	function lista_de_bairros(idParent) {
		const convenio_bairros_filtered_parent = convenio_locais_filtered.filter(
			bairro => bairro.parent === idParent
		);
		if (convenio_bairros_filtered_parent.length) {
			return (
				<ul className="lista_de_bairros child">
					{convenio_bairros_filtered_parent.map(bairro => (
						<li key={bairro.id}>
							<button
								type="submit"
								className="btn"
								onClick={() => toggleLocal(bairro.id)}
							>
								<strong>{bairro.name}</strong>
								<small>({bairro.count})</small>
							</button>
							{lista_de_segmentos(bairro.id)}
						</li>
					))}
				</ul>
			);
		}
	}
	// Segmentos
	function lista_de_segmentos(idParent) {
		const filtered_parent_obj = agreements
			.filter(agreement => agreement.convenio_locais.indexOf(idParent))
			.map(agreementFiltered => agreementFiltered.convenio_segmento)
			.flat();

		const filtered_parent_obj_filtered = filtered_parent_obj.filter(
			(item, index) => {
				return filtered_parent_obj.indexOf(item) === index;
			}
		);

		const filtered_parent_obj_to_segment = filtered_parent_obj_filtered.map(
			segmento =>
				convenio_segmento.filter(
					segmentoParent => segmentoParent.id === segmento
				)
		);

		if (filtered_parent_obj_to_segment.length) {
			return (
				<ul className="lista_de_segmentos child">
					{filtered_parent_obj_to_segment.map(segmento =>
						segmento.map(segmentoInner => (
							<li key={segmentoInner.id}>
								<button
									type="submit"
									className="btn"
									onClick={() => toggleAgreements(segmentoInner.id, idParent)}
								>
									<strong>{segmentoInner.name}</strong>
									<small>({segmentoInner.count})</small>
								</button>
							</li>
						))
					)}
				</ul>
			);
		}
	}

	/* Functions Segmentos */
	const convenio_segmento_filtered = convenio_segmento.filter(
		segmento => segmento.count >= 1
	);

	return (
		<div className="FilterList col-3">
			<h2>Locais</h2>
			<ul>{list_de_locais()}</ul>
			<h2>Segmentos</h2>
			<ul>
				{convenio_segmento_filtered.map(segmento => (
					<li key={segmento.id}>
						<button
							type="submit"
							className="btn"
							onClick={() => toggleSegment(segmento)}
						>
							<strong>{segmento.name}</strong>
							<small>({segmento.count})</small>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
