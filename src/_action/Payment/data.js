import { DATA_VALUE } from "../types";

export const dataValue = (name, booleanValue) => {
  return {
    type: DATA_VALUE,
    payload: { name, booleanValue },
  };
};
