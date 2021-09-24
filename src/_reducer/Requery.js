import { REQUERY, REQUERY_FAILED } from "../_action/types";

const initialState = {
  requerySuccess: false,
  details: null,
};

const reloadReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUERY:
      return {
        ...state,
        requerySuccess: true,
        details: action.payload,
      };
    case REQUERY_FAILED:
      return {
        ...state,
        requerySuccess: false,
        details: null,
      };
    default:
      return state;
  }
};

export default reloadReducer;
