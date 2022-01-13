import { connect } from "react-redux";
import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRouteReceipt = ({
  component: Component,
  isAuthenticated,
  finalPaymentSuccess,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      // isAuthenticated ||
      (localStorage.token && finalPaymentSuccess === true) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: `/${process.env.REACT_APP_RELOADNG}/products`,
          }}
        />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.authUser.isAuthenticated,
  finalPaymentSuccess: state.FinalPayment,
});

export default connect(mapStateToProps, null)(PrivateRouteReceipt);
