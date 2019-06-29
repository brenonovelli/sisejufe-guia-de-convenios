import {
	FETCH_AGREEMENTSSEGMENTS_BEGIN,
	FETCH_AGREEMENTSSEGMENTS_SUCCESS,
	FETCH_AGREEMENTSSEGMENTS_FAILURE
} from '../actions/convenio_segmento';

const initialState = {
	items: [],
	loading: false,
	error: null
};

export default function convenio_segmento(state = initialState, action) {
	switch (action.type) {
		case FETCH_AGREEMENTSSEGMENTS_BEGIN:
			return {
				...state,
				loading: true,
				error: null
			};

		case FETCH_AGREEMENTSSEGMENTS_SUCCESS:
			return {
				...state,
				loading: false,
				items: action.payload.agreements
			};

		case FETCH_AGREEMENTSSEGMENTS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
				items: []
			};

		default:
			return state;
	}
}

// http://localhost/rap/sisejufe/wp-json/wp/v2/convenio_segmento?per_page=100
