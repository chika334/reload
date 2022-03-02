import { SELECT_DATA } from "../../_action/types";

const initialState = {
  name: null,
//   booleanValue: false,
};

function someSelect(state = initialState, action) {
  switch (action.type) {
    case SELECT_DATA: {
      return {
        name: action.payload,
        // booleanValue: action.payload.booleanValue,
      };
    }
    default:
      return state;
  }
}

export default someSelect;
