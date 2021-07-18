import React, { Component } from "react";
import Routes from "./Routes";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.ts";
// import "./assets/base.scss";
import "./App.css";

// _actions
import { getUser } from "./_action/userAction";
import { getProducts, getProductsById } from "./_action/products";
import { Offline, Online } from "react-detect-offline";
import NoInternet from "./components/section-components/NoInternet";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("token")) {
      store.dispatch(getUser());
      store.dispatch(getProducts());
    } else {
      store.dispatch(getProducts());
      return <Redirect to={`/reloadng`} />;
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          {/* // checks if user has internet connection */}
          {/* {navigator.onLine ? <Routes /> : <NoInternet />} */}
          {/* <Online> */}
            <Routes />
          {/* </Online> */}
          {/* <Offline>
            <NoInternet />
          </Offline> */}
        </Router>
      </Provider>
    );
  }
}

export default App;
