import React from "react";
var UssdHeader = function (_a) {
    var body = _a.body;
    return (React.createElement(React.Fragment, null,
        React.createElement("h3", { className: "demo__page-subheading" }, "Payment"),
        React.createElement("h3", { className: "demo__page-subheading", style: {
                textAlign: "right",
                marginRight: "10px",
                textTransform: "capitalize",
                display: "flex",
                flexDirection: "column",
                fontSize: "20px",
            } },
            React.createElement("span", null, body === null || body === void 0 ? void 0 : body.fullName)),
        React.createElement("span", { style: {
                textAlign: "right",
                marginRight: "10px",
                display: "flex",
                flexDirection: "column",
                fontSize: "18px",
                opacity: 0.5,
            } }, body === null || body === void 0 ? void 0 : body.email)));
};
export default UssdHeader;
//# sourceMappingURL=UssdHeader.js.map