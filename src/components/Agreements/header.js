import React from 'react';

import { useSelector } from 'react-redux';

export default function FilterArguments({ segment, local }) {
	const { convenio_locais, convenio_segmento } = useSelector(state => ({
		convenio_locais: state.convenio_locais.items,
		convenio_segmento: state.convenio_segmento.items
	}));

	const convenio_locaisFiltered = convenio_locais
		.filter(item => item.id === local)
		.map(item => {
			return 'Você está vendo convênios em ' + item.name;
		});

	const convenio_segmentoFiltered = convenio_segmento
		.filter(item => item.id === segment)
		.map(item => {
			return ' de ' + item.name;
		});

	return (
		<div className="row filterResult text-center">
			<div className="col-12">
				<h3 className="tit_layout_01">
					{convenio_locaisFiltered.length > 0 ||
					convenio_segmentoFiltered.length > 0
						? `${convenio_locaisFiltered} ${convenio_segmentoFiltered}`
						: 'Exibindo os últimos convênios'}
					<span>Utilize o menu ao lado para navegar</span>
				</h3>
			</div>
		</div>
	);
}
