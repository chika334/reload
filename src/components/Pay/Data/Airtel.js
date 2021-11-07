import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../_action/loading";
import {
  verifySmartcardNumber,
  clearVerified,
} from "../../../_action/verifyNumber";
import { MenuItem, TextField, Button } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { PaymentIntent, clearPayment } from "../../../_action/Payment/index";
import Alert from "@material-ui/lab/Alert";
import { pay } from "../../../_action/Payment/paymentButtons";
import { clearErrors } from "../../../_action/errorAction";
import { verify } from "../../../_action/verify";
import "../../../css/input.css";
import Slide from "@material-ui/core/Slide";
import { USSD_KEY, FLUTTERWAVE_KEY } from "../PaymentProcess/hooks";
import axios from "axios";
import airtel from "./jsonData/airtel.json";

function Airtel(props) {
  const error = useSelector((state) => state.error);
  const [disabledCard, setDisabledCard] = useState(false);
  const [disabledUssd, setDisabledUssd] = useState(false);
  const [buttonValue, setButtonValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [smartCard, setSmartCard] = useState("");
  const [selectDetails, setSelectDetails] = useState(null);
  const productDetails = useSelector((state) => state.someData.detail);
  const [bouquet, setBouquet] = useState(null);
  const [selectName, setSelectName] = useState(null);

  useEffect(() => {
    if (error.id === "VERIFY_FAILED") {
      setLoading(false);
      setErrors(error.message.message);
      setTimeout(() => {
        props.clearErrors();
      }, 5000);
    } else if (error.id === "BUY_DATA_FAILURE") {
      setLoading(false);
      setErrors(error.message.message);
      setTimeout(() => {
        props.clearErrors();
        setErrors("");
      }, 5000);
    } else if (error.id === "FINAL_PAYMENT_ERROR") {
      setLoading(false);
      setErrors(error.message.message);
      setTimeout(() => {
        props.clearErrors();
        setErrors("");
      }, 5000);
    }
  }, [error.error === true]);

  const handleSelect = (e) => {
    setSelectDetails(e.target.value);

    // console.log(e.target.value);

    airtel.map((allData) => {
      // console.log(allData);
      if (allData.amount === parseInt(e.target.value)) {
        // console.log(allData.slug);
        setSelectName(allData.slug);
      }
    });
  };

  const handleSubmit = (value) => {
    setButtonValue(value);
    if (value === "FLUTTERWAVE") {
      setDisabledCard(true);
    } else if (value === "USSD") {
      setDisabledUssd(true);
    }

    if (selectDetails === null || smartCard === null || selectName === null) {
      setTimeout(() => {
        setErrors("Please input all Fields");
      }, 500);
    } else {
      if (smartCard["phoneNumber"] && smartCard["email"]) {
        setErrors("");
        const newValuesObj = {
          amount: selectDetails === null ? "" : selectDetails,
          channelRef: "web",
          description: "Airtime",
          paymentMethod:
            value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
          productId: `${productDetails.productId}`,
          referenceValues: {
            customerId: `${smartCard["phoneNumber"]}`,
            customerName: `${smartCard["email"]}`,
            phoneNumber: `${smartCard["phoneNumber"]}`,
            packageSlug: selectName === null ? "" : selectName,
            email: `${smartCard["email"]}`,
          },
          references: [
            "email",
            "packageSlug",
            "phoneNumber",
            "customerName",
            "customerId",
          ],
        };

        props.handleSubmit(value, newValuesObj);
      } else {
        setTimeout(() => {
          setErrors("Please input all Fields");
        }, 500);
      }
    }
  };

  const handleOthers = (e, name) => {
    const newValues = { ...smartCard };
    newValues[name] = e.target.value;
    setSmartCard(newValues);
  };

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  return (
    <div className="property-details-area">
      {loading ? (
        <div className="preloader" id="preloader">
          <div className="preloader-inner">
            <div className="spinner">
              <div className="dot1"></div>
              <div className="dot2"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>
            <div className="d-flex align-item-center justify-content-center">
              {errors && <Alert severity="error">{errors}</Alert>}
            </div>
          </div>
          {/* bouquet */}
          <div className="">
            <div className="pt-3">
              <div className="d-flex align-item-center justify-content-center">
                <select
                  value={selectDetails === null ? "" : selectDetails["name"]}
                  onChange={(e) => handleSelect(e)}
                  className="p-3"
                  id="inputSize"
                  style={{ borderRadius: "3px" }}
                >
                  <option>Select bouquet</option>
                  {airtel.map((allData, i) => (
                    // console.log(allData)
                    <option
                      onClick={(e) => handleSelectClick(e, allData.name)}
                      value={allData.amount}
                      key={i}
                    >
                      {allData.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div>
            <div>
              {fieldsArray.map((allFields, i) =>
                allFields.text === "customerId" ||
                allFields.text === "amount" ? (
                  ""
                ) : allFields.select !== true ? (
                  <div
                    key={i}
                    className="d-flex align-item-center justify-content-center pt-3"
                  >
                    <TextField
                      className="inputSize"
                      required
                      label={
                        allFields.text === "phoneNumber"
                          ? "Phone Number"
                          : allFields.text === "email"
                          ? "Email"
                          : ""
                      }
                      onChange={(e) => handleOthers(e, allFields.text)}
                      type={allFields.text === "email" ? "email" : "number"}
                      variant="outlined"
                    />
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
            {fieldsArray.map((allFields, i) =>
              allFields.text === "customerId" ||
              allFields.text === "email" ||
              allFields.text === "phoneNumber" ? (
                ""
              ) : allFields.select !== true ? (
                <div
                  key={i}
                  className="d-flex align-item-center justify-content-center pt-3"
                >
                  <TextField
                    className="inputSize"
                    required
                    label={allFields.text === "amount" ? "Amount" : ""}
                    onChange={(e) => handleOthers(e, allFields.text)}
                    value={selectDetails === null ? "" : selectDetails}
                    disabled
                    type={allFields.text === "email" ? "email" : "number"}
                    variant="outlined"
                    InputProps={{
                      startAdornment:
                        allFields.text === "Amount" ? (
                          <InputAdornment position="start">₦</InputAdornment>
                        ) : (
                          ""
                        ),
                    }}
                  />
                </div>
              ) : (
                ""
              )
            )}
            {/* <div className="ButtonSide"> */}
            <div>
              <div className="d-flex justify-content-center">
                {props.disabledCard === true ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/${process.env.REACT_APP_RELOADNG}/product-details`;
                    }}
                  >
                    Go Back
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(FLUTTERWAVE_KEY);
                    }}
                    type="submit"
                    style={{
                      backgroundColor: "#fda94f",
                      cursor:
                        props.disabledUssd === true ? "not-allowed" : "pointer",
                      color: "#000",
                      fontSize: "12px",
                      padding: "11px",
                    }}
                    disabled={props.disabledUssd}
                  >
                    Proceed to Card
                  </button>
                )}
              </div>
              {/* <div>
                {props.disabledUssd === true ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/${process.env.REACT_APP_RELOADNG}/product-details`;
                    }}
                  >
                    Go Back
                  </button>
                ) : (
                  <div>
                    <button
                      // className="btn"
                      value={USSD_KEY}
                      onClick={(e) => {
                        handleSubmit(USSD_KEY);
                      }}
                      style={{
                        backgroundColor: "#fda94f",
                        cursor:
                          props.disabledCard === true
                            ? "not-allowed"
                            : "pointer",
                        color: "#000",
                        fontSize: "12px",
                        padding: "11px",
                      }}
                      disabled={props.disabledCard}
                    >
                      Pay with Ussd
                    </button>{" "}
                  </div>
                )}
              </div> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default withRouter(
  connect(null, {
    verifySmartcardNumber,
    showLoader,
    clearErrors,
    hideLoader,
    PaymentIntent,
    clearPayment,
    clearVerified,
    pay,
    verify,
  })(Airtel)
);
