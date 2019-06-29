export function toggleSegment(activeSegments) {
	return {
		type: 'TOGGLE_SEGMENT',
		activeSegments
	};
}
export function toggleLocal(activeLocals) {
	return {
		type: 'TOGGLE_LOCAL',
		activeLocals
	};
}
export function toggleAgreements(activeLocals = [], activeSegments = []) {
	return {
		type: 'TOGGLE_AGREEMENTS',
		activeLocals,
		activeSegments
	};
}
