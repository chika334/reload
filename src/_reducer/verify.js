import { CLEAR_VERIFIED_DETAILS, DETAILS_VERIFIED, RESET_REDUX } from "../_action/types.js";

const initialState = {
  name: "",
  onclick: false,
};

function paymentButton(state = initialState, action) {
  switch (action.type) {
    case DETAILS_VERIFIED:
      return {
        name: action.payload.name,
        onclick: action.payload.onclick,
      };
    case CLEAR_VERIFIED_DETAILS:
      return {
        name: "",
        onclick: false,
      };
    default:
      return state;
  }
}

export default paymentButton;
