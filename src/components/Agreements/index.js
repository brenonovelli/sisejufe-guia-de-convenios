import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchAgreements } from '../../store/actions/agreements';
// import { slugToId } from './actions';

import FilterArguments from './header';
import ItemAgreement from './item';

export default function Agreements() {
	const [activesItem, setactiveItem] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAgreements());
	}, [dispatch]);

	const {
		agreements,
		convenio_locais,
		convenio_segmento,
		loading,
		error,
		activeSegments,
		activeLocals
	} = useSelector(state => ({
		agreements: state.agreements.items,
		loading: state.agreements.loading,
		error: state.agreements.error,
		activeSegments: state.filter.activeSegments,
		activeLocals: state.filter.activeLocals,
		convenio_locais: state.convenio_locais.items,
		convenio_segmento: state.convenio_segmento.items
	}));

	const slugToId = object => {
		let objectParent = 0;

		if (object.length > 0) {
			if (object === activeLocals) {
				objectParent = convenio_locais;
			} else if (object === activeSegments) {
				objectParent = convenio_segmento;
			}
		}

		return objectParent === 0
			? (objectParent = 0)
			: parseInt(
					objectParent
						.filter(item => item.slug === object)
						.map(itemInner => itemInner.id)
			  );
	};

	const activeLocalsID = slugToId(activeLocals);
	const activeSegmentsID = slugToId(activeSegments);

	useEffect(() => {
		const agreementsFiltered = agreements.filter(agreement => {
			if (activeSegmentsID !== 0 && activeLocalsID !== 0) {
				return (
					agreement.convenio_locais.indexOf(activeLocalsID) > -1 &&
					agreement.convenio_segmento.indexOf(activeSegmentsID) > -1
				);
			} else if (activeSegmentsID === 0 && activeLocalsID !== 0) {
				return agreement.convenio_locais.indexOf(activeLocalsID) > -1;
			} else {
				return agreement.status === 'publish';
			}
		});

		//
		setactiveItem(agreementsFiltered);
	}, [
		activeLocals,
		activeLocalsID,
		activeSegments,
		activeSegmentsID,
		agreements,
		convenio_locais,
		convenio_segmento
	]);

	if (error) {
		return <div>Error! {error.message}</div>;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	function handleFavorite(id) {
		// const newRepositories = { ...activeItem, favorite: !activeItem.favorite };
		const newRepositories = activesItem.map(agreement => {
			return agreement.favorite === true
				? { ...agreement, favorite: !agreement.favorite }
				: agreement;
		});
		const newRepositories2 = newRepositories.map(agreement => {
			return agreement.id === id
				? { ...agreement, favorite: !agreement.favorite }
				: agreement;
		});
		setactiveItem(newRepositories2);
	}

	return (
		<div className="AgreementsList col-9">
			{/* Header */}
			<FilterArguments segment={activeSegmentsID} local={activeLocalsID} />
			{/* Listagem */}
			<div className="row AgreementsListItems">
				{activesItem.map(agreement => (
					<div
						key={agreement.id}
						onClick={() => handleFavorite(agreement.id)}
						className={
							'AgreementItem ' +
							(agreement.favorite
								? 'col-12 my-5 active order-first'
								: 'col-3 my-5')
						}
					>
						<ItemAgreement agreement={agreement} />
					</div>
				))}
			</div>
		</div>
	);
}
