import React, { useState, useEffect } from "react";
import { PaymentIntent } from "../../_action/Payment";
import { withRouter, Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { Button, TextField, MenuItem } from "@material-ui/core";
import { verifySmartcardNumber } from "../../_action/verifyNumber";
import { verify } from "../../_action/verify";
import { showLoader, hideLoader } from "../../_action/loading";
import { pay } from "../../_action/Payment/paymentButtons";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { finalPayment } from "../../_action/Payment/finalPayment";
import Alert from "@material-ui/lab/Alert";
import { clearErrors } from "../../_action/errorAction";
import "../../css/input.css";
import { useHistory } from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import { USSD_KEY, FLUTTERWAVE_KEY } from "./PaymentProcess/hooks";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Electricity(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  const [email, setEmail] = useState("");
  const user = useSelector((state) =>
    state.authUser.user === null ? "" : state.authUser.user
  );
  const [disabledCard, setDisabledCard] = useState(false);
  const [disabledUssd, setDisabledUssd] = useState(false);
  const [buttonValue, setButtonValue] = useState(null);
  const error = useSelector((state) => state.error);
  const [errors, setErrors] = useState("");
  const [failure, setFailure] = useState("");
  const [otherValues, setOtherValues] = useState({});
  const [amount, setAmount] = useState("");
  const [smartCard, setSmartCard] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selectDetails, setSelectDetails] = useState(null);
  const verifiedUser = useSelector((state) => state.verify);
  const paymentButton = useSelector((state) => state.paymentButton);
  const productDetails = useSelector((state) => state.someData.detail);
  const verifyUserdetails = useSelector((state) => state.verifyUserdetails);
  const paymentIntent = useSelector((state) => state.paymentIntent);
  const [meterType, setMeterType] = useState("");
  const pays = useSelector((state) =>
    state.paymentDone.payment === true ? state.paymentDone.detail : ""
  );
  // const [age, setAge] = React.useState("");

  const handleSelectMeterType = (event) => {
    setMeterType(event.target.value);
  };

  const handleSmartCard = (e) => {
    setSmartCard(e.target.value);
  };

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
      setFailure(error.message.data.result.productResult);
      setTimeout(() => {
        props.clearErrors();
        setErrors("");
      }, 6000);
    }
  }, [error.error === true]);

  console.log(verifiedUser);

  const verifyMeterNumber = async () => {
    if (productDetails.billerCode === "JOS_PREPAID") {
      const details = {
        product: productDetails.productId,
        billerCode: productDetails.billerCode,
        accountNumber: smartCard,
        extras: {
          customerAccountType: "Jos_Disco",
          field1: null,
          field2: null,
          field3: null,
        }
      };
      // console.log(details);

      props.verifySmartcardNumber(details);
    } else {
      const details = {
        product: productDetails.productId,
        accountNumber: smartCard,
        extras: {
          field1: null,
          billerCode: productDetails.billerCode,
          field2: meterType,
          field3: "",
          field4: "",
          customerAccountType: null,
        },
      };

      props.verifySmartcardNumber(details);
    }
  };

  const SmartNumber = async (e) => {
    e.preventDefault();
    setLoading(true);
    let result = verifyMeterNumber();
  };

  const handleSubmit = (value) => {
    // setLoading(true);
    setButtonValue(value);
    if (value === "FLUTTERWAVE") {
      setDisabledCard(true);
    } else if (value === "USSD") {
      setDisabledUssd(true);
    }

    // console.log("daniel", value);

    // if (selectDetails !== null) {
    // const value = e.target.value;
    if (productDetails.billerCode === "ABJ_PREPAID") {
      const newValuesObj = {
        amount: `${amount}`,
        channelRef: "web",
        description: "Electricity Prepaid",
        // paymentMethod: "billpayflutter",
        paymentMethod:
          value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
        productId: `${productDetails.productId}`,
        referenceValues: {
          "Email Address": otherValues["Email Address"],
          // "Email Address": user.user.email,
          "Customer Name": `${verifiedUser.result.account.accountName}`,
          "customer Number": `${verifiedUser.result.account.accountNumber}`,
          "Meter Number": `${verifiedUser.result.account.accountNumber}`,
          "Meter Type": meterType === "PREPAID" ? "ABUJA_PREPAID" : "",
        },
        references: [
          "Email Address",
          "customer Number",
          "Customer Name",
          "Meter Number",
          "Meter Type",
        ],
      };

      props.PaymentIntent(newValuesObj);
    } else if (productDetails.billerCode === "PHCNEKO") {
      const newValuesObj = {
        amount: `${amount}`,
        channelRef: "web",
        description: "Electricity Prepaid",
        // paymentMethod: "billpayflutter",
        paymentMethod:
          value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
        productId: `${productDetails.productId}`,
        referenceValues: {
          accountNumber: `${verifiedUser.result.account.accountNumber}`,
          "Email Address": `${email}`,
          "Account Name": `${verifiedUser.result.account.accountName}`,
        },
        references: ["Email Address", "Account Name", "ProductCode"],
      };

      props.PaymentIntent(newValuesObj);
    } else if (productDetails.billerCode === "iedc") {
      console.log("payment intent");
      const newValuesObj = {
        amount: `${amount}`,
        channelRef: "web",
        description: "Electricity Prepaid",
        // paymentMethod: "billpayflutter",
        paymentMethod:
          value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
        productId: `${productDetails.productId}`,
        referenceValues: {
          "Email Address": otherValues["Email Address"],
          "Account Name": `${amount}`,
          "METER NUMBER": `${verifiedUser.result.account.accountNumber}`,
          "Phone Number": otherValues["Phone Number"],
          "Customer Details": `${verifiedUser.result.account.accountName}`,
        },
        references: [
          "Email Address",
          "Account Name",
          "METER NUMBER",
          "Phone Number",
          "Customer Details",
        ],
      };

      props.PaymentIntent(newValuesObj);
    } else if (productDetails.billerCode === "PHEDDIR2") {
      const newValuesObj = {
        amount: `${amount}`,
        channelRef: "web",
        description: "Electricity Prepaid",
        // paymentMethod: "billpayflutter",
        paymentMethod:
          value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
        productId: `${productDetails.productId}`,
        referenceValues: {
          "Email Address": otherValues["Email Address"],
          // "Email Address": user.user.email,
          "Meter or Account Number": `${verifiedUser.result.account.accountNumber}`,
          "Ref ID": `${verifiedUser.result.account.accountName}`,
          "Meter Type": meterType,
          "Phone Number": otherValues["Phone Number"],
          "Customer Details": JSON.parse(verifiedUser.result.account.extras)
            .extra,
        },
        references: [
          "Email Address",
          "Meter or Account Number",
          "Ref ID",
          "Meter Type",
          "Phone Number",
          "Customer Details",
        ],
      };
      props.PaymentIntent(newValuesObj);
    }
    // } else {
    //   // setLoading(false);
    //   // // const path = `${props.location.pathname}${props.location.search}`;
    //   // // props.loginRediectSuccess(path, props.location.state.data);
    //   // // props.history.push("/registration");
    //   // setOpen(true);
    // }
  };

  // console.log(buttonValue);

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

  const verifyNumber = JSON.parse(productDetails.detail.productvalue).field0;

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

  // console.log(buttonValue);

  // useEffect(() => {
  //   if (paymentIntent.success === true) {
  //     setLoading(false);
  //     const detail = {
  //       amount: amount,
  //       email: otherValues["Email Address"],
  //       buttonClick: buttonValue,
  //       product: productDetails.productname,
  //       transRef: paymentIntent.detail.transRef,
  //       customerName:
  //         verifiedUser.result === null
  //           ? ""
  //           : verifiedUser.result.account.accountName,
  //     };

  //     dispatch(pay(detail));
  //     props.dataPay(true, "Electricity");
  //   }
  // }, [paymentIntent.success]);
  useEffect(() => {
    if (paymentIntent.success === true) {
      // pro
      setLoading(false);
      // let amount = amount;
      const detail = {
        amount: amount,
        email: otherValues["Email Address"],
        product: productDetails.productname,
        accountNumber:
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

      dispatch(pay(detail));
      props.dataPay(true, "Cable");
      // props.onpaymentProcess(buttonValue);
    }
  }, [paymentIntent.success]);


  useEffect(() => {
    if (verifiedUser.verifySuccess === true) {
      setLoading(false);
      props.verify("Electricity", true);
    }
  }, [verifiedUser.verifySuccess]);

  // console.log(selectDetails);

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
        <div>
          <div className="d-flex align-item-center justify-content-center">
            {errors && <Alert severity="error">{errors}</Alert>}
          </div>
          <div>
            {verifyUserdetails.onclick === false &&
            verifyUserdetails.name === "" ? (
              verifyNumber.text === "Meter Number" ||
              "METER NUMBER" ||
              "Meter or Account Number" ? (
                <>
                  <div className="d-flex align-item-center justify-content-center">
                    <TextField
                      required
                      // style={{ width: "50%" }}
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
                  <FormControl className="inputSize">
                    <InputLabel id="demo-customized-select-label">
                      Meter Type
                    </InputLabel>
                    <Select
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      value={meterType}
                      onChange={handleSelectMeterType}
                      placeholder="Select Meter Type"
                      input={<BootstrapInput />}
                    >
                      <MenuItem value="Select Meter Type">
                        <em>Select Meter Type</em>
                      </MenuItem>
                      <MenuItem value="POSTPAID">PostPaid</MenuItem>
                      <MenuItem value="PREPAID">PrePaid</MenuItem>
                    </Select>
                  </FormControl>
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
      )}
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
                // allData.text === "Email Address" ? (
                //   ""
                // ) : (
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
                      // style={{ width: "50%" }}
                      className="inputSize"
                      label={allData.text}
                      name={allData.text}
                      onChange={handleAmount}
                      placeholder={`Enter ${allData.text}`}
                      type="number"
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
        {/* {verifyUserdetails.onclick === true &&
        verifyUserdetails.name === "Electricity"
          ? fieldsArray.slice(1).map((allData, i) =>
              allData.select === true && allData.text === "Meter Type" ? (
                <div key={i}>
                  <div className="d-flex align-item-center justify-content-center pt-3">
                    <TextField
                      required
                      // style={{ width: "50%" }}
                      className="inputSize"
                      label={allData.text}
                      name={allData.text}
                      select
                      placeholder={`Enter ${allData.text}`}
                      variant="outlined"
                    >
                      <MenuItem>Select Data Type</MenuItem>
                      {fieldsOption.map((option, index) => {
                        const detail = JSON.parse(option);
                        return (
                          <MenuItem
                            key={index}
                            value={detail.ItemName}
                            onClick={(e) => handleSelect(allData.text, detail)}
                          >
                            {detail.ItemName}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </div>
                </div>
              ) : (
                ""
              )
            )
          : ""} */}
        <div>
          {verifyUserdetails.onclick === true &&
          verifyUserdetails.name === "Electricity" ? (
            <div className="ButtonSide">
              <div>
                {disabledCard === true ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/product-details?${productDetails.productname}`;
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
                    value={FLUTTERWAVE_KEY}
                    type="submit"
                    style={{
                      backgroundColor: "#fda94f",
                      cursor: disabledUssd === true ? "not-allowed" : "pointer",
                      color: "#000",
                      fontSize: "12px",
                      padding: "11px",
                    }}
                    disabled={disabledUssd}
                  >
                    Proceed to Card
                  </button>
                )}
              </div>
              <div>
                {disabledUssd === true ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/product-details?${productDetails.productname}`;
                      // state: productDetails.productname,
                      // });
                    }}
                  >
                    Go Back
                  </button>
                ) : (
                  <div style={{ marginTop: "25px" }}>
                    <a
                      onClick={(e) => {
                        // e.preventDefault();
                        handleSubmit(USSD_KEY);
                      }}
                      // className="btn"
                      value={USSD_KEY}
                      href="#open-modal"
                      style={{
                        backgroundColor: "#fda94f",
                        cursor:
                          disabledCard === true ? "not-allowed" : "pointer",
                        color: "#000",
                        fontSize: "12px",
                        padding: "11px",
                      }}
                      disabled={disabledCard}
                    >
                      Pay with Ussd
                    </a>{" "}
                  </div>
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
  })(Electricity)
);
