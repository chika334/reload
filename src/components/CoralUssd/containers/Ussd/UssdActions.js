import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../../assets/css/button.css";
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
var config = {
  jwtToken: "",
  url: "https://www.poplarconnect.com/CoralUssd",
  fullName: "",
  email: "",
};
var UssdActions = function (_a) {
  var setStatus = _a.setStatus,
    response = _a.response,
    setStart = _a.setStart;
  return _jsx(
    "div",
    __assign(
      { id: "container" },
      {
        children: _jsxs(
          "button",
          __assign(
            {
              className: "learn-more",
              onClick: function () {
                setStart(true);
              },
            },
            {
              children: [
                _jsx(
                  "span",
                  __assign(
                    { className: "circle", "aria-hidden": "true" },
                    {
                      children: _jsx(
                        "span",
                        { className: "icon arrow" },
                        void 0
                      ),
                    }
                  ),
                  void 0
                ),
                _jsx(
                  "span",
                  __assign(
                    { className: "button-text" },
                    { children: "Proceed" }
                  ),
                  void 0
                ),
              ],
            }
          ),
          void 0
        ),
      }
    ),
    void 0
  );
};
export default UssdActions;
//# sourceMappingURL=UssdActions.js.map
