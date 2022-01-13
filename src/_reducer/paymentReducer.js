import { PAYBUTTON, CLEAR_PAYMENT } from "../_action/types";

const initialState = {
  pay: false,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYBUTTON:
      return {
        ...state,
        pay: true,
      };
    case CLEAR_PAYMENT:
      return {
        ...state,
        pay: false,
      };
    default:
      return state;
  }
};

export default paymentReducer;
