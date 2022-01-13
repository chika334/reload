// import React, { useState, useEffect } from "react";
// import { withRouter } from "react-router-dom";
// import { connect, useSelector, useDispatch } from "react-redux";
// import { showLoader, hideLoader } from "../../../_action/loading";
// import {
//   verifySmartcardNumber,
//   clearVerified,
// } from "../../../_action/verifyNumber";
// import {
//   MenuItem,
//   TextField,
//   Select,
//   FormControl,
//   InputLabel,
//   Button,
// } from "@material-ui/core";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import { PaymentIntent, clearPayment } from "../../../_action/Payment/index";
// import Alert from "@material-ui/lab/Alert";
// import { pay, paymentButtons } from "../../../_action/Payment/paymentButtons";
// import { clearErrors } from "../../../_action/errorAction";
// import { verify } from "../../../_action/verify";
// import "../../../css/input.css";
// import Slide from "@material-ui/core/Slide";
// // import { USSD_KEY, FLUTTERWAVE_KEY } from "../PaymentProcess/hooks";
// // import axios from "axios";
// // import gotv from "./jsonData/gotv.json";
// import NewFormData from "../../Form/NewFormData";
// import VerifyDetails from "../PaymentProcess/verifyDetails";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// function Cable(props) {
//   const verifiedUser = useSelector((state) => state.verify);
//   const verifyUserdetails = useSelector((state) => state.verifyUserdetails);
//   const [disabledCard, setDisabledCard] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [smartCard, setSmartCard] = useState("");
//   const productDetails = useSelector((state) => state.someData.detail);

//   const handleOthers = (e, name) => {
//     const newValues = { ...smartCard };
//     newValues[name] = e.target.value;
//     setSmartCard(newValues);
//   };

//   // const verifyMeterNumber = async () => {
//   //   const details = {
//   //     product: productDetails.productId,
//   //     billerCode: "GOTV",
//   //     accountNumber: smartCard.customerId,
//   //     extras: {
//   //       billerSlug: "GOTV",
//   //       customerId: smartCard.customerId,
//   //       productName: "GOTV",
//   //     },
//   //   };

//   //   props.verifySmartcardNumber(details);
//   // };

//   // const SmartNumber = async (e) => {
//   //   e.preventDefault();
//   //   props.setLoading(true);
//   //   let result = verifyMeterNumber();
//   // };

//   const item = JSON.parse(productDetails.detail.productvalue);
//   const fieldsArray = [];
//   for (const data in item) {
//     fieldsArray.push(item[data]);
//   }

//   useEffect(() => {
//     if (verifiedUser.verifySuccess === true) {
//       setLoading(false);
//       props.verify("Cable", true);
//     }
//   }, [verifiedUser.verifySuccess]);

//   return (
//     <div className="property-details-area">
//       <div>
//         {verifyUserdetails.onclick === false &&
//         verifyUserdetails.name === "" ? (
//           <div>
//             <VerifyDetails
//               billerCode="ABUJA_DISCO"
//               productName="ABUJA_DISCO"
//               billerSlug="ABUJA_DISCO"
//               productType="Electricity"
//               setLoading={props.setLoading}
//             />
//           </div>
//         ) : (
//           ""
//         )}

//         {verifyUserdetails.onclick === true &&
//         verifyUserdetails.name === "Cable" ? (
//           <>
//             <div className="d-flex align-item-center justify-content-center pt-3">
//               <p className="mr-5">Customer Name:</p>
//               <p>
//                 {verifiedUser.result === null
//                   ? ""
//                   : verifiedUser.result.account.accountName}
//               </p>
//             </div>
//             <div className="d-flex align-item-center justify-content-center pt-3">
//               <p className="mr-5">Meter Number:</p>
//               <p>
//                 {verifiedUser.result === null
//                   ? ""
//                   : verifiedUser.result.account.accountNumber}
//               </p>
//             </div>
//             <NewFormData
//               product="Electricity"
//               disabledCard={props.disabledCard}
//               setDisabledCard={setDisabledCard}
//               slug="ABUJA_DISCO"
//               productData="null"
//             />
//           </>
//         ) : (
//           ""
//         )}
//       </div>
//     </div>
//   );
// }

// export default withRouter(
//   connect(null, {
//     verifySmartcardNumber,
//     showLoader,
//     clearErrors,
//     hideLoader,
//     PaymentIntent,
//     clearPayment,
//     clearVerified,
//     pay,
//     verify,
//   })(Cable)
// );












import React, { useState, useEffect } from "react";
import { PaymentIntent } from "../../../_action/Payment";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";
import { verifySmartcardNumber } from "../../../_action/verifyNumber";
import { verify } from "../../../_action/verify";
import { showLoader, hideLoader } from "../../../_action/loading";
import { pay } from "../../../_action/Payment/paymentButtons";
import { finalPayment } from "../../../_action/Payment/finalPayment";
import Alert from "@material-ui/lab/Alert";
import { clearErrors } from "../../../_action/errorAction";
import "../../../css/input.css";
import { useHistory } from "react-router-dom";
import { FLUTTERWAVE_KEY } from "../PaymentProcess/hooks";

function AbujaPrepaid(props) {
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
        "Email Address": otherValues["Email Address"],
        "Customer Name": `${verifiedUser.result.account.accountName}`,
        "customer Number": `${verifiedUser.result.account.accountNumber}`,
        "Meter Number": `${verifiedUser.result.account.accountNumber}`,
        "Meter Type": props.meterType === "PREPAID" ? "ABJ_PREPAID" : "",
      },
      references: [
        "Email Address",
        "customer Number",
        "Customer Name",
        "Meter Number",
        "Meter Type",
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
  })(AbujaPrepaid)
);
