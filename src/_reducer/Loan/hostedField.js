import { HOSTED_FIELD } from "../../_action/types";

const initialState = {
  status: false,
  value: null
};

const hostedField = (state = initialState, action) => {
  switch (action.type) {
    case HOSTED_FIELD:
      return {
        status: true,
        value: action.payload,
      };
    default:
      return state;
  }
};

export default hostedField;
