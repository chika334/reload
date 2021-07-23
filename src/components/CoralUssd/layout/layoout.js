import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import "../assets/css/layout.css";
import UssdHeader from "../containers/Ussd/UssdHeader";
import UssdForm from "../containers/Ussd/UssdForm";
import UssdDisplay from "../containers/Ussd/UssdDisplay";
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
var Layout = function (_a) {
  var cBank = _a.cBank,
    setCbank = _a.setCbank,
    response = _a.response,
    setResponse = _a.setResponse,
    status = _a.status,
    response1 = _a.response1,
    setStatus = _a.setStatus,
    start = _a.start,
    setStart = _a.setStart,
    message = _a.message,
    body = _a.body;
  var animating = false;
  /* useEffect(() => {
      $(document).ready(function () {
        function menuToggle() {
          $(".demo__page, .demo__menu, .demo__light").toggleClass("menu-active");
          $(".js-menuBtn").toggleClass("m--btn");
          $(document).off("click", ".demo__content", closeNotFocusedMenu);
        }
  
        function closeNotFocusedMenu(e: { target: any }) {
          if (!$(e.target).closest(".demo__menu").length) {
            menuToggle();
            $(document).off("click", ".demo__content", closeNotFocusedMenu);
          }
        }
  
        $(document).on("click", ".js-menuBtn", function () {
          if (animating) return;
          menuToggle();
          $(document).on("click", ".demo__content", closeNotFocusedMenu);
        });
  
        $(document).on("click", ".demo__menu-item:not(.js-menuBtn)", function () {
          animating = true;
          var $this = $(this);
          var page = +$this.data("page");
          $(".js-menuBtn").removeClass("js-menuBtn");
          $(".demo__page.active").removeClass("active");
          $this.addClass("js-menuBtn m--btn");
          $(".demo__page-" + page).addClass("active");
          $(".demo__page, .demo__menu, .demo__light").removeClass("menu-active");
          $(document).off("click", ".demo__content", closeNotFocusedMenu);
          setTimeout(function () {
            $(".demo__menu")[0].className = $(".demo__menu")[0].className.replace(
              /\bpage-active-.*\b/gi,
              ""
            );
            $(".demo__menu").addClass("page-active-" + page);
            animating = false;
          }, 1000);
        });
      });
    }, [animating]); */
  return _jsx(
    _Fragment,
    {
      children: _jsx(
        "div",
        __assign(
          { className: "demo" },
          {
            children: _jsx(
              "div",
              __assign(
                { className: "demo__content" },
                {
                  children: _jsxs(
                    "div",
                    __assign(
                      { className: "demo__page demo__page-1 active" },
                      {
                        children: [
                          _jsx(
                            "a",
                            __assign(
                              {
                                href: "#",
                                title: "Close",
                                className: "modal-close",
                              },
                              { children: "Close" }
                            ),
                            void 0
                          ),
                          _jsxs(
                            "h2",
                            __assign(
                              { className: "demo__page-heading" },
                              {
                                children: [
                                  "USSD",
                                  _jsx(
                                    "span",
                                    { className: "demo__page-heading-colored" },
                                    void 0
                                  ),
                                ],
                              }
                            ),
                            void 0
                          ),
                          _jsx(UssdHeader, { body: body }, void 0),
                          _jsx(
                            UssdForm,
                            {
                              setCbank: setCbank,
                              setResponse: setResponse,
                              setStatus: setStatus,
                              body: body,
                            },
                            void 0
                          ),
                          _jsx(
                            UssdDisplay,
                            {
                              cBank: cBank,
                              response: response,
                              status: status,
                              setStatus: setStatus,
                              start: start,
                              response1: response1,
                              setStart: setStart,
                              message: message,
                            },
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
            ),
          }
        ),
        void 0
      ),
    },
    void 0
  );
};
export default Layout;
//# sourceMappingURL=layoout.js.map
