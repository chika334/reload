import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "react/jsx-runtime";
import "../assets/css/modal.css";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var Modal2 = function (_a) {
  var children = _a.children;
  return _jsxs(
    _Fragment,
    {
      children: [
        _jsx("div", { className: "container" }, void 0),
        _jsx(
          "div",
          __assign(
            { id: "open-modal", className: "modal-window" },
            { children: _jsx("div", { children: children }, void 0) }
          ),
          void 0
        ),
      ],
    },
    void 0
  );
};
export default Modal2;
//# sourceMappingURL=Modal2.js.map
