import {
  INTERSWITCH_PROVIDER,
  PROVIDERS_LOADING,
  INTERSWITCH_PTOVIDERS_FAILED,
} from "../types";
import { returnErrors } from "../errorAction";
import axios from "axios";

export const interswitchProvider = () => (dispatch, getState) => {
  dispatch({ type: PROVIDERS_LOADING });
  // console.log(interSwitchConfig(getState));
  axios
    .get(
      `${process.env.REACT_APP_API_INTERSWITCH}/lending-service/api/v1/offers/providers?channelCode=${process.env.REACT_APP_CHANNELCODE}`,
      interSwitchConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: INTERSWITCH_PROVIDER,
        payload: res.data,
      })
    )
    .catch((err) => {
      // console.log(err);
      dispatch(
        returnErrors(
          err.response,
          err.response.status,
          "INTERSWITCH_PTOVIDERS_FAILED"
        )
      );
      dispatch({
        type: INTERSWITCH_PTOVIDERS_FAILED,
      });
    });
};

export const interSwitchConfig = (getState) => {
  const token = getState().Token.tokenInterSwitch;

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  // if token, add to header
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};
