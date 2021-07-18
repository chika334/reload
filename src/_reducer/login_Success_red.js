import { LOGIN_REDIRECT_SUCCESS } from "../_action/types";

const initialState = {
  login: false,
  value: "",
};

const login_success_red = (state = initialState, action, props) => {
  switch (action.type) {
    case LOGIN_REDIRECT_SUCCESS:
      return {
        ...state,
        login: true,
        value: action.payload.value,
      };
    default:
      return state;
  }
};

export default login_success_red;
