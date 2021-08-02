// { name: "USSD", onclick: true }
import { BUTTON_CLICKED, CLEAR_PAY_BUTTON, PAYMENT_DETIALS } from "../types";
export const FIELD_SET = "FIELD_SET";

export const paymentButtons = (name, onclick) => {
  // console.log(name, onclick);
  return {
    type: BUTTON_CLICKED,
    payload: { name, onclick },
  };
};

export const pay = (detail) => {
  return {
    type: PAYMENT_DETIALS,
    payload: { detail },
  };
};

export const fieldSelect = (key, data) => (dispatch) => {
  dispatch({ type: FIELD_SET, key, data });
};
