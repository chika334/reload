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
import { pay, paymentButtons } from "../../../_action/Payment/paymentButtons";
import { clearErrors } from "../../../_action/errorAction";
import { verify } from "../../../_action/verify";
import "../../../css/input.css";
import Slide from "@material-ui/core/Slide";
import { USSD_KEY, FLUTTERWAVE_KEY } from "../PaymentProcess/hooks";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Cable(props) {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.authUser);
  const user = useSelector((state) =>
    state.authUser.user === null ? "" : state.authUser.user
  );
  const error = useSelector((state) => state.error);
  const verifiedUser = useSelector((state) => state.verify);
  const verifyUserdetails = useSelector((state) => state.verifyUserdetails);
  const paymentButton = useSelector((state) => state.paymentButton);
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
  const [verifiedProducts, setVerifiedProducts] = useState(null);

  console.log(verifiedProducts);

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

  const handleSubmit = (value) => {
    setButtonValue(value);
    if (value === "FLUTTERWAVE") {
      setDisabledCard(true);
    } else if (value === "USSD") {
      setDisabledUssd(true);
    }

    const newValuesObj = {
      amount: props.amount,
      channelRef: "web",
      description: "Cable",
      paymentMethod:
        value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
      productId: `${productDetails.productId}`,
      referenceValues: {
        "SmartCard Number": `${verifiedUser.result.account.accountNumber}`,
        "Email Address": `${email}`,
        Package: selectDetails === null ? "" : selectDetails.productName,
        "Customer Name":
          verifiedAccount === null ? "" : verifiedAccount.accountName,
      },
      references: [
        "SmartCard Number",
        "Email Address",
        "Package",
        "Customer Name",
      ],
    };

    // console.log(newValuesObj);

    props.handleSubmit(value, newValuesObj);
  };

  const handleFieldChange = (e) => {
    setEmail(e.target.value);
  };

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

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

            {/* bouquet */}
            <div className="d-flex justify-content-center">
              <div className="text-right pt-3">
                <p style={{ float: "left", marginRight: "15px" }}>
                  Bouquet Type:{" "}
                </p>
                <p
                  className=""
                  style={{
                    display: "flex",
                    right: 0,
                    marginLeft: "20px",
                  }}
                >
                  {props.packageName}
                </p>
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
              allFields.select === false && allFields.text === "Email" ? (
                <>
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
              allFields.text !== "Email" &&
              allFields.text !== "Customer Name" ? (
                // <>
                <div
                  key={i}
                  className="d-flex align-item-center justify-content-center pt-3"
                >
                  <TextField
                    required
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
          <div className="ButtonSide">
            <div>
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
            <div>
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
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* </>
      )} */}
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
  })(Cable)
);
