import React from "react";
import UssdActions from "./UssdActions";
import "../../assets/css/display.css";
var UssdDisplay = function (_a) {
    var cBank = _a.cBank, response = _a.response, status = _a.status, setStatus = _a.setStatus, start = _a.start, setStart = _a.setStart, message = _a.message, response1 = _a.response1;
    return (React.createElement("div", { style: {
            textAlign: "center",
            color: "#fff",
            fontSize: "16px",
            margin: "10px",
        } },
        React.createElement("span", { style: {
                fontSize: "24px",
                // marginTop: "10px",
                display: "flex",
                flexDirection: "column",
            } }, cBank.code ? (React.createElement(React.Fragment, null,
            React.createElement("span", { style: {
                    fontSize: "16px",
                    marginTop: "10px",
                    marginBottom: "10px",
                    color: "#000",
                } }, "Input the USSD Code below"),
            React.createElement("a", { style: { color: "#000" }, href: "tel:*" +
                    (cBank === null || cBank === void 0 ? void 0 : cBank.code) +
                    "*000*" +
                    (response === null || response === void 0 ? void 0 : response.ResponseDetails.Reference) +
                    "#" }, "*" + ((cBank === null || cBank === void 0 ? void 0 : cBank.code) || "###") + "*000*" + (response === null || response === void 0 ? void 0 : response.ResponseDetails.Reference) + "#"),
            start ? (React.createElement("span", { style: { color: "#000", marginTop: "10px" } }, "Please wait for response")) : (React.createElement(UssdActions, { setStatus: setStatus, response: response, setStart: setStart })))) : status ? (React.createElement("span", { style: { color: "#000" } }, "Please wait...")) : (React.createElement("span", { style: { color: "#000" } }, "Please, Select a bank"))),
        React.createElement("div", { style: { color: "#00ff00", marginTop: "2em" } },
            (response1 === null || response1 === void 0 ? void 0 : response1.responseCode) ? ((response1 === null || response1 === void 0 ? void 0 : response1.responseCode) !== "00" ? (React.createElement("p", { className: "blink" }, "*Ussd Payment was not Successful*")) : (React.createElement("p", { style: { color: "#00ff00", marginTop: "2em" }, className: "blink blink-two" }, "Ussd Payment was Successful"))) : null,
            React.createElement("span", null))));
};
export default UssdDisplay;
//# sourceMappingURL=UssdDisplay.js.map