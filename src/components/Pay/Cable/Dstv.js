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
import { FLUTTERWAVE_KEY } from "../PaymentProcess/hooks";
import { clearErrors } from "../../../_action/errorAction";
import { verify } from "../../../_action/verify";
import "../../../css/input.css";
// import Button from "../../../components/Button";

function Dstv(props) {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const verifiedUser = useSelector((state) => state.verify);
  const verifyUserdetails = useSelector((state) => state.verifyUserdetails);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [email, setEmail] = useState("");
  const productDetails = useSelector((state) => state.someData.detail);
  const paymentIntent = useSelector((state) => state.paymentIntent);
  const [verifiedAccount, setVerifiedAccount] = useState(null);
  const [verifyProducts, setVerifiedProducts] = useState(null);
  const [valueData, setValueData] = useState(null);
  const [buttonValue, setButtonValue] = useState(null);

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

  console.log(valueData);
  console.log(buttonValue);

  const handleSubmit = (data) => {
    props.setLoading(true)

    setButtonValue(data);
    if (value === "FLUTTERWAVE") {
      setDisabledCard(true);
    } else if (value === "USSD") {
      setDisabledUssd(true);
    }

    const newValuesObj = {
      channelRef: "web",
      description: "Cable",
      paymentMethod:
        value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
      productId: `${productDetails.productId}`,
      referenceValues: {
        "Subscription Amount": props.amount,
        "Smart Card Number": `${verifiedUser.result.account.accountNumber}`,
        "Email Address": `${email}`,
        "Select Package (Amount)": props.packageType,
        "Number of Months": "1",
        "Customer Details": `${verifiedUser.result.account.accountName}`,
        "Customer Number": `${verifiedUser.result.account.accountNumber}`,
      },
      references: [
        "Subscription Amount",
        "Smart Card Number",
        "Email Address",
        "Select Package (Amount)",
        "Number of Months",
        "Customer Details",
        "Customer Number",
      ],
    };

    console.log("value", newValuesObj);

    setValueData(newValuesObj);
    props.PaymentIntent(newValuesObj);
    // props.handleSubmit(value, newValuesObj);
  };

  const handleFieldChange = (e) => {
    setEmail(e.target.value);
  };

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  const Options = JSON.parse(productDetails.detail.productvalue).field3.options;

  const fieldsOption = [];
  for (const key in Options) {
    if (Options.hasOwnProperty(key)) {
      var value = Options[key];
      fieldsOption.push(value);
    }
  }

  // console.log(valueData);

  useEffect(() => {
    if (paymentIntent.success === true) {
      setLoading(false);
      let emails = valueData === null ? "" : valueData.referenceValues["Email Address"];

      // pro
      let amounts = parseInt(valueData === null ? "" : valueData.referenceValues["Subscription Amount"]);

      const detail = {
        amount: amounts,
        email: emails,
        product: productDetails.productname,
        customerId:
          verifiedUser.result === null
            ? ""
            : verifiedUser.result.account.accountNumber,
        buttonClick: buttonValue,
        transRef: paymentIntent.detail.transRef,
        customerName:
          verifiedUser.result === null
            ? ""
            : verifiedUser.result.account.accountName,
      };

      // console.log(detail, valueData);

      dispatch(pay(detail));
      props.dataPay(true, "Cable");
    }
  }, [paymentIntent.success]);

  useEffect(() => {
    if (verifiedUser.verifySuccess === true) {
      setLoading(false);
      setVerifiedProducts(verifiedUser.result.product);
      setVerifiedAccount(verifiedUser.result.account);
      props.verify("Cable", true);
    }
  }, [verifiedUser.verifySuccess]);

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
            {verifyUserdetails.onclick === true &&
            verifyUserdetails.name === "Cable" ? (
              <div>
                <div>
                  <div className="d-flex align-item-center justify-content-center">
                    <div className="inputSize text-right allnew">
                      <p>Account Name</p>
                      <p
                        style={{
                          display: "flex",
                          right: 0,
                          marginLeft: "20px",
                        }}
                      >
                        {verifiedAccount === null
                          ? ""
                          : verifiedAccount.accountName}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-item-center justify-content-center">
                    <div className="inputSize text-right pt-3 allnew">
                      <p>Account Number</p>
                      <p
                        className=""
                        style={{
                          display: "flex",
                          right: 0,
                          marginLeft: "20px",
                        }}
                      >
                        {verifiedAccount === null
                          ? ""
                          : verifiedAccount.accountNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* Email address */}
            {verifyUserdetails.onclick === true &&
            verifyUserdetails.name === "Cable"
              ? fieldsArray.slice(1).map((allFields, i) =>
                  allFields.select === false &&
                  allFields.text === "Email Address" ? (
                    <>
                      <div
                        key={i}
                        className="d-flex align-item-center justify-content-center pt-3"
                      >
                        <TextField
                          required
                          className="inputSize"
                          label={allFields.text}
                          name={allFields.text}
                          onChange={handleFieldChange}
                          placeholder={`Enter ${allFields.text}`}
                          type="email"
                          variant="outlined"
                          value={email}
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )
                )
              : ""}

            {/* amount */}
            {verifyUserdetails.onclick === true &&
            verifyUserdetails.name === "Cable"
              ? fieldsArray.slice(1).map((allFields, i) =>
                  allFields.select === false &&
                  allFields.text !== "Email Address" ? (
                    // <>
                    <div
                      key={i}
                      className="d-flex align-item-center justify-content-center pt-3"
                    >
                      <TextField
                        required
                        // style={{ width: "50%" }}
                        className="inputSize"
                        label={allFields.text}
                        name={allFields.text}
                        value={props.amount}
                        placeholder={`Enter ${allFields.text}`}
                        type="number"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">₦</InputAdornment>
                          ),
                        }}
                        disabled
                      />
                    </div>
                  ) : (
                    ""
                  )
                )
              : ""}
            {verifyUserdetails.onclick === true &&
            verifyUserdetails.name === "Cable" ? (
              // <div className="ButtonSide">
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
                          props.disabledUssd === true
                            ? "not-allowed"
                            : "pointer",
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
            ) : (
              ""
            )}
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
