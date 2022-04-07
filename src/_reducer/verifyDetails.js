import {
  VERIFY_SUCCESS,
  VERIFY_FAILED,
  CLEAR_VERIFIED,
  RESET_REDUX
} from "../_action/types";

const initialState = {
  verifySuccess: false,
  result: null,
  // verify: localStorage.getItem("verify"),
};

function verifyReducer(state = initialState, action) {
  switch (action.type) {
    case VERIFY_SUCCESS:
      return {
        ...state,
        verifySuccess: true,
        result: action.payload,
      };
    case VERIFY_FAILED:
      return {
        ...state,
        verifySuccess: false,
        result: null,
      };
    case CLEAR_VERIFIED:
      return {
        verifySuccess: false,
        result: null,
      };
    case RESET_REDUX:
      return {
        verifySuccess: false,
        result: null,
      };
    default:
      return state;
  }
}

export default verifyReducer;
