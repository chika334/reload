import { LOGIN_REDIRECT, REGISTER_REDIRECT } from "./types";

export const loginRedirect = () => (dispatch) => {
  dispatch({
    type: LOGIN_REDIRECT,
  });
};

export const regRedirect = () => (dispatch) => {
  dispatch({
    type: REGISTER_REDIRECT,
  });
};
