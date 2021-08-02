import { INTERSWITCH_TOKEN } from "../types";

export const interswitchToken = (getState) => {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const secretKey = process.env.REACT_APP_SECRET_KEY;

  const user = `${client_id}:${secretKey}`;
  const base64 = Buffer.from(user).toString("base64");

  console.log(base64);
  // Get token from localstorage
  // const token = getState().authUser.token;

  // // set Header
  // const config = {
  //   headers: {
  //     merchantKey: "099035353",
  //     "Content-Type": "application/json",
  //   },
  // };

  // // if token, add to header
  // if (token) {
  //   config.headers["Authorization"] = `Token ${token}`;
  // }
  // return config;

  axios.post(
    `${process.env.REACT_APP_API}/passport/oauth/token`,
    passwordDetails,
    secondTokenConfig(getState)
  );
};
