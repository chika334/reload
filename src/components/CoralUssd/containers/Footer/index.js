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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var Footer = function (_a) {
    var setStart = _a.setStart, start = _a.start;
    var style = { color: "orange", marginTop: "5px", border: " 0.2px dashed" };
    return (_jsxs("div", __assign({ style: {
            position: "absolute",
            bottom: "0",
            textAlign: "center",
            width: "100%",
            left: "0",
            paddingBottom: "4px",
        } }, { children: [_jsx("button", __assign({ style: { background: "orange", color: "#fff", padding: "5px" }, onClick: function () {
                    setStart(true);
                } }, { children: !start ? " Check Transaction Status(After Payment)" : "Wait for it..." }), void 0),
            _jsx("hr", { style: style }, void 0),
            _jsxs("span", { children: ["Powered by", " ", _jsx("a", __assign({ href: "http://blacksillicon.com", style: { color: "#FFA500" } }, { children: "Blacksilicon" }), void 0)] }, void 0)] }), void 0));
};
export default Footer;
//# sourceMappingURL=index.js.map