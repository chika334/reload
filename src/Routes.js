import React, { lazy, useEffect, Suspense } from "react";
// import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import "./App.css";

import { showLoader, hideLoader } from "./_action/loading";
import { useSelector, connect } from "react-redux";
import Loading from "./components/global-components/loading";
import ProtectedRoutes from "./protectedRoutes";
// import PrivateRouteReceipt from "./preventReceipt";
import RequeryReceipt from "./components/Pay/PaymentProcess/requeryReceipt";

import LoanStatus from "./components/section-components/LoanStatus";

import About from "./components/about";
import Registraion from "./components/registration";
import Faq from "./components/faq";
import Contact from "./components/contact";
import Error from "./components/error";
import Receipt from "./components/Pay/PaymentProcess/printReceipt";

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
  const location = useLocation();
  const loading = useSelector((state) => state.loading.loading);
  const products = useSelector((state) => state.products);

  // console.log(products.listProducts);

  useEffect(() => {
    props.showLoader();
    setTimeout(() => {
      props.hideLoader();
    }, 1000);
  }, []);

  // useEffect(() => {
  //   if (products.listProducts === null) {
  //     props.showLoader();
  //     // alert("loading")
  //   } else if(products.listProducts !== null) {
  //     props.hideLoader();
  //   }
  // }, [products.listProducts]);

  return (
    <div>
      {loading === true ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>
          <Navbar />
          <Switch location={location} key={location.pathname}>
            <Redirect
              exact
              from="/"
              to={`/${process.env.REACT_APP_RELOADNG}`}
            />
          </Switch>
          <Route path={[`/${process.env.REACT_APP_RELOADNG}`]}>
            <Switch>
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}`}
                component={HomeV1}
              />
            </Switch>
          </Route>
          <Route
            path={[
              `/${process.env.REACT_APP_RELOADNG}/about`,
              `/${process.env.REACT_APP_RELOADNG}/registration`,
              `/${process.env.REACT_APP_RELOADNG}/settings`,
              `/${process.env.REACT_APP_RELOADNG}/faq`,
              `/${process.env.REACT_APP_RELOADNG}/products`,
              `/${process.env.REACT_APP_RELOADNG}/product-details/buy`,
              `/${process.env.REACT_APP_RELOADNG}/forgotpassword`,
              `/${process.env.REACT_APP_RELOADNG}/terms`,
              `/${process.env.REACT_APP_RELOADNG}/product-details`,
              `/${process.env.REACT_APP_RELOADNG}/contact`,
              `/${process.env.REACT_APP_RELOADNG}/admin`,
              `/${process.env.REACT_APP_RELOADNG}/helpdesk`,
              `/${process.env.REACT_APP_RELOADNG}/receipt`,
              `/${process.env.REACT_APP_RELOADNG}/loan`,
              `/${process.env.REACT_APP_RELOADNG}/loan/accept-loan-offer`,
              `/${process.env.REACT_APP_RELOADNG}/loan/loan-status`,
              `/${process.env.REACT_APP_RELOADNG}/requery`,
            ]}
          >
            <Switch location={location} key={location.pathname}>
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/about`}
                component={About}
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
              <Route exact component={Error} />
            </Switch>
          </Route>
          <Footer />
        </Suspense>
      )}
    </div>
  );
}

export default connect(null, { showLoader, hideLoader })(Routes);
