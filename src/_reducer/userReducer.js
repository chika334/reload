import {
  AUTH_ERROR,
  REGISTER_USER,
  REGISTER_FAIL,
  // EDITPROFILE_FAIL,
  // EDITPROFILE,
  // RESET_PASSWORD_FAIL,
  // RESET_PASSWORD
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_FAIL,
} from "../_action/types.js";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  msg: null,
  editSuccess: false,
  isLogin: false,
  isRegister: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case REGISTER_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isLogin: false,
        isRegister: true,
        isAuthenticated: true,
        token: action.payload.token,
        forgotPassword: false
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload,
        isLogin: true,
        isRegister: false,
        isLoading: false,
        isAuthenticated: true,
        token: action.payload.token,
        forgotPassword: false,
      };
    case LOGIN_FAILED:
    case REGISTER_FAIL:
    case LOGOUT_USER:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        forgotPassword: false,
      };
    default:
      return state;
  }
}

export default userReducer;
