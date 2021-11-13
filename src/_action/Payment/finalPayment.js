import axios from "axios";
import { FINAL_PAYMENT, FINAL_PAYMENT_ERROR } from "../types";
import { secondTokenConfig } from "../userAction";
import { dataValue } from "./data";

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
      dispatch(dataValue("finalPayment", true))
      dispatch({
        type: FINAL_PAYMENT_ERROR,
        payload: { requestFailed: true, requery: false },
      });
    });
};
