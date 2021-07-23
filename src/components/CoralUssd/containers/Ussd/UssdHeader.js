import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "react/jsx-runtime";
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
var UssdHeader = function (_a) {
  var body = _a.body;
  return _jsxs(
    _Fragment,
    {
      children: [
        _jsx(
          "h3",
          __assign(
            { className: "demo__page-subheading" },
            { children: "Payment" }
          ),
          void 0
        ),
        _jsx(
          "h3",
          __assign(
            {
              className: "demo__page-subheading",
              style: {
                textAlign: "right",
                marginRight: "10px",
                textTransform: "capitalize",
                display: "flex",
                flexDirection: "column",
                fontSize: "20px",
              },
            },
            {
              children: _jsx(
                "span",
                {
                  children:
                    body === null || body === void 0 ? void 0 : body.fullName,
                },
                void 0
              ),
            }
          ),
          void 0
        ),
        _jsx(
          "span",
          __assign(
            {
              style: {
                textAlign: "right",
                marginRight: "10px",
                display: "flex",
                flexDirection: "column",
                fontSize: "18px",
                opacity: 0.5,
              },
            },
            { children: body === null || body === void 0 ? void 0 : body.email }
          ),
          void 0
        ),
      ],
    },
    void 0
  );
};
export default UssdHeader;
//# sourceMappingURL=UssdHeader.js.map
