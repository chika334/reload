import React, { useEffect, Suspense } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import "./App.css";
import HomeV1 from "./components/home-v1";
import Property from "./components/property";
import Navbar from "./components/global-components/navbar";
import PropertyDetails from "./components/property-details";
import BuyProduct from "./components/section-components/BuyProduct";
import About from "./components/about";
import Profile from "./components/user-list";
import Registraion from "./components/registration";
import Error from "./components/error";
import Faq from "./components/faq";
import Contact from "./components/contact";
import SuccessMessage from "./components/SuccessMessage";
import Welcome from "./components/reg/Welcome";
import Settings from "./components/settings";
import ForgotPassword from "./components/forgotPassword";
import Footer from "./components/global-components/footer";
import TermNCondition from "./components/TermNCondition";
import Transaction from "./components/transaction";
import HelpDesk from "./components/Help";
import Receipt from "./components/Pay/PaymentProcess/printReceipt";
import AcceptLoan from "./components/AcceptLoan";
import Loan from "./components/Loan";
import Layout from "./Layout";

import { showLoader, hideLoader } from "./_action/loading";
import { useSelector, connect } from "react-redux";
import Loading from "./components/global-components/loading";
import ProtectedRoutes from "./protectedRoutes";
import PrivateRouteReceipt from "./preventReceipt";

function Routes(props) {
  const location = useLocation();
  const loading = useSelector((state) => state.loading.loading);

  useEffect(() => {
    props.showLoader();
    setTimeout(() => {
      props.hideLoader();
    }, 1000);
  }, []);

  return (
    <div>
      {loading === true ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>
          {/* <Layout /> */}
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
              // `/error`,
              `/${process.env.REACT_APP_RELOADNG}/product-details/buy`,
              `/${process.env.REACT_APP_RELOADNG}/forgotpassword`,
              `/${process.env.REACT_APP_RELOADNG}/terms`,
              `/${process.env.REACT_APP_RELOADNG}/product-details`,
              // `/${process.env.REACT_APP_RELOADNG}/welcome`,
              `/${process.env.REACT_APP_RELOADNG}/contact`,
              // `/successMessage`,
              // `/profile`,
              `/${process.env.REACT_APP_RELOADNG}/transactions`,
              `/${process.env.REACT_APP_RELOADNG}/helpdesk`,
              `/${process.env.REACT_APP_RELOADNG}/receipt`,
              `/${process.env.REACT_APP_RELOADNG}/loan`,
              `/${process.env.REACT_APP_RELOADNG}/loan/accept-loan-offer`,
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
              {/* <Route
              exact
              path="/profile"
              component={Profile}
            /> */}
              <ProtectedRoutes
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/settings`}
                component={Settings}
              />
              <ProtectedRoutes
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/transactions`}
                component={Transaction}
              />
              {/* <Route exact path="/error" component={Error} /> */}
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
              {/* <ProtectedRoutes
                exact
                path="/welcome"
                component={Welcome}
              /> */}
              {/* <ProtectedRoutes
                exact
                path="/profile"
                component={Profile}
              /> */}
              <Route
                exact
                path={`/${process.env.REACT_APP_RELOADNG}/contact`}
                component={Contact}
              />
              {/* <Route
                exact
                path="/successMessage"
                component={SuccessMessage}
              /> */}
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
                path={`/${process.env.REACT_APP_RELOADNG}/receipt`}
                component={Receipt}
              />
              <Route exact component={Error} />
            </Switch>
          </Route>
          <Footer />
          {/* </Layout> */}
        </Suspense>
      )}
    </div>
  );
}

export default connect(null, { showLoader, hideLoader })(Routes);
