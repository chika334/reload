import axios from "axios";
import {
  GET_OFFER_LOADING,
  GET_OFFER_SUCCESS,
  GET_LOAN_OFFERS_FAILED,
} from "../types";
import { returnErrors } from "../errorAction";
import { interSwitchConfig } from "./providers";

export const getOffer = (value) => (dispatch, getState) => {
  dispatch({ type: GET_OFFER_LOADING });

  const channelCode = process.env.REACT_APP_CHANNELCODE;

  axios
    .get(
      `${process.env.REACT_APP_API_INTERSWITCH}/lending-service/api/v2/offers?customerId=${value.phone}&channelCode=${channelCode}&amount=${value.amount}&serviceType=${value.serviceType}`,
      interSwitchConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: GET_OFFER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response,
          err.response.status,
          "GET_LOAN_OFFERS_FAILED"
        )
      );
      dispatch({
        type: GET_LOAN_OFFERS_FAILED,
      });
    });
};
