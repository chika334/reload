import React, { useState, useEffect } from "react";
import { PaymentIntent } from "../../../_action/Payment";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";
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
import { FLUTTERWAVE_KEY } from "../PaymentProcess/hooks";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function IkejaPrepaid(props) {
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
  const [otherValues, setOtherValues] = useState("");
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
  const [verifiedAccount, setVerifiedAccount] = useState(null);
  const [verifiedProducts, setVerifiedProducts] = useState(null);
  // const [age, setAge] = React.useState("");

  const handleSelectMeterType = (event) => {
    setMeterType(event.target.value);
  };

  console.log(otherValues);

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
      setFailure(error.message.data.message);
      setTimeout(() => {
        props.clearErrors();
        setErrors("");
      }, 6000);
    }
  }, [error.error === true]);

  // console.log(buttonValue);

  const verifyMeterNumber = async () => {
    if (productDetails.billerCode === "KANO_PREPAID") {
      const details = {
        product: productDetails.productId,
        billerCode: productDetails.billerCode,
        accountNumber: smartCard,
        extras: {
          customerAccountType: meterType === "PREPAID" ? "KANO_PREPAID" : "",
          field1: null,
          field2: meterType === "PREPAID" ? "KANO_PREPAID" : "",
          field3: null,
        },
      };

      props.verifySmartcardNumber(details);
    }
    if (productDetails.billerCode === "JOS_PREPAID") {
      const details = {
        product: productDetails.productId,
        billerCode: productDetails.billerCode,
        accountNumber: smartCard,
        extras: {
          customerAccountType: meterType === "PREPAID" ? "Jos_Disco" : "",
          field1: "1111111111",
          field2: "v.law149@gmail.com",
          field3: "2000",
        },
      };

      props.verifySmartcardNumber(details);
    } else if (productDetails.billerCode === "KADUNA_PREPAID") {
      const details = {
        product: productDetails.productId,
        billerCode: productDetails.billerCode,
        accountNumber: smartCard,
        extras: {
          customerAccountType:
            meterType === "PREPAID" ? "Kaduna_Electricity_Disco" : "",
          field1: "1111111111",
          field2: "v.law149@gmail.com",
          field3: "2000",
        },
      };

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

  const handleSubmit = (value) => {
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

    props.handleSubmit(value, newValuesObj);
  };

  useEffect(() => {
    if (verifiedUser.verifySuccess === true) {
      setLoading(false);
      setVerifiedProducts(verifiedUser.result.product);
      setVerifiedAccount(verifiedUser.result.account);
      props.verify("Electricity", true);
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
                      helperText="Amount should be 1000 and above"
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
        <div>
          {verifyUserdetails.onclick === true &&
          verifyUserdetails.name === "Electricity" ? (
            <div className="ButtonSide pt-3">
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
                    Proceed to Card
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
  })(IkejaPrepaid)
);
