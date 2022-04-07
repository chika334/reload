import { RESET_REDUX } from "./types.js";

export const resetRedux = () => (dispatch) => {
//   alert("nice");
  dispatch({
    type: RESET_REDUX,
  });
};
