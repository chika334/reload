import { SOME_LOAN_DATA } from "../types";

export const someloanData = (data) => {
  return {
    type: SOME_LOAN_DATA,
    payload: { data },
  };
};
