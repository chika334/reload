import React, { useEffect } from "react";
import { coralWebHook } from "../../apis/apis";
import data from "../data.json";
import "../../assets/css/ussdform.css";
import $ from "jquery";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };

var config = {
  jwtToken: "",
  url: "https://www.poplarconnect.com/CoralUssd",
  fullName: "",
  email: "",
};
var data1 = {
  traceId: "2021070109120612",
  transactionType: "0",
  amount: 10,
  merchantId: "4058RNG10000001",
  channel: "USSD",
  terminalId: "4058RNG1",
  subMerchantName: "Reload.ng",
};
var UssdForm = function (_a) {
  var setCbank = _a.setCbank,
    setResponse = _a.setResponse,
    setStatus = _a.setStatus,
    body = _a.body;
  useEffect(function () {
    $(".dropdown").click(function () {
      $(this).attr("tabindex", 1).focus();
      $(this).toggleClass("active");
      $(this).find(".dropdown-menu").slideToggle(300);
    });
    $(".dropdown").focusout(function () {
      $(this).removeClass("active");
      $(this).find(".dropdown-menu").slideUp(300);
    });
    $(".dropdown .dropdown-menu li").click(function () {
      $(this).parents(".dropdown").find("span").text($(this).text());
      // $(this).parents(".dropdown").find("input").attr("value", props.id);
    });
    /*End Dropdown Menu*/
  }, []);
  return React.createElement(
    "div",
    { className: "" },
    React.createElement(
      "div",
      { className: "container" },
      React.createElement("span", { className: "choose" }, "Choose Bank"),
      React.createElement(
        "div",
        { className: "dropdown" },
        React.createElement(
          "div",
          { className: "select" },
          React.createElement("span", null, "Select Bank"),
          React.createElement("i", { className: "fa fa-chevron-left" })
        ),
        React.createElement("input", { type: "hidden", name: "gender" }),
        React.createElement(
          "ul",
          { className: "dropdown-menu" },
          data.map(function (d, i) {
            return React.createElement(
              "li",
              {
                key: i,
                onClick: function () {
                  return __awaiter(void 0, void 0, void 0, function () {
                    var x;
                    return __generator(this, function (_a) {
                      switch (_a.label) {
                        case 0:
                          return [
                            4 /*yield*/,
                            coralWebHook(config, body, setStatus),
                          ];
                        case 1:
                          x = _a.sent();
                          setCbank(d);
                          setResponse(x);
                          return [2 /*return*/];
                      }
                    });
                  });
                },
                className: "input input-" + (i + 1),
              },
              d.bankName
            );
          })
        )
      )
    )
  );
};
export default UssdForm;
//# sourceMappingURL=UssdForm.js.map
