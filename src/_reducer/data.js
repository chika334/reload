import { DATA_VALUE } from "../_action/types.js";

const initialState = {
  name: null,
  booleanValue: false,
};

function dataValue(state = initialState, action) {
  switch (action.type) {
    case DATA_VALUE: {
      return {
        name: action.payload.name,
        booleanValue: action.payload.booleanValue,
      };
    }
    default:
      return state;
  }
}

export default dataValue;
