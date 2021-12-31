import axios from "axios";
import { returnErrors } from "./errorAction";
import { SEARCH_LOADED, SEARCH_ERROR } from "./types";
// import { tokenConfig } from "./userAction";

export const SearchProducts = (values) => async (dispatch) => {
  // dispatch({ type: SEARCH_LOADING });

  console.log(values);

  const config = {
    headers: {
      merchantKey: "099035353",
      "Content-Type": "application/json",
    },
  };
  await axios
    .post(
      `${process.env.REACT_APP_API}/billpay/api/product/merchant/lookup`,
      values,
      config
    )
    .then((res) =>
      dispatch({
        type: SEARCH_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response, err.response.status, "SEARCH_ERROR"));
      dispatch({
        type: SEARCH_ERROR,
        payload: err.response,
      });
    });
};
