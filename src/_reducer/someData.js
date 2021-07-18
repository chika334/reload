import { SOMEDATA } from "../_action/types";

const initialState = {
  detail: null,
};

function someData(state = initialState, action) {
  switch (action.type) {
    case SOMEDATA:
      return {
        detail: action.data,
      };
    default:
      return state;
  }
}

export default someData;
