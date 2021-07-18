import React from "react";
import "../../assets/css/button.css";
var config = {
    jwtToken: "",
    url: "https://www.poplarconnect.com/CoralUssd",
    fullName: "",
    email: "",
};
var UssdActions = function (_a) {
    var setStatus = _a.setStatus, response = _a.response, setStart = _a.setStart;
    return (React.createElement("div", { id: "container" },
        React.createElement("button", { className: "learn-more", onClick: function () {
                setStart(true);
            } },
            React.createElement("span", { className: "circle", "aria-hidden": "true" },
                React.createElement("span", { className: "icon arrow" })),
            React.createElement("span", { className: "button-text" }, "Proceed"))));
};
export default UssdActions;
//# sourceMappingURL=UssdActions.js.map