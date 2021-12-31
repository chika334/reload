import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var MessageBoard = function (_a) {
    var response = _a.response, value = _a.value;
    return (_jsx("div", __assign({ style: {
            background: "rgb(255, 242, 214)",
            width: "100%",
            minHeight: "100px",
            borderRadius: "10px",
            padding: "5px",
            textAlign: "center",
        } }, { children: !value ? (_jsx("h1", __assign({ style: {
                color: "#fff",
                fontWeight: 900,
                textShadow: "5px 1px 2px rgba(150, 150, 150, 0.3)",
            } }, { children: "Select Your Bank" }), void 0)) : (_jsxs(_Fragment, { children: [_jsxs("span", __assign({ style: { fontWeight: "bolder", color: "#a929ff" } }, { children: ["Tap to Dial:", " ", _jsx("a", __assign({ style: { color: "#996702", paddingLeft: "5px" }, href: "*" + value.value + "*000*" + response.Reference + "#" }, { children: "*" + value.value + "*000*" + response.Reference + "#" }), void 0)] }), void 0),
                _jsxs("p", __assign({ style: { color: "#434d4c", fontWeight: "bold" } }, { children: ["Dial", " ", _jsxs("span", __assign({ style: {
                                color: "#996702",
                                paddingLeft: "5px",
                                paddingRight: "5px",
                            } }, { children: [" ", "*" + value.value + "*000*" + response.Reference + "#"] }), void 0), " ", "on your mobile phone to complete this transaction"] }), void 0)] }, void 0)) }), void 0));
};
export default MessageBoard;
//# sourceMappingURL=index.js.map