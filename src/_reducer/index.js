import { combineReducers } from "redux";
import exploreProducts from "./exploreProducts";
import loading from "./loading";
import error from "./errorReducer";
import authUser from "./userReducer";
import paymentReducer from "./paymentReducer";
import redirectUser from "./UserRedirect";
import products from "./productsReducer";
// import switchReg from "./pageswitchReducer";
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
import UssdSuccess from "./ussdSuccess";
import Providers from "./Loan/providersRed";
import Token from "./Loan/tokenLoan";
import getOffers from "./Loan/getOffers";
import getLoanData from "./Loan/getLoanDataRed";
import acceptOffers from "./Loan/acceptLoan";
import someLoanData from "./Loan/sendSomeLoanDataRed";
import reloadReducer from "./Requery"
import hostedField from './Loan/hostedField'
import dataValue from "./data";
import forgotReducer from "./forgotPassword";
import someSelect from "./selectData/select"
import productList from "./productListREducer"

export default combineReducers({
  authUser,
  forgotReducer,
  dataValue,
  verify,
  someSelect,
  verifyUserdetails,
  FinalPayment,
  Providers,
  reloadReducer,
  Token,
  someLoanData,
  getOffers,
  acceptOffers,
  getLoanData,
  UssdSuccess,
  hostedField,
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
  productList
  // switchReg,
});
