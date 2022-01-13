import { FINAL_PAYMENT, FINAL_PAYMENT_ERROR } from "../_action/types";

const initialState = {
  finalPayment: false,
  data: null,
  requestFailed: false,
  requery: false,
};

const FinalPayment = (state = initialState, action, props) => {
  switch (action.type) {
    case FINAL_PAYMENT:
      return {
        ...state,
        finalPayment: true,
        ...action.payload,
        requestFailed: false,
      };
    case FINAL_PAYMENT_ERROR:
      return {
        ...state,
        finalPayment: false,
        data: null,
        requery: action.payload.requery,
        requestFailed:
          action.payload.requery === true
            ? false
            : action.payload.requestFailed,
      };
    default:
      return state;
  }
};

export default FinalPayment;
