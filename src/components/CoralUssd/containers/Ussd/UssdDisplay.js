import {
  jsx as _jsx,
  Fragment as _Fragment,
  jsxs as _jsxs,
} from "react/jsx-runtime";
import UssdActions from "./UssdActions";
import "../../assets/css/display.css";
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
var UssdDisplay = function (_a) {
  var cBank = _a.cBank,
    response = _a.response,
    status = _a.status,
    setStatus = _a.setStatus,
    start = _a.start,
    setStart = _a.setStart,
    message = _a.message,
    response1 = _a.response1;
  return _jsxs(
    "div",
    __assign(
      {
        style: {
          textAlign: "center",
          color: "#fff",
          fontSize: "16px",
          margin: "10px",
        },
      },
      {
        children: [
          _jsx(
            "span",
            __assign(
              {
                style: {
                  fontSize: "24px",
                  // marginTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                },
              },
              {
                children: cBank.code
                  ? _jsxs(
                      _Fragment,
                      {
                        children: [
                          _jsx(
                            "span",
                            __assign(
                              {
                                style: {
                                  fontSize: "16px",
                                  marginTop: "10px",
                                  marginBottom: "10px",
                                  color: "#000",
                                },
                              },
                              { children: "Input the USSD Code below" }
                            ),
                            void 0
                          ),
                          _jsx(
                            "a",
                            __assign(
                              {
                                style: { color: "#000" },
                                href:
                                  "tel:*" +
                                  (cBank === null || cBank === void 0
                                    ? void 0
                                    : cBank.code) +
                                  "*000*" +
                                  (response === null || response === void 0
                                    ? void 0
                                    : response.ResponseDetails.Reference) +
                                  "#",
                              },
                              {
                                children:
                                  "*" +
                                  ((cBank === null || cBank === void 0
                                    ? void 0
                                    : cBank.code) || "###") +
                                  "*000*" +
                                  (response === null || response === void 0
                                    ? void 0
                                    : response.ResponseDetails.Reference) +
                                  "#",
                              }
                            ),
                            void 0
                          ),
                          start
                            ? _jsx(
                                "span",
                                __assign(
                                  {
                                    style: { color: "#000", marginTop: "10px" },
                                  },
                                  { children: "Please wait for response" }
                                ),
                                void 0
                              )
                            : _jsx(
                                UssdActions,
                                {
                                  setStatus: setStatus,
                                  response: response,
                                  setStart: setStart,
                                },
                                void 0
                              ),
                        ],
                      },
                      void 0
                    )
                  : status
                  ? _jsx(
                      "span",
                      __assign(
                        { style: { color: "#000" } },
                        { children: "Please wait..." }
                      ),
                      void 0
                    )
                  : _jsx(
                      "span",
                      __assign(
                        { style: { color: "#000" } },
                        { children: "Please, Select a bank" }
                      ),
                      void 0
                    ),
              }
            ),
            void 0
          ),
          _jsxs(
            "div",
            __assign(
              { style: { color: "#00ff00", marginTop: "2em" } },
              {
                children: [
                  (
                    response1 === null || response1 === void 0
                      ? void 0
                      : response1.responseCode
                  )
                    ? (response1 === null || response1 === void 0
                        ? void 0
                        : response1.responseCode) !== "00"
                      ? _jsx(
                          "p",
                          __assign(
                            { className: "blink" },
                            { children: "*Ussd Payment was not Successful*" }
                          ),
                          void 0
                        )
                      : _jsx(
                          "p",
                          __assign(
                            {
                              style: { color: "#00ff00", marginTop: "2em" },
                              className: "blink blink-two",
                            },
                            { children: "Ussd Payment was Successful" }
                          ),
                          void 0
                        )
                    : null,
                  _jsx("span", {}, void 0),
                ],
              }
            ),
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
export default UssdDisplay;
//# sourceMappingURL=UssdDisplay.js.map
