import { GET_LOAN_DATA, GET_Final_DATA } from "../../_action/types";

const initialState = {
  success: false,
  data: null,
};

function getLoanData(state = initialState, action) {
  switch (action.type) {
    case GET_LOAN_DATA: {
      return {
        success: true,
        data: action.payload.data,
      };
    }
    default:
      return state;
  }
}

export default getLoanData;
