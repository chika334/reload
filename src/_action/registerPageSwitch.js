import { SWITCH_TO_LOGIN, SWITCH_TO_REGISTER } from "./types";

export const switchTOLogin = () => (dispatch) => {
  dispatch({
    type: SWITCH_TO_LOGIN,
  });
};

export const switchTOREGISTER = () => (dispatch) => {
  dispatch({
    type: SWITCH_TO_REGISTER,
  });
};
