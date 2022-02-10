import React, { Component } from "react";
import Routes from "./Routes";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.ts";
// import "./assets/base.scss";
import "./App.css";

// _actions
import { getUser } from "./_action/userAction";
import { getProducts } from "./_action/products";
import { interswitchToken } from "./_action/Loan/token";
import { interswitchProvider } from "./_action/Loan/providers";
import { Offline, Online } from "react-detect-offline";
import NoInternet from "./components/section-components/NoInternet";
// import Layout from "./Layout";
// import Layout from "./components/CoralUssd/layout/layoout";

// import GoogleAd from "./Layout";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("token")) {
      store.dispatch(getUser());
      store.dispatch(getProducts());
      store.dispatch(interswitchToken());
      store.dispatch(interswitchProvider(localStorage.access_token));
    } else {
      store.dispatch(getProducts());
      return <Redirect to={`/`} />;
    }
  }

  render() {
    return (
      <Provider store={store}>
        {/* <Router> */}
          {/* // checks if user has internet connection */}
          {/* {navigator.onLine ? <Routes /> : <NoInternet />} */}
          {/* <Online> */}
          <Routes />
          {/* </Layout> */}
          {/* </Online> */}
          {/* <Offline>
            <NoInternet />
          </Offline> */}
        {/* </Router> */}
        {/* <Layout /> */}
        {/* <GoogleAd /> */}
      </Provider>
    );
  }
}

export default App;
