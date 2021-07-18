// { name: "USSD", onclick: true }
import { DETAILS_VERIFIED, CLEAR_VERIFIED_DETAILS } from "./types";

export const verify = (name, onclick) => {
  // console.log(name, onclick);
  return {
    type: DETAILS_VERIFIED,
    payload: { name, onclick },
  };
};

export const clearDetails = () => {
  return {
    type: CLEAR_VERIFIED_DETAILS,
  };
};

// export const clearPaymentButton = () => {
//   return {
//     type: CLEAR_PAY_BUTTON,
//   };
// };
