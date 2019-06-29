const INITIAL_STATE = {
	activeSegments: 0,
	activeLocals: 0
};

export default function filter(state = INITIAL_STATE, action) {
	if (action.type === 'TOGGLE_SEGMENT') {
		return {
			...state,
			activeSegments: action.activeSegments
		};
	}

	if (action.type === 'TOGGLE_LOCAL') {
		return {
			...state,
			activeLocals: action.activeLocals
		};
	}
	if (action.type === 'TOGGLE_AGREEMENTS') {
		return {
			...state,
			activeSegments: action.activeSegments,
			activeLocals: action.activeLocals
		};
	}

	return state;
}
