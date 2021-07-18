import { SOMEDATA } from "./types";

export const someData = (data) => (dispatch) => {
  dispatch({
    type: SOMEDATA,
    data,
  });
};
