import React from "react";
import "../assets/css/layout.css";
import UssdHeader from "../containers/Ussd/UssdHeader";
import UssdForm from "../containers/Ussd/UssdForm";
import UssdDisplay from "../containers/Ussd/UssdDisplay";
var Layout = function (_a) {
    var cBank = _a.cBank, setCbank = _a.setCbank, response = _a.response, setResponse = _a.setResponse, status = _a.status, response1 = _a.response1, setStatus = _a.setStatus, start = _a.start, setStart = _a.setStart, message = _a.message, body = _a.body;
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
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "demo" },
            React.createElement("div", { className: "demo__top" }),
            React.createElement("div", { className: "demo__light" }),
            React.createElement("div", { className: "demo__content" },
                React.createElement("div", { className: "demo__menu page-active-1" }),
                React.createElement("div", { className: "demo__page demo__page-1 active" },
                    React.createElement("h2", { className: "demo__page-heading" },
                        "USSD",
                        React.createElement("span", { className: "demo__page-heading-colored" })),
                    React.createElement(UssdHeader, { body: body }),
                    React.createElement(UssdForm, { setCbank: setCbank, setResponse: setResponse, setStatus: setStatus, body: body }),
                    React.createElement(UssdDisplay, { cBank: cBank, response: response, status: status, setStatus: setStatus, start: start, response1: response1, setStart: setStart, message: message }))))));
};
export default Layout;
//# sourceMappingURL=layoout.js.map