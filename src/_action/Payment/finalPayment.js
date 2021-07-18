import axios from "axios";
import { FINAL_PAYMENT, FINAL_PAYMENT_ERROR } from "../types";
import { secondTokenConfig } from "../userAction";
import { returnErrors } from "../errorAction";

export const finalPayment = (ref) => async (dispatch, getState) => {
  const body = JSON.stringify(ref);
  await axios
    .post(
      `${process.env.REACT_APP_API}/billpay/api/transaction/payment/finalize`,
      body,
      secondTokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: FINAL_PAYMENT,
        payload: res.data,
      })
    )
    .catch((err) => {
      // console.log(err);
      dispatch(
        returnErrors(err.response, err.response.status, "FINAL_PAYMENT_ERROR")
      );
      dispatch({
        type: FINAL_PAYMENT_ERROR,
      });
    });
};

// export const paystackToken = (ref) => (dispatch, getState) => {
//   const body = JSON.stringify(ref)
//   console.log(body);
//   axios
//     .post(
//       `${process.env.REACT_APP_API_SINGLE_PAYMENT_PAYSTACK}`,
//       body,
//       tokenConfig(getState)
//     )
//     .then((res) =>
//       dispatch({
//         type: PAYSTACK_BUY_TOKEN,
//         payload: res.data,
//       })
//     )
//     .catch((err) => {
//       dispatch(
//         returnErrors(err.response.data, err.response.status, "BUYTOKEN_FAIL")
//       );
//       dispatch({
//         type: PAYSTACK_BUYTOKEN_FAIL,
//         payload: err.response,
//       });
//     });
// };
