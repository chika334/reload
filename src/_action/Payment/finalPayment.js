import axios from "axios";
import { FINAL_PAYMENT, FINAL_PAYMENT_ERROR } from "../types";
import { secondTokenConfig } from "../userAction";
import { Redirect } from "react-router-dom";
import { dataValue } from "./data";

export const finalPayment = (ref) => async (dispatch, getState) => {
  const body = JSON.stringify(ref);
  await axios
    .post(
      `${process.env.REACT_APP_API}/billpay/api/transaction/payment/finalize`,
      body,
      secondTokenConfig(getState),
      { timeout: 200 }
    )
    .then(
      (res) =>
        dispatch({
          type: FINAL_PAYMENT,
          payload: res.data,
        })
      // console.log("response from final payment")
    )
    .catch((err) => {
      // if (err.response.status === 500) {
      window.location.href = `/${process.env.REACT_APP_RELOADNG}/error/process`;
      // } else{
      // setTimeout(() => {
      //   return (
      //     <Redirect to={`/${process.env.REACT_APP_RELOADNG}/error/process`} />
      //   );
      //   // window.location.href = `/${process.env.REACT_APP_RELOADNG}/error/process`;
      // }, 60000);
      // dispatch(dataValue("finalPayment", true));
      // dispatch({
      //   type: FINAL_PAYMENT_ERROR,
      //   payload: { requestFailed: true, requery: false },
      // });
      // }
    });
};
