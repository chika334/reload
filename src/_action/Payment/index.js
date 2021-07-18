import axios from "axios";
import { returnErrors } from "../errorAction";
import { BUY_DATA_SUCCESS, BUY_DATA_FAILURE, CLEAR_PAYMENT } from "../types";
import { secondTokenConfig } from "../userAction";

export const PaymentIntent = (newValuesObj) => async (dispatch, getState) => {
  // console.log(newValuesObj);
  await axios
    .post(
      `${process.env.REACT_APP_API}/billpay/api/transaction/payment/intent`,
      newValuesObj,
      secondTokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: BUY_DATA_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response, err.response.status, "BUY_DATA_FAILURE"));
      dispatch({
        type: BUY_DATA_FAILURE,
        payload: err.response,
      });
    });
};

export const clearPayment = () => {
	return {
		type: CLEAR_PAYMENT
	}
}
