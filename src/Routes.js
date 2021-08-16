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
import PrivateRouteReceipt from './preventReceipt'

function Routes(props) {
  const location = useLocation();
  const loading = useSelector((state) => state.loading.loading);

  useEffect(() => {
    props.showLoader();
    setTimeout(() => {
      props.hideLoader();
    }, 2000);
  }, []);

  return (
    <div>
      {loading === true ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>
          {/* <Layout /> */}
          <Navbar />
          {/* <Switch>
            <Redirect exact from="/" to="/" />
          </Switch> */}
          <Route path={[`/`]}>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/" component={HomeV1} />
            </Switch>
          </Route>
          <Route
            path={[
              `/about`,
              `/registration`,
              `/settings`,
              `/faq`,
              `/products`,
              // `/error`,
              `/product-details/buy`,
              `/forgotpassword`,
              `/terms`,
              `/product-details`,
              `/welcome`,
              `/contact`,
              `/successMessage`,
              `/profile`,
              `/transactions`,
              `/helpdesk`,
              `/receipt`,
              `/loan`,
              `/loan/accept-loan-offer`
            ]}
          >
            <Switch location={location} key={location.pathname}>
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/registration"
                component={Registraion}
              />
              {/* <Route
              exact
              path="/profile"
              component={Profile}
            /> */}
              <ProtectedRoutes
                exact
                path="/settings"
                component={Settings}
              />
              <ProtectedRoutes
                exact
                path="/transactions"
                component={Transaction}
              />
              {/* <Route exact path="/error" component={Error} /> */}
              <Route exact path="/faq" component={Faq} />
              <Route exact path="/products" component={Property} />
              <Route
                exact
                path="/product-details/buy"
                component={BuyProduct}
              />
              <Route exact path="/helpdesk" component={HelpDesk} />
              <Route
                exact
                path="/forgotpassword"
                component={ForgotPassword}
              />
              <Route exact path="/terms" component={TermNCondition} />
              <Route
                exact
                path="/product-details"
                component={PropertyDetails}
              />
              <ProtectedRoutes
                exact
                path="/welcome"
                component={Welcome}
              />
              <ProtectedRoutes
                exact
                path="/profile"
                component={Profile}
              />
              <Route exact path="/contact" component={Contact} />
              <Route
                exact
                path="/successMessage"
                component={SuccessMessage}
              />
              <ProtectedRoutes exact path="/loan" component={Loan} />
              <ProtectedRoutes exact path="/loan/accept-loan-offer" component={AcceptLoan} />
              <Route exact path="/receipt" component={Receipt} />
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
