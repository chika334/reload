import React, { lazy, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";

import { showLoader, hideLoader } from "./_action/loading";
import { useSelector, connect } from "react-redux";
import Loading from "./components/global-components/loading";
import ProtectedRoutes from "./protectedRoutes";
import RequeryReceipt from "./components/Pay/PaymentProcess/requeryReceipt";

import LoanStatus from "./components/section-components/LoanStatus";

import About from "./components/about";
import Registraion from "./components/registration";
import Faq from "./components/faq";
import Contact from "./components/contact";
import Error from "./components/error";
import Reset from "./components/ResetPassword";
import Receipt from "./components/Pay/PaymentProcess/printReceipt";
import Errors from "./components/error_processing";

// component
const HomeV1 = lazy(() => import("./components/home-v1"));
const Property = lazy(() => import("./components/property"));
const Navbar = lazy(() => import("./components/global-components/navbar"));
const PropertyDetails = lazy(() => import("./components/property-details"));
const BuyProduct = lazy(() =>
  import("./components/section-components/BuyProduct")
);
const Settings = lazy(() => import("./components/settings"));
const ForgotPassword = lazy(() => import("./components/forgotPassword"));
const Footer = lazy(() => import("./components/global-components/footer"));
const TermNCondition = lazy(() => import("./components/TermNCondition"));
const Transaction = lazy(() => import("./components/admin"));
const HelpDesk = lazy(() => import("./components/Help"));
const AcceptLoan = lazy(() => import("./components/AcceptLoan"));
const Loan = lazy(() => import("./components/Loan"));
const Requery = lazy(() => import("./components/Pay/Requery"));

function Routes(props) {
  const loading = useSelector((state) => state.loading.loading);
  
  useEffect(() => {
    props.showLoader();
    setTimeout(() => {
      props.hideLoader();
    }, 4000);
  }, []);

  return (
    <div>
      {loading === true ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>
          <Navbar />
          <Route>
            <Switch>
              <Redirect
                exact
                from="/"
                to={`/${process.env.REACT_APP_RELOADNG}`}
              />
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}`}
                component={HomeV1}
              />
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/about`}
                component={About}
              />
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/resetpassword`}
                component={Reset}
              />
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/registration`}
                component={Registraion}
              />
              <ProtectedRoutes
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/settings`}
                component={Settings}
              />
              <ProtectedRoutes
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/admin`}
                component={Transaction}
              />
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/faq`}
                component={Faq}
              />
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/products`}
                component={Property}
              />
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/product-details/buy`}
                component={BuyProduct}
              />
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/helpdesk`}
                component={HelpDesk}
              />
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/forgotpassword`}
                component={ForgotPassword}
              />
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/terms`}
                component={TermNCondition}
              />
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/product-details`}
                component={PropertyDetails}
              />
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/requery`}
                component={Requery}
              />
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/contact`}
                component={Contact}
              />
              <ProtectedRoutes
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/loan`}
                component={Loan}
              />
              <ProtectedRoutes
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/loan/accept-loan-offer`}
                component={AcceptLoan}
              />
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/loan/loan-status`}
                component={LoanStatus}
              />
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/receipt`}
                component={Receipt}
              />
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/requery/receipt`}
                component={RequeryReceipt}
              />
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/error/process`}
                component={Errors}
              />
              <Route component={Error} />
            </Switch>
          </Route>
          <Footer />
        </Suspense>
      )}
    </div>
  );
}

export default connect(null, { showLoader, hideLoader })(Routes);
