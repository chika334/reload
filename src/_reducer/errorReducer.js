import { CLEAR_ERROR, GET_ERROR } from "../_action/types.js";

const initialState = {
  message: {},
  status: null,
  id: null,
  error: false,
};

function error(state = initialState, action) {
  switch (action.type) {
    case GET_ERROR:
      return {
        message: action.payload.message,
        status: action.payload.status,
        id: action.payload.id,
        error: true,
      };
    case CLEAR_ERROR:
      return {
        message: {},
        status: null,
        id: null,
        error: false,
      };
    default:
      return state;
  }
}

export default error;
