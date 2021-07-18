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
import Receipt from './components/Pay/PaymentProcess/receipt'

import { showLoader, hideLoader } from "./_action/loading";
import { useSelector, connect } from "react-redux";
import Loading from "./components/global-components/loading";
import ProtectedRoutes from "./protectedRoutes";

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
          <Navbar />
          <Switch>
            <Redirect exact from="/" to="/reloadng" />
          </Switch>
          <Route path={[`/reloadng`]}>
            <Switch location={location} key={location.pathname}>
              <Route exact path="/reloadng" component={HomeV1} />
            </Switch>
          </Route>
          <Route
            path={[
              `/reloadng/about`,
              `/reloadng/registration`,
              `/reloadng/settings`,
              `/reloadng/faq`,
              `/reloadng/products`,
              // `/reloadng/error`,
              `/reloadng/product-details/buy`,
              `/reloadng/forgotpassword`,
              `/reloadng/terms`,
              `/reloadng/product-details`,
              `/reloadng/welcome`,
              `/reloadng/contact`,
              `/reloadng/successMessage`,
              `/reloadng/profile`,
              `/reloadng/transactions`,
              `/reloadng/helpdesk`,
              `/reloadng/receipt`
            ]}
          >
            <Switch location={location} key={location.pathname}>
              <Route exact path="/reloadng/about" component={About} />
              <Route
                exact
                path="/reloadng/registration"
                component={Registraion}
              />
              {/* <Route
              exact
              path="/reloadng/profile"
              component={Profile}
            /> */}
              <ProtectedRoutes
                exact
                path="/reloadng/settings"
                component={Settings}
              />
              <ProtectedRoutes
                exact
                path="/reloadng/transactions"
                component={Transaction}
              />
              {/* <Route exact path="/reloadng/error" component={Error} /> */}
              <Route exact path="/reloadng/faq" component={Faq} />
              <Route exact path="/reloadng/products" component={Property} />
              <Route
                exact
                path="/reloadng/product-details/buy"
                component={BuyProduct}
              />
              <Route exact path="/reloadng/helpdesk" component={HelpDesk} />
              <Route
                exact
                path="/reloadng/forgotpassword"
                component={ForgotPassword}
              />
              <Route exact path="/reloadng/terms" component={TermNCondition} />
              <Route
                exact
                path="/reloadng/product-details"
                component={PropertyDetails}
              />
              <ProtectedRoutes
                exact
                path="/reloadng/welcome"
                component={Welcome}
              />
              <ProtectedRoutes
                exact
                path="/reloadng/profile"
                component={Profile}
              />
              <Route exact path="/reloadng/contact" component={Contact} />
              <Route
                exact
                path="/reloadng/successMessage"
                component={SuccessMessage}
              />
              <ProtectedRoutes
                exact
                path="/reloadng/receipt"
                component={Receipt}
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
