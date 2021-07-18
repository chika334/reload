import {CLEAR_ERROR, GET_ERROR} from './types';

export const returnErrors = (message, status, id = null) => {
	return {
		type: GET_ERROR,
		payload: { message, status, id }
	}
}

export const clearErrors = () => {
	return {
		type: CLEAR_ERROR
	}
}