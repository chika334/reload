import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ModalProvider } from "react-simple-hook-modal";
import Main from "./containers/Main";
import "react-simple-hook-modal/dist/styles.css";
import { firstRequest, queryRequest } from "./api/apis";
var App = function (_a) {
    var data = _a.data, onSuccess = _a.onSuccess, isModalOpen = _a.isModalOpen, toggleIt = _a.toggleIt;
    /*  const data = {
      amount: 50,
      channel: "USSD",
      merchantId: "4058RNG10000001",
      subMerchantName: "Reload.ng",
      terminalId: "4058RNG1",
      traceId: "bp02108160000820",
      transactionType: "0",
    }; */
    var _b = useState(""), value = _b[0], setValue = _b[1];
    var _c = useState(false), start = _c[0], setStart = _c[1];
    var _d = useState(0), count = _d[0], setCount = _d[1];
    var _e = useState({}), response = _e[0], setResponse = _e[1];
    var _f = useState(null), result = _f[0], setResult = _f[1];
    var _g = useState({}), queryData = _g[0], setQueryData = _g[1];
    var _h = useState(""), message = _h[0], setMessage = _h[1];
    var _j = useState(true), modal = _j[0], setModal = _j[1];
    var toggleModal = function () {
        setModal(!modal);
    };
    useEffect(function () {
        firstRequest(data, setResponse);
    }, []);
    var toggle = function (e) {
        setValue(e);
        setQueryData({
            transactionId: response.TransactionID,
            amount: data.amount,
            merchantId: data.merchantId,
            channel: data.channel,
            terminalId: data.terminalId,
        });
    };
    useEffect(function () {
        if (start && count < 30) {
            setTimeout(function () {
                queryRequest(queryData, setResult);
                setCount(count + 1);
            }, 2000);
        }
        if (result && start) {
            if (result.responseCode === "00") {
                setMessage("Ussd Payment was Successful");
            }
            if (result.responseCode === "00") {
                setStart(false);
                onSuccess(result);
            }
            if (result.responseCode === "09" && count === 30) {
                setStart(false);
                onSuccess(result);
                setMessage("Ussd Payment was not Successful");
            }
        }
    }, [start, count]);
    return (_jsx(ModalProvider, { children: _jsx(Main, { value: value, start: start, toggle: toggle, isModalOpen: isModalOpen, openModal: toggleIt, closeModal: toggleIt, setQueryData: setQueryData, queryData: queryData, message: message, setStart: setStart, response: response, result: result, toggleModal: toggleModal }, void 0) }, void 0));
};
export default App;
//# sourceMappingURL=App.js.map