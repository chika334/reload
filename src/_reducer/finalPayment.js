import { FINAL_PAYMENT, FINAL_PAYMENT_ERROR } from "../_action/types";

const initialState = {
  finalPayment: false,
};

const FinalPayment = (state = initialState, action, props) => {
  switch (action.type) {
    case FINAL_PAYMENT:
      return {
        ...state,
        finalPayment: true,
        ...action.payload,
      };
    case FINAL_PAYMENT_ERROR:
      return {
        ...state,
        finalPayment: false,
      };
    default:
      return state;
  }
};

export default FinalPayment;
