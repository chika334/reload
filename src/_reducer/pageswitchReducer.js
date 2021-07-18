import { SWITCH_TO_LOGIN, SWITCH_TO_REGISTER } from "../_action/types";

const initialState = {
  login: false,
  register: false,
};

const pageswitch = (state = initialState, action, props) => {
  switch (action.type) {
    case SWITCH_TO_LOGIN:
      return {
        ...state,
        login: true,
        register: false,
      };
    case SWITCH_TO_REGISTER:
      return {
        ...state,
        login: false,
        register: true,
      };
    default:
      return state;
  }
};

export default pageswitch;
