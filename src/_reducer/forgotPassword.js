import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD,
  RESET_PASSWORD_FAIL,
} from "../_action/types.js";

const initialState = {
  msg: null,
  forgotPassword: false,
  resetPassword: false,
};

function forgotReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_PASSWORD:
      return {
        ...state,
        resetPassword: true,
        msg: action.payload,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPassword: true,
        msg: action.payload,
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        resetPassword: false,
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        forgotPassword: false,
        msg: null,
      };
    default:
      return state;
  }
}

export default forgotReducer;
