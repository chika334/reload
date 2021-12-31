import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGIN_FAILED,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_FAIL,
  PASSWORD_CHANGED,
  PASSWORD_CHANGE_FAILED,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD,
} from "./types";
import axios from "axios";
import { returnErrors } from "../_action/errorAction";
import { hideLoader } from "./loading";
import { useSelector } from "react-redux";

export const getUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  axios
    .get(
      `${process.env.REACT_APP_API}/billpay/api/auth/user`,
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response) {
        dispatch(returnErrors(err.response.data, err.response.status));
      }
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// register user
export const RegUser = (values) => (dispatch) => {
  const config = {
    headers: {
      merchantKey: "099035353",
      "Content-Type": "application/json",
    },
  };

  // var body = JSON.stringify(values);

  axios
    .post(
      `${process.env.REACT_APP_API}/billpay/api/auth/biller/customer/register`,
      values,
      config
    )
    .then((res) => {
      dispatch(hideLoader());
        return (
          dispatch({
            type: REGISTER_USER,
            payload: res.data,
          })
        )
      }
    )
    .catch((err) => {
      dispatch(hideLoader());
      if (err.response) {
        dispatch(
          returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
        );
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

export const LoginUser = (user) => (dispatch) => {
  const config = {
    headers: {
      merchantKey: "099035353",
      "Content-Type": "application/json",
    },
  };

  

  axios
    .post(
      `${process.env.REACT_APP_API}/billpay/api/auth/biller/customer/login`,
      user,
      config
    )
    .then((res) => {
      dispatch(hideLoader());
      if (res.status === 200) {
        return dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        // setTimeout(() => {
        //   if (localStorage.token) {
        //   }
        // }, 3000)
      }
    })
    .catch((err) => {
      dispatch(hideLoader());
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAILED")
      );
      dispatch({
        type: LOGIN_FAILED,
      });
    });
};

export const forgotPassword = (values) => (dispatch) => {
  const config = {
    headers: {
      merchantKey: "099035353",
      "Content-Type": "application/json",
    },
  };

  var body = JSON.stringify(values);

  axios
    .post(
      `${process.env.REACT_APP_API}/billpay/api/billercustomer/forgotpassword`,
      body,
      config
    )
    .then((res) => {
      if (res.status === 200) {
        return (
          dispatch({
            type: FORGOT_PASSWORD,
            payload: res.data,
          }),
          setTimeout(() => {
            if (localStorage.token) {
              dispatch(hideLoader());
            }
          }, 3000)
        );
      }
    })
    .catch((err) => {
      dispatch(hideLoader());
      if (err.response) {
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "FORGOT_PASSWORD_FAIL"
          )
        );
      }

      dispatch({
        type: FORGOT_PASSWORD_FAIL,
      });
    });
};

export const resetPassword = (user) => (dispatch) => {
  const config = {
    headers: {
      merchantKey: "099035353",
      "Content-Type": "application/json",
    },
  };

  axios
    .post(
      `${process.env.REACT_APP_API}/billpay/api/auth/biller/customer/login`,
      user,
      config
    )
    .then((res) => {
      if (res.status === 200) {
        return (
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
          }),
          setTimeout(() => {
            if (localStorage.token) {
              dispatch(hideLoader());
            }
          }, 3000)
        );
      }
    })
    .catch((err) => {
      dispatch(hideLoader());
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAILED")
      );
      dispatch({
        type: LOGIN_FAILED,
      });
    });
};

export const updateProfile = (newDetails) => (dispatch, getState) => {
  const phone = newDetails.phone;
  const fullname = newDetails.fullname;
  const address = newDetails.address;

  const body = {};
  const updateDetails = Object.assign(body, { phone, fullname, address });

  axios
    .put(
      `${process.env.REACT_APP_API}/billpay/api/billercustomer/update/${newDetails.customerId}`,
      updateDetails,
      secondTokenConfig(getState)
    )
    .then((res) => {
      if (res.status === 200) {
        return (
          dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
          }),
          setTimeout(() => {
            if (localStorage.token) {
              dispatch(hideLoader());
            }
          }, 3000)
        );
      }
    })
    .catch((err) => {
      dispatch(hideLoader());
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAILED")
      );
      dispatch({
        type: UPDATE_PROFILE_ERROR,
      });
    });
};

export const ChangeuserPassword = (newDetails) => (dispatch, getState) => {
  const oldPassword = newDetails.oldPassword;
  const newPassword = newDetails.NewPassword;

  const body = {};
  const passwordDetails = Object.assign(body, { oldPassword, newPassword });
  // console.log(passwordDetails);
  axios
    .put(
      `${process.env.REACT_APP_API}/billpay/api/billercustomer/changepassword/${newDetails.customerId}`,
      passwordDetails,
      secondTokenConfig(getState)
    )
    .then((res) => {
      if (res.status === 200) {
        return (
          dispatch({
            type: PASSWORD_CHANGED,
            payload: res.data,
          }),
          setTimeout(() => {
            if (localStorage.token) {
              dispatch(hideLoader());
            }
          }, 3000)
        );
      }
    })
    .catch((err) => {
      dispatch(hideLoader());
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "PASSWORD_CHANGE_FAILED"
        )
      );
      dispatch({
        type: PASSWORD_CHANGE_FAILED,
      });
    });
};

export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().authUser.token;

  // set Header
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // if token, add to header
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};

export const secondTokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().authUser.token;

  // set Header
  const config = {
    headers: {
      merchantKey: "099035353",
      "Content-Type": "application/json",
    },
  };

  // if token, add to header
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};
