import { SOMEDATA } from "./types";

export const someData = (detail) => (dispatch) => {
  dispatch({
    type: SOMEDATA,
    detail,
  });
};
