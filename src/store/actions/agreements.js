export const FETCH_AGREEMENTS_BEGIN = 'FETCH_AGREEMENTS_BEGIN';
export const FETCH_AGREEMENTS_SUCCESS = 'FETCH_AGREEMENTS_SUCCESS';
export const FETCH_AGREEMENTS_FAILURE = 'FETCH_AGREEMENTS_FAILURE';

export const fetchAgreementsBegin = () => ({
	type: FETCH_AGREEMENTS_BEGIN
});

export const fetchAgreementsSuccess = agreements => ({
	type: FETCH_AGREEMENTS_SUCCESS,
	payload: { agreements }
});

export const fetchAgreementsFailure = error => ({
	type: FETCH_AGREEMENTS_FAILURE,
	payload: { error }
});

async function getAgreements() {
	const response = await fetch(
		'http://localhost/rap/sisejufe/wp-json/wp/v2/convenio/'
	);
	const res = await handleErrors(response);
	return res.json();
}

export function fetchAgreements() {
	return async dispatch => {
		dispatch(fetchAgreementsBegin());
		try {
			const json = await getAgreements();
			dispatch(fetchAgreementsSuccess(json));
			return json.agreements;
		} catch (error) {
			return dispatch(fetchAgreementsFailure(error));
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
