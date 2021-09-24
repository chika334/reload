import React, { useState, useEffect } from "react";
import "./css/style1.css";
import $ from "jquery";
import { withRouter } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { hostedField } from "../../../_action/Loan/hostedField";
// import "./css/style.css"

function Index() {
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const [values, setValue] = useState({
    cardNumber: "",
    exp: "",
    cvv: "",
    pin: "",
  });
  const [data, setData] = useState("");
  let hostedData = null;

  const { cardNumber, exp, cvv, pin } = values;

  const handleChange = (e, name) => {
    console.log(name);
    // const newValues = { ...values };
    // newValues[name] = e.target.value;
    // setValue(newValues);
  };

  const handleSumit = () => {
    alert("all good");
  };

  useEffect(() => {
    const decoder = new TextDecoder("utf-8");
    fetch(
      "https://mufasa-qa.interswitchng.com/p/lending-service/accept/sandbox/build.js"
    )
      .then((response) => {
        response.body
          .getReader()
          .read()
          .then(({ value, done }) => {
            const details = decoder.decode(value);

            const parseData = JSON.parse(details)

            console.log("going", typeof parseData);
            // return details;

            $(document).ready(function () {
              var form = document.querySelector('button[type="submit"]');
              var showOtp = document.getElementById("otp-field");
              var hideFields = document.getElementsByClassName("hideOnOtp");
              var validateCardButton = document.getElementById(
                "validateButton"
              );
              var backButton = document.getElementById("back-button");
              var cardForm = document.getElementById("cardForm");

              backButton.addEventListener("click", function () {
                backControl();
              });

              $("#validateButton").click(function () {
                if (validateCardButton.innerHTML == "Submit") {
                  validateCardButton.innerHTML = "Loading...";
                }
              });

              interswitch.hostedFields.newInstance(
                {
                  authorization:
                    "eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOlsiY2FyZGxlc3Mtc2VydmljZSIsImNyZWRpdC1zY29yZS1zZXJ2aWNlIiwiaW5jb2duaXRvIiwiaXN3LWNvbGxlY3Rpb25zIiwiaXN3LWNvcmUiLCJpc3ctbGVuZGluZy1zZXJ2aWNlIiwiaXN3LXBheW1lbnRnYXRld2F5IiwicGFzc3BvcnQiLCJwYXltZW50LXNlcnZpY2UiLCJwcm9qZWN0LXgtbWVyY2hhbnQiLCJwd20iLCJ2YXVsdCJdLCJtZXJjaGFudF9jb2RlIjoiTVgxODciLCJwcm9kdWN0aW9uX3BheW1lbnRfY29kZSI6IjAwMTY0NjM5ODU0IiwicmVxdWVzdG9yX2lkIjoiMDAxMTc2MTQ5OTIiLCJzY29wZSI6WyJwcm9maWxlIl0sImp0aSI6IjUyM2I5OTFjLWUwYWUtNGFlZS04YWYzLWJhOGE3MzY0MzgyNyIsInBheWFibGVfaWQiOiIyMzI0IiwiY2xpZW50X2lkIjoiSUtJQTk2MTRCODIwNjRENjMyRTlCNjQxOERGMzU4QTZBNEFFQTg0RDcyMTgiLCJwYXltZW50X2NvZGUiOiIwNDI1OTQxMzAyNDYifQ.idaGQ4gF-GFl5vb9zuYNsEWYsoy23zx1UX8uEnedenqMf1o8B_lmIUSFw8Vk_HlRQXY5AMYLIQGe1i4iklWXu8WCpfck2R2iAIVMkp7dDm1Xm4WcW-I79W-IVMont6bIXWe4XmP4XKhzroQnkIMDxS5noQdkpqyGeMcTQxRqMXzwOPKxIL0DOG5AEDM4Tj_hkf4ch1dc7s_mlQjUzg3_Jmm7kyHhnCJ-Cy3EaPSuapaio-loQCAc2kDim5GQce_yDixhL8W6QxfPJL9ayJ4RPsMLImWKuxJdb1ICvAo23OBxglTfPJEI276Uv63Wj4I1yOx21gSigJQ1Z9gh4Ad6Sg",
                  request: {
                    customerId: "2348123456789",
                    channelCode: "QTUSSD",
                    offerId: "OFFER1537956820100",
                    providerCode: "MKT",
                    transactionRef: "846464698439545",
                    creditMethod: {
                      accountNumber: "0724770698",
                      bankCode: "044",
                    },
                  },
                  styles: {
                    input: {
                      "font-size": "14px",
                      "font-family": "roboto, verdana, sans-serif",
                      "font-weight": "lighter",
                      color: "black",
                      "border-width": "0px",
                    },
                    ":focus": {
                      outline: "none",
                    },
                    ".valid": {
                      color: "black",
                    },
                    ".invalid": {
                      color: "red",
                    },
                  },
                  fields: {
                    pan: {
                      selector: "#card-pan",
                      placeholder: "5199 1107 8784 0401",
                    },
                    cvv: {
                      selector: "#card-cvv",
                      placeholder: "544",
                    },
                    exp: {
                      selector: "#expiration-date",
                      placeholder: "02/24",
                    },
                    pin: {
                      selector: "#card-pin",
                      placeholder: "****",
                    },
                    otp: {
                      selector: "#card-otp",
                      placeholder: "******",
                    },
                  },
                  onError: function (error) {
                    showNotificationAlert(error.responseMessage, true);
                  },
                },
                function (err, hostedFieldInstance) {
                  if (err) {
                    // something is wrong,
                    return;
                  }
                  function findLabel(field) {
                    return $(
                      '.hosted-field--label[for="' + field.container.id + '"]'
                    );
                  }

                  hostedFieldInstance.on("focus", function (event) {
                    var field = event.fields[event.emittedBy];

                    findLabel(field)
                      .addClass("label-float")
                      .removeClass("filled");
                  });

                  // Emulates floating label pattern
                  hostedFieldInstance.on("blur", function (event) {
                    var field = event.fields[event.emittedBy];
                    var label = findLabel(field);

                    if (field.isEmpty) {
                      label.removeClass("label-float");
                    } else if (field.isValid) {
                      label.addClass("filled");
                    } else {
                      label.addClass("invalid");
                    }
                  });

                  hostedFieldInstance.on("empty", function (event) {
                    var field = event.fields[event.emittedBy];

                    findLabel(field)
                      .removeClass("filled")
                      .removeClass("invalid");
                  });

                  hostedFieldInstance.on("validityChange", function (event) {
                    var field = event.fields[event.emittedBy];
                    var label = findLabel(field);

                    if (field.isPotentiallyValid) {
                      label.removeClass("invalid");
                    } else {
                      label.addClass("invalid");
                    }
                  });

                  form.addEventListener(
                    "click",
                    function (evt) {
                      evt.preventDefault();
                      evt.stopPropagation();

                      hostedFieldInstance.submit(function (err, payload) {
                        if (err) {
                          if (err.responseMessage) {
                            showNotificationAlert(
                              "Transaction failed with " + err.responseMessage,
                              true
                            );
                            return;
                          } else if (err.message.body) {
                            if (err.message.body.token) {
                              showNotificationAlert(
                                "Transaction Successful",
                                false
                              );
                              return;
                            }
                            if (err.message.body.errors) {
                              showNotificationAlert(
                                "Transction Failed with" +
                                  JSON.stringify(
                                    err.message.body.errors[0]["message"]
                                  ),
                                true
                              );
                              return;
                            }
                          } else {
                            if (err.responseCode === "T0") {
                              $(hideFields).removeClass("textfield--show");
                              $(hideFields).addClass("textfield--hide");

                              $(showOtp).removeClass("textfield--hide");
                              $(showOtp).addClass("textfield--show");

                              $(validateCardButton).addClass("blue");

                              $(validateCardButton).html("Validate");

                              showNotificationAlert(err.message, false);
                              return;
                            } else {
                              showNotificationAlert(err.message, true);
                              return;
                            }
                          }
                        } else if (payload) {
                          if (Object.keys(payload.body).length <= 1) {
                            showNotificationAlert("Transaction Failed", true);
                          }
                          if (payload.body.responseCode == "00") {
                            showNotificationAlert(
                              payload.body.responseMessage,
                              false
                            );
                          }
                          if (payload.body.responseCode != "00") {
                            showNotificationAlert(
                              "Sorry, your loan request was declined",
                              true
                            );
                          }
                          return;
                        }
                      });
                    },
                    false
                  );
                }
              );

              function showNotificationAlert(message, isError) {
                var notificationBox = document.querySelector(
                  ".notification-box"
                );
                notificationBox.classList.add("show");

                var notificationContent = notificationBox.querySelector(
                  ".content"
                );
                notificationContent.innerHTML = message;

                notificationContent.classList.remove("error");
                notificationContent.classList.remove("success");

                notificationContent.classList.add(
                  isError ? "error" : "success"
                );

                setTimeout(function () {
                  notificationBox.classList.remove("show");
                }, 3000);
              }

              function backControl() {
                location.reload();

                $(showOtp).removeClass("textfield--show");
                $(hideFields).removeClass("textfield--hide");

                $(showOtp).addClass("textfield--hide");
                $(hideFields).addClass("textfield--show");

                $(validateCardButton).removeClass("blue");

                $(validateCardButton).html("Submit");
              }
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {/* <div className="payment-form-container" data-field-type="pan">
        <div className="form-header">
          <img src="https://mufasa-qa.interswitchng.com/p/webpay/logos/default.png" />
          <div className="info">
            <div className="title">ISW Hosted Fields Demo</div>
            <div className="amount">&#8358; 1,500</div>
          </div>
        </div>
        <div className="alertSuccess" id="response">
          <p id="response-code" style={{ padding: "0px 10px" }}></p>
          <p id="response-message" style={{ padding: "0px 10px" }}></p>
        </div>
        <div className="form-page card-details show">
          <div className="form-control">
            <label>Card Number</label>
            <div id="cardNumber-container" className="payment-field"></div>
          </div>
          <div className="form-group">
            <div className="form-control">
              <label>EXP</label>
              <div
                id="expirationDate-container"
                className="payment-field"
              ></div>
            </div>
            <div className="form-control">
              <label>CVV</label>
              <div id="cvv-container" className="payment-field"></div>
            </div>
          </div>
          <div className="button-container">
            <button id="pay-button" className="blue">
              Pay
            </button>
          </div>
        </div>
        <div className="form-page pin">
          <div className="back-control" id="pin-back-button">
            <img src="./back-icon.png" />
            <label>Back</label>
          </div>
          <div className="form-text">Please provide your PIN</div>
          <div className="form-control">
            <label></label>
            <div id="pin-container" className="payment-field"></div>
          </div>
          <div className="button-container">
            <button id="continue-button" className="green">
              Continue
            </button>
          </div>
        </div>
        <div className="form-page otp">
          <div className="back-control" id="otp-back-button">
            <img src="./back-icon.png" />
            <label>Back</label>
          </div>
          <div className="form-text">
            Please input the OTP sent to your mobile number
          </div>
          <div className="form-control">
            <label></label>
            <div id="otp-container" className="payment-field"></div>
          </div>
          <div className="button-container">
            <button id="validate-button" className="orange">
              Validate
            </button>
          </div>
        </div>
        <div className="form-page cardinal">
          <div className="cardinal-container"></div>
        </div>
      </div> */}
      <form id="cardForm">
        <div className="panel">
          <div className="notification-box">
            <div className="content"></div>
          </div>
          <header className="panel__header">
            <img src="./img/isw-logo.png" />
            <p>ILS Hosted Fields Demo Page</p>
          </header>
          <div className="panel__content">
            <div className="textfield--float-label hideOnOtp">
              {/* <!-- Begin hosted fields section --> */}
              <label className="hosted-field--label" htmlFor="card-pan">
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="15"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                  </svg>
                </span>
                Card Number
              </label>
              <div id="card-pan" className="hosted-field"></div>
              {/* <!-- End hosted fields section --> */}
            </div>
            <div className="textfield--float-label hideOnOtp">
              {/* <!-- Begin hosted fields section --> */}
              <label className="hosted-field--label" htmlFor="expiration-date">
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="15"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                  </svg>
                </span>
                Exp
              </label>
              <div id="expiration-date" className="hosted-field"></div>
              {/* <!-- End hosted fields section --> */}
            </div>
            <div className="textfield--float-label hideOnOtp">
              {/* <!-- Begin hosted fields section --> */}
              <label className="hosted-field--label" htmlFor="card-cvv">
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="15"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                </span>
                CVV
              </label>
              <div id="card-cvv" className="hosted-field"></div>
              {/* <!-- End hosted fields section --> */}
            </div>
            <div className="textfield--float-label hideOnOtp">
              {/* <!-- Begin hosted fields section --> */}
              <label className="hosted-field--label" htmlFor="card-pin">
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="15"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                </span>
                Pin
              </label>
              <div id="card-pin" className="hosted-field"></div>
              {/* <!-- End hosted fields section --> */}
            </div>
            <div
              className="textfield--float-label textfield--hide"
              id="otp-field"
              style={{ width: "100%" }}
            >
              <div className="back-control" id="back-button">
                <span className="back-icon">
                  <svg
                    width="12"
                    height="12"
                    top="0"
                    viewBox="0 0 19 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>back</title>
                    <path
                      fill="#5fabdc"
                      d="M5.657 15.556L18.385 2.828 15.555 0 0 15.556l15.556 15.557 2.83-2.83"
                      fillRule="evenodd"
                    />
                  </svg>
                </span>
                <label>Back</label>
              </div>

              {/* <!-- Begin hosted fields section --> */}
              <label className="hosted-field--label" htmlFor="card-otp">
                Kindly enter the OTP sent to your mobile number
              </label>
              <div id="card-otp" className="hosted-field"></div>
              {/* <!-- End hosted fields section --> */}
            </div>
          </div>
          <footer className="panel__footer">
            <button className="pay-button" type="submit" id="validateButton">
              Submit
            </button>
          </footer>
        </div>
      </form>
    </div>
  );
}

export default withRouter(connect(null, { hostedField })(Index));
