import axios from "axios";
import { tokenConfig } from "./userAction";
import { REQUERY, REQUERY_FAILED } from "./types";
import { returnErrors } from "./errorAction";
import { secondTokenConfig } from "./userAction";

export const requery = (value) => (dispatch, getState) => {
  const config = {
    headers: {
      merchantKey: "099035353",
      // "Content-Type": "application/json",
    },
  };

  axios
    .post(
      `${process.env.REACT_APP_API}/billpay/api/transaction/payment/requery`,
      value,
      secondTokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: REQUERY,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response) {
        dispatch(
          returnErrors(err.response.data, err.response.status, "REQUERY_FAILED")
        );
      }
      dispatch({
        type: REQUERY_FAILED,
      });
    });
};
