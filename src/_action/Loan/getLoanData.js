import { GET_LOAN_DATA } from "../types";

export const getLoanData = (data) => {
  return {
    type: GET_LOAN_DATA,
    payload: { data },
  };
};
