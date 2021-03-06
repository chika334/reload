import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// import "./index.css";
import { Offline, Online } from "react-detect-offline";
import NoInternet from "./components/section-components/NoInternet";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// ReactDOM.render(<App />, document.getElementById("realdeal"));

ReactDOM.render(
  <Router>{navigator.onLine ? <App /> : <NoInternet />}</Router>,
  document.getElementById("realdeal")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
