import { INTERSWITCH_PROVIDER, PROVIDERS_LOADING } from "../types";
import axios from "axios";

export const interswitchProvider = () => (dispatch, getState) => {
  dispatch({ type: PROVIDERS_LOADING });
  console.log(interSwitchConfig(getState))
  axios
  .get(
    `https://sandbox.interswitchng.com/lending-service/api/v1/offers/providers?channelCode=QTUSSD`,
    interSwitchConfig(getState)
  )
 /*  axios
    .get(
      `${process.env.REACT_APP_API_INTERSWITCH}/lending-service/api/v1/offers/providers?channelCode=QTUSSD`,
      interSwitchConfig(getState)
    ) */
    .then((res) =>
      dispatch({
        type: INTERSWITCH_PROVIDER,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err.response));
};

export const interSwitchConfig = (getState) => {
//  const token = getState().Token.tokenInterSwitch;
const token = "eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOlsiY2Flc2FyIiwiY2FyZGxlc3Mtc2VydmljZSIsImNyZWRpdC1zY29yZS1zZXJ2aWNlIiwiZGlyZWN0LXRvLWFjY291bnQiLCJpbmNvZ25pdG8iLCJpc3ctY29sbGVjdGlvbnMiLCJpc3ctY29yZSIsImlzdy1sZW5kaW5nLXNlcnZpY2UiLCJpc3ctcGF5bWVudGdhdGV3YXkiLCJwYXNzcG9ydCIsInBheW1lbnQtc2VydmljZSIsInBheW1lbnRzZXJ2aWNlIiwicHJvamVjdC14LWNvbnN1bWVyIiwicHJvamVjdC14LW1lcmNoYW50IiwicHdtIiwidmF1bHQiLCJ2b3VjaGVyLWFwaSIsIndhbGxldCJdLCJtZXJjaGFudF9jb2RlIjoiTVgxODciLCJwcm9kdWN0aW9uX3BheW1lbnRfY29kZSI6IjAwMTY0NjM5ODU0IiwicmVxdWVzdG9yX2lkIjoiMDAxMTc2MTQ5OTIiLCJzY29wZSI6WyJwcm9maWxlIl0sImV4cCI6MTYyODE3MDA3OSwianRpIjoiYjY5NjNlOTMtOWVjZi00N2I0LWFlMTItOThiMzNhMjQ3MTgyIiwicGF5YWJsZV9pZCI6IjIzMjQiLCJjbGllbnRfaWQiOiJJS0lBOTYxNEI4MjA2NEQ2MzJFOUI2NDE4REYzNThBNkE0QUVBODRENzIxOCIsInBheW1lbnRfY29kZSI6IjA0MjU5NDEzMDI0NiJ9.Tgo1_0Izb2Tc--Bvf8Y87kEoV7Vrb7KnMyF5Tpdigrimf-23XPjuifWZpLpvf3j46QVBTRsYnd9PvqKZsjnwDvMAekv8caq6ZzEjbZOX6JQaV-6qYbAJt6OiMYts10KJjV_jaOxvqzXWkhVjHkxZZNG6hWRme5IcUV_n20rnfBveTof2dr__uUemJL0TZ66YMzWQ-amQIUsTqyYZGtFhhv4rggX6FtdF24QqjXehC8qZ5EsZO9Qoxwfaz_DPuQP9Exre7qxbRlZu45pdMKhpkzkaAJ2GATC09vT5Jk4HAMPrY8pFlZbfi656hA6jSlNVlg1lAI28hCaUWmPB2OHsEg"
  console.log(`Bearer ${token}`);

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
