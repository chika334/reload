import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../_action/loading";
import {
  verifySmartcardNumber,
  clearVerified,
} from "../../../_action/verifyNumber";
import { TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { PaymentIntent, clearPayment } from "../../../_action/Payment/index";
import Alert from "@material-ui/lab/Alert";
import { pay } from "../../../_action/Payment/paymentButtons";
import { clearErrors } from "../../../_action/errorAction";
import { verify } from "../../../_action/verify";
import "../../../css/input.css";
import { FLUTTERWAVE_KEY } from "../PaymentProcess/hooks";

function Dstv(props) {
  const error = useSelector((state) => state.error);
  const [disabledCard, setDisabledCard] = useState(false);
  const [disabledUssd, setDisabledUssd] = useState(false);
  const [buttonValue, setButtonValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [open, setOpen] = React.useState(false);
  const [smartCard, setSmartCard] = useState("");
  const [selectDetails, setSelectDetails] = useState(null);
  const [email, setEmail] = useState("");
  const productDetails = useSelector((state) => state.someData.detail);
  const paymentIntent = useSelector((state) => state.paymentIntent);
  const [verifiedAccount, setVerifiedAccount] = useState(null);

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

  const amount = parseInt(`${smartCard["amount"]}`);

  const handleSubmit = (value) => {
    setButtonValue(value);
    if (value === "FLUTTERWAVE") {
      setDisabledCard(true);
    } else if (value === "USSD") {
      setDisabledUssd(true);
    }

    if (smartCard === null) {
      setTimeout(() => {
        setErrors("Please input all Fields");
      }, 500);
    } else {
      if (smartCard["phoneNumber"] && smartCard["email"]) {
        setErrors("");
        const newValuesObj = {
          amount: amount,
          channelRef: "web",
          description: "Airtime",
          paymentMethod:
            value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
          productId: `${productDetails.productId}`,
          referenceValues: {
            customerId: `${smartCard["phoneNumber"]}`,
            customerName: `${smartCard["email"]}`,
            phoneNumber: `${smartCard["phoneNumber"]}`,
            packageSlug: "MTN_VTU",
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
          <div>
            <div>
              {fieldsArray.map((allFields, i) =>
                allFields.text === "customerId" ? (
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
                          : allFields.text === "amount"
                          ? "Amount"
                          : ""
                      }
                      onChange={(e) => handleOthers(e, allFields.text)}
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
            </div>

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
                    value={USSD_KEY}
                    onClick={(e) => {
                      handleSubmit(USSD_KEY);
                    }}
                    style={{
                      backgroundColor: "#fda94f",
                      cursor:
                        props.disabledCard === true ? "not-allowed" : "pointer",
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
  })(Dstv)
);
