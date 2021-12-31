import axios from "axios";
import { ACCEPT_LOAN_OFFERS, ACCEPT_LOAN_FAILED } from "../types";
import { returnErrors } from "../errorAction";
// import { interSwitchConfig } from "./providers";

export const acceptOffer = (value, secondValue) => (dispatch, getState) => {
  // console.log(value, secondValue);
  axios
    .post(
      `${process.env.REACT_APP_API_INTERSWITCH}/lending-service/api/v2/offers/${secondValue.offerId}/accept`,
      value,
      interSwitchJsonConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: ACCEPT_LOAN_OFFERS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response, err.response.status, "ACCEPT_LOAN_FAILED")
      );
      dispatch({
        type: ACCEPT_LOAN_FAILED,
      });
    });
};

export const interSwitchJsonConfig = (getState) => {
  const token = getState().Token.tokenInterSwitch;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // if token, add to header
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};
