import React, { useState, useEffect } from "react";
import { PaymentIntent } from "../../../_action/Payment";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { Button, TextField, MenuItem } from "@material-ui/core";
import { verifySmartcardNumber } from "../../../_action/verifyNumber";
import { verify } from "../../../_action/verify";
import { showLoader, hideLoader } from "../../../_action/loading";
import { pay } from "../../../_action/Payment/paymentButtons";
// import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { finalPayment } from "../../../_action/Payment/finalPayment";
import Alert from "@material-ui/lab/Alert";
import { clearErrors } from "../../../_action/errorAction";
import "../../../css/input.css";
import { useHistory } from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import { USSD_KEY, FLUTTERWAVE_KEY } from "../PaymentProcess/hooks";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";

function Eko(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  // const [email, setEmail] = useState("");
  const user = useSelector((state) =>
    state.authUser.user === null ? "" : state.authUser.user
  );
  // const [disabledCard, setDisabledCard] = useState(false);
  // const [disabledUssd, setDisabledUssd] = useState(false);
  // const [buttonValue, setButtonValue] = useState(null);
  const error = useSelector((state) => state.error);
  const [errors, setErrors] = useState("");
  const [failure, setFailure] = useState("");
  const [otherValues, setOtherValues] = useState("");
  const [amount, setAmount] = useState("");
  const [smartCard, setSmartCard] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selectDetails, setSelectDetails] = useState(null);
  const verifiedUser = useSelector((state) => state.verify);
  // const paymentButton = useSelector((state) => state.paymentButton);
  const productDetails = useSelector((state) => state.someData.detail);
  const verifyUserdetails = useSelector((state) => state.verifyUserdetails);
  const [verifiedAccount, setVerifiedAccount] = useState(null);
  const [verifiedProducts, setVerifiedProducts] = useState(null);

  useEffect(() => {
    if (error.id === "VERIFY_FAILED") {
      setLoading(false);
      setErrors(error.message.message);
      setTimeout(() => {
        props.clearErrors();
        setErrors("");
      }, 5000);
    } else if (error.id === "FINAL_PAYMENT_ERROR") {
      setLoading(false);
      setFailure(error.message.data.message);
      setTimeout(() => {
        props.clearErrors();
        setErrors("");
      }, 6000);
    }
  }, [error.error === true]);

  const handleSubmit = (value) => {
    const newValuesObj = {
      "Email Address": otherValues["Email Address"],
      amount: `${amount}`,
      channelRef: "web",
      description: "Electricity Prepaid",
      paymentMethod:
        value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
      productId: `${productDetails.productId}`,
      referenceValues: {
        accountNumber: `${verifiedUser.result.account.accountNumber}`,
        "Email Address": otherValues["Email Address"],
        "Account Name": `${verifiedUser.result.account.accountName}`,
      },
      references: ["Email Address", "Account Name", "ProductCode"],
    };

    props.handleSubmit(value, newValuesObj);
  };

  useEffect(() => {
    if (verifiedUser.verifySuccess === true) {
      setLoading(false);
      setVerifiedProducts(verifiedUser.result.product);
      setVerifiedAccount(verifiedUser.result.account);
      dispatch(verify("Electricity", true));
    }
  }, [verifiedUser.verifySuccess]);

  const handleFieldChange = (e, name) => {
    const newValues = { ...otherValues };
    newValues[name] = e.target.value;
    setOtherValues(newValues);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleSelect = (name, value) => {
    setSelectDetails(value);
  };

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  const Options =
    JSON.parse(productDetails.detail.productvalue).field6 === undefined
      ? ""
      : JSON.parse(productDetails.detail.productvalue).field6.options;

  const fieldsOption = [];
  for (const key in Options) {
    if (Options.hasOwnProperty(key)) {
      var value = Options[key];
      fieldsOption.push(value);
    }
  }

  useEffect(() => {
    if (verifiedUser.verifySuccess === true) {
      setLoading(false);
      props.verify("Electricity", true);
    }
  }, [verifiedUser.verifySuccess]);

  return (
    <div className="property-details-area">
      <div>
        <div className="d-flex align-item-center justify-content-center">
          {failure && <Alert severity="error">{failure}</Alert>}
        </div>
        {verifyUserdetails.onclick === true &&
        verifyUserdetails.name === "Electricity"
          ? fieldsArray.slice(1).map((allData, i) =>
              allData.select === false &&
              allData.text !== "Amount" &&
              allData.text !== "Meter Type" ? (
                <div key={i}>
                  <div className="d-flex align-item-center justify-content-center pt-3">
                    <TextField
                      required
                      // style={{ width: "50%" }}
                      className="inputSize"
                      label={allData.text}
                      name={allData.text}
                      onChange={(e) => handleFieldChange(e, allData.text)}
                      placeholder={`Enter ${allData.text}`}
                      type={
                        allData.text === "Email Address"
                          ? "email"
                          : allData.text === "Customer Name"
                          ? "text"
                          : allData.text === "Customer Number"
                          ? "number"
                          : allData.text === "Account description"
                          ? "number"
                          : allData.text === "Account Name"
                          ? "text"
                          : allData.text === "Phone number"
                          ? "number"
                          : allData.text === "Invoice Number"
                          ? "number"
                          : ""
                      }
                      variant="outlined"
                      value={
                        allData.text === "Customer Name"
                          ? verifiedUser.result.account.accountName
                          : allData.text === "Customer Number"
                          ? verifiedUser.result.account.accountNumber
                          : allData.text === "Email Address"
                          ? otherValues["Email Address"]
                          : allData.text === "Account description"
                          ? verifiedUser.result.account.accountNumber
                          : allData.text === "Account Name"
                          ? verifiedUser.result.account.accountName
                          : allData.text === "Customer Details"
                          ? verifiedUser.result.account.accountNumber
                          : allData.text === "Ref ID"
                          ? verifiedUser.result.account.accountName
                          : allData.text === "Phone Number"
                          ? otherValues["Phone Number"]
                          : allData.text === "Invoice Number"
                          ? verifiedUser.result.account.accountNumber
                          : ""
                      }
                    />
                  </div>
                </div>
              ) : (
                // )
                ""
              )
            )
          : ""}
        {verifyUserdetails.onclick === true &&
        verifyUserdetails.name === "Electricity"
          ? fieldsArray.slice(1).map((allData, i) =>
              allData.select === false && allData.text === "Amount" ? (
                <div key={i}>
                  <div className="d-flex align-item-center justify-content-center pt-3">
                    <TextField
                      required
                      className="inputSize"
                      label={allData.text}
                      name={allData.text}
                      onChange={handleAmount}
                      placeholder={`Enter ${allData.text}`}
                      type="number"
                      helperText="Amount should be 1000 and above"
                      variant="outlined"
                      value={amount}
                    />
                  </div>
                </div>
              ) : (
                ""
              )
            )
          : ""}
        <div>
          {verifyUserdetails.onclick === true &&
          verifyUserdetails.name === "Electricity" ? (
            <div className="pt-3">
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
                    value={FLUTTERWAVE_KEY}
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
                    Proceed
                  </button>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(
  connect(null, {
    verifySmartcardNumber,
    verify,
    PaymentIntent,
    pay,
    showLoader,
    clearErrors,
    hideLoader,
    finalPayment,
  })(Eko)
);
