import {
  PASSWORD_CHANGED,
  PASSWORD_CHANGE_FAILED,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE,
} from "../_action/types.js";

const initialState = {
  msg: null,
  passwordChanged: false,
  updateProfile: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case PASSWORD_CHANGED:
      return {
        ...state,
        msg: action.payload,
        passwordChanged: true,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        msg: action.payload,
        updateProfile: true,
      };
    case UPDATE_PROFILE_ERROR:
    case PASSWORD_CHANGE_FAILED:
      return {
        ...state,
        msg: action.payload,
        passwordChanged: false,
      };
    default:
      return state;
  }
}

export default userReducer;
