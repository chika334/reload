import axios from "axios";
// import { tokenConfig } from "./userAction";
import { REQUERY, FINAL_PAYMENT_ERROR } from "./types";
// import { returnErrors } from "./errorAction";
import { secondTokenConfig } from "./userAction";
import { dataValue } from "./Payment/data";

export const requery = value => (dispatch, getState) => {
  const config = {
    headers: {
      merchantKey: "099035353",
      "Content-Type": "application/json"
    }
  };

  axios
    .post(
      `${process.env.REACT_APP_API}/billpay/api/transaction/payment/requery`,
      value,
      secondTokenConfig(getState)
    )
    .then(res =>
      dispatch({
        type: REQUERY,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response.status === 500) {
        window.location.href = `/${process.env.REACT_APP_RELOADNG}/error/process`;
      } else {
        // console.log(err);
        dispatch(dataValue("requery", true));
        dispatch({
          type: FINAL_PAYMENT_ERROR,
          payload: { requestFailed: true, requery: true }
        });
      }
    });
};
