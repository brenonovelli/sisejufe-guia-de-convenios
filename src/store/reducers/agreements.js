import {
	FETCH_AGREEMENTS_BEGIN,
	FETCH_AGREEMENTS_SUCCESS,
	FETCH_AGREEMENTS_FAILURE
} from '../actions/agreements';

const initialState = {
	items: [],
	loading: false,
	error: null
};

export default function agreements(state = initialState, action) {
	switch (action.type) {
		case FETCH_AGREEMENTS_BEGIN:
			return {
				...state,
				loading: true,
				error: null
			};

		case FETCH_AGREEMENTS_SUCCESS:
			return {
				...state,
				loading: false,
				items: action.payload.agreements
			};

		case FETCH_AGREEMENTS_FAILURE:
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

// http://localhost/rap/sisejufe/wp-json/wp/v2/convenio?convenio_segmento=52&convenio_locais=68
