import { LOGIN_REDIRECT, REGISTER_REDIRECT } from "../_action/types.js";

const initialState = {
  // token: localStorage.getItem("token"),
  login: null,
  register: null,
};

const loading = (state = initialState, action, props) => {
  switch (action.type) {
    case LOGIN_REDIRECT:
      return {
        ...state,
        login: true,
        register: false,
      };
    case REGISTER_REDIRECT:
      return {
        ...state,
        register: true,
        login: false,
      };
    default:
      return state;
  }
};

export default loading;
