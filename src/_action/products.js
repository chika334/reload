import axios from "axios";
// import { tokenConfig } from "./userAction";
import {
  PRODUCT_LOADING,
  PRODUCT_LOADED,
  PRODUCT_FAIL,
  // GET_PRODUCTBYID_LOADING,
  // GET_PRODUCT_BYID,
  // GET_PRODUCT_FAIL,
} from "./types";
import { returnErrors } from "./errorAction";

export const getProducts = () => (dispatch, getState) => {
  const config = {
    headers: {
      merchantKey: "099035353",
      "Content-Type": "application/json",
    },
  };

  dispatch({ type: PRODUCT_LOADING });
  axios
    .get(`${process.env.REACT_APP_API}/billpay/api/product/merchant`, config)
    .then((res) =>
      dispatch({
        type: PRODUCT_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response) {
        dispatch(returnErrors(err.response.data, err.response.status));
      }
      dispatch({
        type: PRODUCT_FAIL,
      });
    });
};

// export const getProducts = () => (dispatch, getState) => {
//   dispatch({ type: PRODUCT_LOADING });
//   axios
//     .get(
//       `${process.env.REACT_APP_API}/fastpayr/api/v1/serviceprovider/product/byklass/1`
//       // tokenConfig(getState)
//     )
//     .then((res) =>
//       dispatch({
//         type: PRODUCT_LOADED,
//         payload: res.data,
//       })
//     )
//     .catch((err) => {
//       if (err.response) {
//         dispatch(returnErrors(err.response.data, err.response.status));
//       }
//       dispatch({
//         type: PRODUCT_FAIL,
//       });
//     });
// };

// export const getProductsById = () => (dispatch, getState) => {
//   dispatch({ type: GET_PRODUCTBYID_LOADING });
//   axios
//     .get(
//       `${process.env.REACT_APP_API}/fastpayr/api/v1/serviceprovider/product/byklass/1`
//       // tokenConfig(getState)
//     )
//     .then((res) => dispatch({ type: GET_PRODUCT_BYID, payload: res.data }))
//     .catch((err) => {
//       if (err.response) {
//         dispatch(returnErrors(err.response.data, err.response.status));
//       }
//       dispatch({
//         type: GET_PRODUCT_FAIL,
//       });
//     });
// };
