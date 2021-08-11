import { GET_OFFER_LOADING, GET_OFFER_SUCCESS, GET_LOAN_OFFERS_FAILED } from "../../_action/types";

const initialState = {
  loading: false,
  success: false,
  data: null,
};

const getOffers = (state = initialState, action) => {
  switch (action.type) {
    case GET_OFFER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_LOAN_OFFERS_FAILED:
      return {
        ...state,
        success: false,
        data: null,
      };
    default:
      return state;
  }
};

export default getOffers;
