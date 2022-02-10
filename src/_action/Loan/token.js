import axios from "axios";
import qs from "qs";
import { INTERSWITCH_TOKEN, INTERSWITCH_TOKEN_FAILED } from "../types";
// import { Base64 } from "js-base64";
import { returnErrors } from "../errorAction";

export const interswitchToken = () => dispatch => {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const userDetails = `${client_id}:${secretKey}`;
  const b64 = Buffer.from(userDetails).toString("base64");

  var details = {
    grant_type: "client_credentials",
    scope: "profile"
  };

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${b64}`
    }
  };

  axios
    .post(
      `${process.env.REACT_APP_API_INTERSWITCH}/passport/oauth/token`,
      qs.stringify(details),
      config
    )
    .then(res =>
      dispatch({
        type: INTERSWITCH_TOKEN,
        payload: res.data
      })
    )
    .catch(err => {
      if (err.response.status === 500) {
        window.location.href = `/${process.env.REACT_APP_RELOADNG}/error/process`;
      } else {
        dispatch(
          returnErrors(
            err.response,
            err.response.status,
            "INTERSWITCH_TOKEN_FAILED"
          )
        );
        dispatch({
          type: INTERSWITCH_TOKEN_FAILED
        });
      }
    });
};
