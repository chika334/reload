import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../_action/loading";
import {
  verifySmartcardNumber,
  clearVerified,
} from "../../../_action/verifyNumber";
// import CoralUssd from "../../components/CorralUssd/App";
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
      amount: selectDetails.productAmount,
      channelRef: "web",
      description: "Cable",
      paymentMethod:
        value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
      productId: `${productDetails.productId}`,
      referenceValues: {
        "SmartCard Number": `${verifiedUser.result.account.accountNumber}`,
        "Email Address": `${email}`,
        "Select Package (Amount)":
          selectDetails === null ? "" : selectDetails.productName,
      },
      references: [
        "SmartCard Number",
        "Email Address",
        "Select Package (Amount)",
      ],
    };

    props.handleSubmit(value, newValuesObj);
    // if()
    // if (selectDetails !== null) {
    // setLoading(true);
    // if (productDetails.billerCode === "STARTIMES") {
    //   const newValuesObj = {
    //     amount: `${selectDetails.Amount}`,
    //     channelRef: "web",
    //     description: "Cable",
    //     // paymentMethod: "billpayflutter",
    //     paymentMethod:
    //       value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
    //     productId: `${productDetails.productId}`,
    //     referenceValues: {
    //       "SmartCard Number": `${verifiedUser.result.account.accountNumber}`,
    //       "Email Address": `${email}`,
    //       "Select Package":
    //         selectDetails === null ? "" : selectDetails.productName,
    //     },
    //     references: ["Email Address", "Select Package ", "SmartCard Number"],
    //   };

    //   props.PaymentIntent(newValuesObj);
    //   // props.pay(true, "Cable");
    //   // props.verify("Cable", true);
    // } else if (productDetails.billerCode === "DSTV") {
    //   const newValuesObj = {
    //     amount: selectDetails.productAmount,
    //     channelRef: "web",
    //     description: "Cable",
    //     // paymentMethod: "billpayflutter",
    //     paymentMethod:
    //       value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
    //     productId: `${productDetails.productId}`,
    //     referenceValues: {
    //       "SmartCard Number": `${verifiedUser.result.account.accountNumber}`,
    //       "Email Address": `${email}`,
    //       "Select Package (Amount)":
    //         selectDetails === null ? "" : selectDetails.productName,
    //     },
    //     references: [
    //       "SmartCard Number",
    //       "Email Address",
    //       "Select Package (Amount)",
    //     ],
    //   };

    //   props.PaymentIntent(newValuesObj);
    // } else if (productDetails.billerCode === "GOTV") {
    //   const newValuesObj = {
    //     amount: `${selectDetails.productAmount}`,
    //     // amount: "100",
    //     channelRef: "web",
    //     description: "Cable",
    //     // paymentMethod: "billpayflutter",
    //     paymentMethod:
    //       value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
    //     productId: `${productDetails.productId}`,
    //     referenceValues: {
    //       "SmartCard Number": `${verifiedUser.result.account.accountNumber}`,
    //       "Email Address": `${email}`,
    //       "Select Package (Amount)":
    //         selectDetails === null ? "" : selectDetails.productName,
    //     },
    //     references: [
    //       "Email",
    //       "Select Package (Amount)",
    //       "Number of Months",
    //       "SmartCard Number",
    //     ],
    //   };
    //   // props.pay(true, "Cable");
    //   props.PaymentIntent(newValuesObj);
    //   // props.verify("Cable", true);
    // }
    // // handlePaymentProcess();
    // // } else {
    // //   if (!localStorage.token) {
    // //     // setLoading(false);
    // //     // // const path = `${props.location.pathname}${props.location.search}`;
    // //     // // props.loginRediectSuccess(path, props.location.state.data);
    // //     // // props.history.push("/registration");
    // //     // setOpen(true);
    // //   }
    // // }
  };

  // useEffect(() => {
  //   if (paymentIntent.success === true) {
  //     // pro
  //     setLoading(false);
  //     let amount = selectDetails === null ? "" : selectDetails.productAmount;
  //     const detail = {
  //       amount: amount,
  //       email: email,
  //       product: productDetails.productname,
  //       accountNumber:
  //         verifiedUser.result === null
  //           ? ""
  //           : verifiedUser.result.account.accountNumber,
  //       buttonClick: buttonValue,
  //       transRef: paymentIntent.detail.transRef,
  //       customerName:
  //         verifiedUser.result === null
  //           ? ""
  //           : verifiedUser.result.account.accountName,
  //     };

  //     // console.log(detail);
  //     dispatch(pay(detail));
  //     props.dataPay(true, "Cable");
  //     // props.onpaymentProcess(buttonValue);
  //   }
  // }, [paymentIntent.success]);

  const handleFieldChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSelect = (name, value) => {
    const data = {
      productName: name,
      productAmount: value,
    };

    setSelectDetails(data);
  };

  const handleSmartCard = (e) => {
    setSmartCard(e.target.value);
  };

  const verifyMeterNumber = async () => {
    const details = {
      product: productDetails.productId,
      accountNumber: smartCard,
    };

    const valueData = JSON.stringify(details);

    props.verifySmartcardNumber(valueData);
  };

  const SmartNumber = async (e) => {
    e.preventDefault();
    setLoading(true);
    let result = verifyMeterNumber();
    // if (localStorage.token) {
    // } else {
    //   props.history.push("/registration");
    // }
  };

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  // const deal = Object.values(fieldsArray);
  // useEffect(() => {
  //   deal.map((allData) => {
  //     if (allData.text === "Product type") {
  //       if (allData.select !== true) {
  //         return setDisabled(false);
  //       } else {
  //         return setDisabled(true);
  //       }
  //     } else {
  //       return setDisabled(false);
  //     }
  //   });
  // }, []);

  const verifyNumber = JSON.parse(productDetails.detail.productvalue).field0;

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
            <div>
              {verifyUserdetails.onclick === false &&
              verifyUserdetails.name === "" ? (
                verifyNumber.text === "SmartCard Number" ? (
                  <>
                    <div className="d-flex align-item-center justify-content-center">
                      <TextField
                        required
                        className="inputSize"
                        label={verifyNumber.text}
                        name="smartCard"
                        onChange={handleSmartCard}
                        placeholder={`Enter ${verifyNumber.text}`}
                        type="number"
                        variant="outlined"
                        value={smartCard}
                      />
                    </div>
                    <div className="d-flex align-item-center justify-content-center">
                      <Button
                        onClick={SmartNumber}
                        type="button"
                        style={{
                          backgroundColor: "#fda94f",
                          color: "#000",
                          fontSize: "12px",
                          padding: "11px",
                        }}
                      >
                        Verify
                      </Button>
                    </div>
                  </>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
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

                {/* dropdown */}
                <div className="d-flex justify-content-center">
                  <TextField
                    className="inputSize pt-3"
                    required
                    label="Please Select your present bouquet plan"
                    // name={allField.text}
                    placeholder={`Please Select Bouquet`}
                    select
                    type="text"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <MenuItem>Select Data Type</MenuItem>
                    {verifiedProducts === null
                      ? ""
                      : verifiedProducts.map((allData, index) => {
                          return (
                            <MenuItem
                              key={index}
                              value={allData.productName}
                              onClick={(e) =>
                                handleSelect(
                                  allData.productName,
                                  allData.productAmount
                                )
                              }
                            >
                              {allData.productName}
                            </MenuItem>
                          );
                        })}
                  </TextField>
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
                        // onChange={handleFieldChange}
                        value={
                          selectDetails === null
                            ? ""
                            : selectDetails.productAmount
                        }
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
                        // state: productDetails.productname,
                        // });
                      }}
                    >
                      Go Back
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // console.log(payment);
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
                </div>
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
  })(Cable)
);
