import React, { useState, useEffect } from "react";
import Layout from "./layout/layoout";
import Modal from "./Modal/Modal";
import { coralWebHookQuery } from "./apis/apis";
var App = function (_a) {
  var _b, _c;
  var visible = _a.visible,
    toggle = _a.toggle,
    body = _a.body;
  var _d = useState({}),
    cBank = _d[0],
    setCbank = _d[1];
  var _e = useState(null),
    response = _e[0],
    setResponse = _e[1];
  var _f = useState(),
    response1 = _f[0],
    setResponse1 = _f[1];
  var _g = useState(false),
    status = _g[0],
    setStatus = _g[1];
  var _h = useState(false),
    start = _h[0],
    setStart = _h[1];
  var _j = useState(""),
    message = _j[0],
    setMessage = _j[1];
  var _k = useState(0),
    count = _k[0],
    setCount = _k[1];
  var c = 0;
  var config = {
    jwtToken: "",
    url: "https://www.poplarconnect.com/CoralUssd",
    fullName: "",
    email: "",
  };
  var data1 = {
    transactionId:
      (_b =
        response === null || response === void 0
          ? void 0
          : response.ResponseDetails) === null || _b === void 0
        ? void 0
        : _b.TransactionID,
    amount:
      (_c =
        response === null || response === void 0
          ? void 0
          : response.ResponseDetails) === null || _c === void 0
        ? void 0
        : _c.Amount,
    merchantId: body === null || body === void 0 ? void 0 : body.merchantId,
    channel: body === null || body === void 0 ? void 0 : body.channel,
    terminalId: body === null || body === void 0 ? void 0 : body.terminalId,
  };
  useEffect(
    function () {
      if (
        start &&
        count < 30 &&
        (response1 === null || response1 === void 0
          ? void 0
          : response1.responseCode) !== "00"
      ) {
        setTimeout(function () {
          coralWebHookQuery(config, data1, setStatus).then(function (res) {
            setResponse1(res);
            setCount(count + 1);
          });
        }, 2000);
      } else {
        if (
          (response1 === null || response1 === void 0
            ? void 0
            : response1.responseCode) === "00"
        ) {
          setMessage("Ussd Payment was Successful");
        } else {
          setMessage("Ussd Payment was not Successful");
        }
        setStart(false);
      }
      console.log(response1);
      console.log(count);
    },
    [start, count]
  );
  return React.createElement(
    "div",
    null,
    React.createElement(
      Modal,
      { toggle: toggle, visible: visible },
      React.createElement(Layout, {
        body: body,
        cBank: cBank,
        setCbank: setCbank,
        response: response,
        setResponse: setResponse,
        status: status,
        setStatus: setStatus,
        setStart: setStart,
        start: start,
        message: message,
        response1: response1,
      })
    ),
    React.createElement(
      "button",
      {
        style: { fontSize: "20px" },
        onClick: function () {
          return toggle();
        },
      },
      "Ussd Payment"
    )
  );
};
export default App;
//# sourceMappingURL=App.js.map
