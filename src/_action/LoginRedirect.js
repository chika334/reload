import { LOGIN_REDIRECT_SUCCESS } from "./types";

export const loginRediectSuccess = (value, data) => {
  return {
    type: LOGIN_REDIRECT_SUCCESS,
    payload: { value, data },
  };
};
