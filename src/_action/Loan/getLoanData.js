import { GET_LOAN_DATA, GET_Final_DATA } from "../types";

export const getLoanData = (data) => {
  return {
    type: GET_LOAN_DATA,
    payload: { data },
  };
};