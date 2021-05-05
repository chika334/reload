import { combineReducers } from "redux";
import exploreProducts from "./exploreProducts";
import loading from "./loading";

export default combineReducers({
  exploreProducts,
  loading,
});
