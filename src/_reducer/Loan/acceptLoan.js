import { ACCEPT_LOAN_OFFERS, ACCEPT_LOAN_FAILED } from "../../_action/types";

const initialState = {
  loading: false,
  success: false,
  error: false,
  data: null,
};

const acceptOffers = (state = initialState, action) => {
  switch (action.type) {
    case ACCEPT_LOAN_OFFERS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case ACCEPT_LOAN_FAILED:
      return {
        ...state,
        success: false,
        error: true,
        data: null,
      };
    default:
      return state;
  }
};

export default acceptOffers;
