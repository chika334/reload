import { INTERSWITCH_TOKEN } from "../../_action/types";

const initialState = {
  loading: false,
  success: false,
  tokenInterSwitch: localStorage.getItem("access_token"),
};

const Token = (state = initialState, action) => {
  switch (action.type) {
    case INTERSWITCH_TOKEN:
      localStorage.setItem("access_token", action.payload.access_token);
      return {
        ...state,
        loading: false,
        success: true,
        tokenInterSwitch: action.payload.access_token,
      };
    default:
      return state;
  }
};

export default Token;
