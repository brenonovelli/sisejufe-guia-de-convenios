export const FETCH_AGREEMENTSSEGMENTS_BEGIN = 'FETCH_AGREEMENTSSEGMENTS_BEGIN';
export const FETCH_AGREEMENTSSEGMENTS_SUCCESS =
	'FETCH_AGREEMENTSSEGMENTS_SUCCESS';
export const FETCH_AGREEMENTSSEGMENTS_FAILURE =
	'FETCH_AGREEMENTSSEGMENTS_FAILURE';

export const fetchAgreementsSegmentsBegin = () => ({
	type: FETCH_AGREEMENTSSEGMENTS_BEGIN
});

export const fetchAgreementsSegmentsSuccess = agreements => ({
	type: FETCH_AGREEMENTSSEGMENTS_SUCCESS,
	payload: { agreements }
});

export const fetchAgreementsSegmentsFailure = error => ({
	type: FETCH_AGREEMENTSSEGMENTS_FAILURE,
	payload: { error }
});

async function getAgreementsSegments() {
	const response = await fetch(
		'http://localhost/rap/sisejufe/wp-json/wp/v2/convenio_segmento?per_page=100'
	);
	const res = await handleErrors(response);
	return res.json();
}

export function fetchAgreementsSegments() {
	return async dispatch => {
		dispatch(fetchAgreementsSegmentsBegin());
		try {
			const json = await getAgreementsSegments();
			dispatch(fetchAgreementsSegmentsSuccess(json));
			return json.agreements;
		} catch (error) {
			return dispatch(fetchAgreementsSegmentsFailure(error));
		}
	};
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

// convenio_segmento
// http://localhost/rap/sisejufe/wp-json/wp/v2/convenio_segmento?per_page=100
