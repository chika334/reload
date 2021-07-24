import { SOMEDATA, REMOVEDATA } from "../_action/types";

let someDetails = localStorage.getItem("data");

const initialState = {
  detail: JSON.parse(someDetails),
};

function someData(state = initialState, action) {
  switch (action.type) {
    case SOMEDATA:
      localStorage.setItem("data", JSON.stringify(action.detail));
      return {
        detail: action.detail,
      };
    case REMOVEDATA:
      localStorage.removeItem("data");
      return {
        detail: null,
      };
    default:
      return state;
  }
}

export default someData;
