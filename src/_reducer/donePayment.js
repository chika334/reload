import { PAYMENT_DETIALS } from "../_action/types.js";

const initialState = {
  detail: null,
  payment: false,
};

function paymentDone(state = initialState, action) {
  switch (action.type) {
    case PAYMENT_DETIALS: {
      return {
        detail: action.payload.detail,
        payment: true,
      };
    }
    default:
      return state;
  }
}

export default paymentDone;
