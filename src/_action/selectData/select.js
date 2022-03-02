import { SELECT_DATA } from "../types";

export const selectData = (data) => {
  return {
    type: SELECT_DATA,
    payload: data,
  };
};
