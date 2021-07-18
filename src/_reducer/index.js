import { combineReducers } from "redux";
import exploreProducts from "./exploreProducts";
import loading from "./loading";
import error from "./errorReducer";
import authUser from "./userReducer";
import paymentReducer from "./paymentReducer";
import redirectUser from "./UserRedirect";
import products from "./productsReducer";
import switchReg from "./pageswitchReducer";
import search from "./searchReducer";
import changePassword from "./changePassword";
import verify from "./verifyDetails";
import paymentButton from "./paymentButtonRed";
import paymentDone from "./donePayment";
import verifyUserdetails from "./verify";
import paymentIntent from "./paymentIntent";
import FinalPayment from "./finalPayment";
import someData from "./someData";
import login_success_red from "./login_Success_red";

export default combineReducers({
  authUser,
  verify,
  verifyUserdetails,
  FinalPayment,
  error,
  changePassword,
  products,
  search,
  exploreProducts,
  loading,
  paymentReducer,
  redirectUser,
  paymentButton,
  paymentDone,
  paymentIntent,
  someData,
  login_success_red,
  // switchReg,
});
