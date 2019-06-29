import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Segment({ idParent }) {
	const { agreements, convenio_locais, convenio_segmento } = useSelector(
		state => ({
			agreements: state.agreements.items,
			convenio_locais: state.convenio_locais.items,
			convenio_segmento: state.convenio_segmento.items
		})
	);

	const filtered_parent_obj = agreements
		.filter(agreement => agreement.convenio_locais.indexOf(idParent) !== -1)
		.map(agreementFiltered => agreementFiltered.convenio_segmento)
		.flat();

	const filtered_parent_obj_filtered = filtered_parent_obj.filter(
		(item, index) => {
			return filtered_parent_obj.indexOf(item) === index;
		}
	);

	const filtered_parent_obj_to_segment = filtered_parent_obj_filtered.map(
		segmento =>
			convenio_segmento.filter(segmentoParent => segmentoParent.id === segmento)
	);

	const local_slug = convenio_locais
		.filter(item => item.id === idParent)
		.map(itemInner => itemInner.slug);

	return filtered_parent_obj_to_segment.length > 0 ? (
		<ul className="lista_de_segmentos child">
			{filtered_parent_obj_to_segment.map(segmento =>
				segmento.map(segmentoInner => (
					<li key={segmentoInner.id} className="segment">
						<Link
							to={
								'/rap/sisejufe/guia-de-convenios/' +
								local_slug +
								'/' +
								segmentoInner.slug
							}
						>
							{segmentoInner.name}
						</Link>
					</li>
				))
			)}
		</ul>
	) : (
		false
	);
}
