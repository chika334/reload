import { INTERSWITCH_TOKEN } from "../types";
import axios from "axios";
import qs from "qs";

export const interswitchToken = () => (dispatch) => {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const secretKey = process.env.REACT_APP_SECRET_KEY;

  const userToken = `${client_id}:${secretKey}`;
  // const base64 = Buffer.from(userToken).toString("base64");

  var details = {
    grant_type: "client_credentials",
    scope: "profile",
  };

  const body = {};

  // var formBody = [];
  // for (var property in details) {
  //   var encodedKey = encodeURIComponent(property);
  //   var encodedValue = encodeURIComponent(details[property]);
  //   formBody.push(encodedKey + "=" + encodedValue);
  // }
  // formBody = formBody.join("&");

  // console.log(base64);
  const config = {
    "Content-Type": "application/x-www-form-urlencoded",
    // Authorization: `Basic ${base64}`,
  };

  axios({
    method: "post",
    url: `${process.env.REACT_APP_API_INTERSWITCH}/passport/oauth/token`,
    data: qs.stringify(details),
    auth: {
      username: client_id,
      password: secretKey,
    },
    // body: body,
    // data: formBody,
    headers: config,
  })
    .then((res) =>
      dispatch({
        type: INTERSWITCH_TOKEN,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};
