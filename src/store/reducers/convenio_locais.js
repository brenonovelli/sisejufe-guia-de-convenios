import {
	FETCH_AGREEMENTSLOCALS_BEGIN,
	FETCH_AGREEMENTSLOCALS_SUCCESS,
	FETCH_AGREEMENTSLOCALS_FAILURE
} from '../actions/convenio_locais';

const initialState = {
	items: [],
	loading: false,
	error: null
};

export default function convenio_locais(state = initialState, action) {
	switch (action.type) {
		case FETCH_AGREEMENTSLOCALS_BEGIN:
			return {
				...state,
				loading: true,
				error: null
			};

		case FETCH_AGREEMENTSLOCALS_SUCCESS:
			return {
				...state,
				loading: false,
				items: action.payload.agreements
			};

		case FETCH_AGREEMENTSLOCALS_FAILURE:
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

//http://localhost/rap/sisejufe/wp-json/wp/v2/convenio_locais?per_page=100
