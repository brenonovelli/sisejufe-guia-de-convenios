export const FETCH_AGREEMENTSLOCALS_BEGIN = 'FETCH_AGREEMENTSLOCALS_BEGIN';
export const FETCH_AGREEMENTSLOCALS_SUCCESS = 'FETCH_AGREEMENTSLOCALS_SUCCESS';
export const FETCH_AGREEMENTSLOCALS_FAILURE = 'FETCH_AGREEMENTSLOCALS_FAILURE';

export const fetchAgreementsLocalsBegin = () => ({
	type: FETCH_AGREEMENTSLOCALS_BEGIN
});

export const fetchAgreementsLocalsSuccess = agreements => ({
	type: FETCH_AGREEMENTSLOCALS_SUCCESS,
	payload: { agreements }
});

export const fetchAgreementsLocalsFailure = error => ({
	type: FETCH_AGREEMENTSLOCALS_FAILURE,
	payload: { error }
});

async function getAgreementsLocals() {
	const response = await fetch(
		'http://localhost/rap/sisejufe/wp-json/wp/v2/convenio_locais?per_page=100'
	);
	const res = await handleErrors(response);
	return res.json();
}

export function fetchAgreementsLocals() {
	return async dispatch => {
		dispatch(fetchAgreementsLocalsBegin());
		try {
			const json = await getAgreementsLocals();
			dispatch(fetchAgreementsLocalsSuccess(json));
			return json.agreements;
		} catch (error) {
			return dispatch(fetchAgreementsLocalsFailure(error));
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

// convenio_locais
//http://localhost/rap/sisejufe/wp-json/wp/v2/convenio_locais?per_page=100
