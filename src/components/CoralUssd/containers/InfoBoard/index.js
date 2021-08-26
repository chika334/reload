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
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
var InfoBoard = function (_a) {
    var heading = _a.heading, value = _a.value;
    return (_jsxs("div", { children: [_jsxs("span", { children: [heading, ":"] }, void 0),
            _jsx("h5", __assign({ style: { marginTop: "10px", marginBottom: "8px" } }, { children: value }), void 0)] }, void 0));
};
export default InfoBoard;
//# sourceMappingURL=index.js.map