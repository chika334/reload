import { USSD_SUCCESS } from "../_action/types.js";

const initialState = {
  success: true,
  data: null,
};

function UssdSuccess(state = initialState, action) {
  switch (action.type) {
    case USSD_SUCCESS:
      return {
        ...state,
        success: true,
        data: action.payload.detail,
      };
    default:
      return state;
  }
}

export default UssdSuccess;
