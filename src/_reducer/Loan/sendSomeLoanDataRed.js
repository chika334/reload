import { SOME_LOAN_DATA } from "../../_action/types";

const initialState = {
  success: false,
  data: null,
};

function someLoanData(state = initialState, action) {
  switch (action.type) {
    case SOME_LOAN_DATA: {
      return {
        success: true,
        data: action.payload.data,
      };
    }
    default:
      return state;
  }
}

export default someLoanData;
