import React, { Component } from "react";
import Routes from "./Routes";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.ts";
// import "./assets/base.scss";
// import "./App.css";
// import "./css/banner.scss";
// import "./css/style.scss";
// import "./css/css/style.css";
// import NoInternet from "./NoInternet";

// _actions
// import { getUser } from "./_actions/userAction";
// import { getCountryId } from "./_actions/Action_countryId";
// import { getTransactions } from "./_actions/transactions";
// import { wallets } from "./_actions/wallet";
// import { showModal, hideModal } from "./_actions/modal";
// import { verifyNumber } from "./_actions/tokenAction";
import { exportButton } from "./_action/exploreProducts";

class componentName extends Component {
  // componentDidMount() {
  //   if (localStorage.getItem("token")) {
  //     store.dispatch(getCountryId());
  //     store.dispatch(getUser());
  //     store.dispatch(getTransactions());
  //     store.dispatch(wallets());
  //     // store.dispatch(verifyNumber());
  //     store.dispatch(showModal());
  //     store.dispatch(hideModal());
  //   } else {
  //     return <Redirect to={`${process.env.REACT_APP_URL}`} />;
  //   }
  // }
  componentDidMount() {
    store.dispatch(exportButton());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          {/* // checks if user has internet connection */}
          {/* {navigator.onLine ? <Routes /> : <NoInternet />} */}
          <Routes />
        </Router>
      </Provider>
    );
  }
}

export default componentName;
