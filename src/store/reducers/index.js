import { combineReducers } from 'redux';

import agreements from './agreements';
import convenio_segmento from './convenio_segmento';
import convenio_locais from './convenio_locais';
import filter from './filter';

export default combineReducers({
	agreements,
	convenio_segmento,
	convenio_locais,
	filter
});
