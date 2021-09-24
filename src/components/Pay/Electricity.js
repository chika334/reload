// import React, { useState, useEffect } from "react";
// import { PaymentIntent } from "../../_action/Payment";
// import { withRouter, Link } from "react-router-dom";
// import { connect, useSelector, useDispatch } from "react-redux";
// import { Button, TextField, MenuItem } from "@material-ui/core";
// import { showLoader, hideLoader } from "../../_action/loading";
// // import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
// import { verifySmartcardNumber } from "../../_action/verifyNumber";
// import { verify } from "../../_action/verify";
// import { pay } from "../../_action/Payment/paymentButtons";
// import { finalPayment } from "../../_action/Payment/finalPayment";
// import { clearErrors } from "../../_action/errorAction";
// import { USSD_KEY, FLUTTERWAVE_KEY } from "./PaymentProcess/hooks";
// import Alert from "@material-ui/lab/Alert";
// import "../../css/input.css";
// import { useHistory } from "react-router-dom";
// import Slide from "@material-ui/core/Slide";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import InputBase from "@material-ui/core/InputBase";
// import { withStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// // import NativeSelect from "@material-ui/core/NativeSelect";

// const BootstrapInput = withStyles((theme) => ({
//   root: {
//     "label + &": {
//       marginTop: theme.spacing(3),
//     },
//   },
//   input: {
//     borderRadius: 4,
//     position: "relative",
//     backgroundColor: theme.palette.background.paper,
//     border: "1px solid #ced4da",
//     fontSize: 16,
//     padding: "10px 26px 10px 12px",
//     transition: theme.transitions.create(["border-color", "box-shadow"]),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       "-apple-system",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(","),
//     "&:focus": {
//       borderRadius: 4,
//       borderColor: "#80bdff",
//       boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
//     },
//   },
// }))(InputBase);

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// function Electricity(props) {
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   let history = useHistory();
//   const [email, setEmail] = useState("");
//   const user = useSelector((state) =>
//     state.authUser.user === null ? "" : state.authUser.user
//   );
//   const [disabledCard, setDisabledCard] = useState(false);
//   const [disabledUssd, setDisabledUssd] = useState(false);
//   const [buttonValue, setButtonValue] = useState(null);
//   const error = useSelector((state) => state.error);
//   const [errors, setErrors] = useState("");
//   const [failure, setFailure] = useState("");
//   const [otherValues, setOtherValues] = useState("");
//   const [amount, setAmount] = useState("");
//   const [smartCard, setSmartCard] = useState("");
//   const [open, setOpen] = React.useState(false);
//   const [selectDetails, setSelectDetails] = useState(null);
//   const verifiedUser = useSelector((state) => state.verify);
//   const paymentButton = useSelector((state) => state.paymentButton);
//   const productDetails = useSelector((state) => state.someData.detail);
//   const verifyUserdetails = useSelector((state) => state.verifyUserdetails);
//   const paymentIntent = useSelector((state) => state.paymentIntent);
//   const [meterType, setMeterType] = useState("");
//   const pays = useSelector((state) =>
//     state.paymentDone.payment === true ? state.paymentDone.detail : ""
//   );
//   const [verifiedAccount, setVerifiedAccount] = useState(null);
//   const [verifiedProducts, setVerifiedProducts] = useState(null);
//   // const [age, setAge] = React.useState("");

//   const handleSelectMeterType = (event) => {
//     setMeterType(event.target.value);
//   };

//   console.log(otherValues);

//   const handleSmartCard = (e) => {
//     setSmartCard(e.target.value);
//   };

//   useEffect(() => {
//     if (error.id === "VERIFY_FAILED") {
//       setLoading(false);
//       setErrors(error.message.message);
//       setTimeout(() => {
//         props.clearErrors();
//         setErrors("");
//       }, 5000);
//     } else if (error.id === "FINAL_PAYMENT_ERROR") {
//       setLoading(false);
//       setFailure(error.message.data.message);
//       setTimeout(() => {
//         props.clearErrors();
//         setErrors("");
//       }, 6000);
//     }
//   }, [error.error === true]);

//   console.log(buttonValue);

//   const verifyMeterNumber = async () => {
//     if (productDetails.billerCode === "KANO_PREPAID") {
//       const details = {
//         product: productDetails.productId,
//         billerCode: productDetails.billerCode,
//         accountNumber: smartCard,
//         extras: {
//           customerAccountType: meterType === "PREPAID" ? "KANO_PREPAID" : "",
//           field1: null,
//           field2: meterType === "PREPAID" ? "KANO_PREPAID" : "",
//           field3: null,
//         },
//       };

//       props.verifySmartcardNumber(details);
//     }
//     if (productDetails.billerCode === "JOS_PREPAID") {
//       const details = {
//         product: productDetails.productId,
//         billerCode: productDetails.billerCode,
//         accountNumber: smartCard,
//         extras: {
//           customerAccountType: meterType === "PREPAID" ? "Jos_Disco" : "",
//           field1: "1111111111",
//           field2: "v.law149@gmail.com",
//           field3: "2000",
//         },
//       };

//       props.verifySmartcardNumber(details);
//     } else if (productDetails.billerCode === "KADUNA_PREPAID") {
//       const details = {
//         product: productDetails.productId,
//         billerCode: productDetails.billerCode,
//         accountNumber: smartCard,
//         extras: {
//           customerAccountType:
//             meterType === "PREPAID" ? "Kaduna_Electricity_Disco" : "",
//           field1: "1111111111",
//           field2: "v.law149@gmail.com",
//           field3: "2000",
//         },
//       };

//       props.verifySmartcardNumber(details);
//     } else {
//       const details = {
//         product: productDetails.productId,
//         accountNumber: smartCard,
//         extras: {
//           field1: null,
//           billerCode: productDetails.billerCode,
//           field2: meterType,
//           field3: "",
//           field4: "",
//           customerAccountType: null,
//         },
//       };

//       props.verifySmartcardNumber(details);
//     }
//   };

//   const SmartNumber = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     let result = verifyMeterNumber();
//   };

//   const handleSubmit = (value) => {
//     // setLoading(true);
//     setButtonValue(value);
//     if (value === "FLUTTERWAVE") {
//       setDisabledCard(true);
//     } else if (value === "USSD") {
//       setDisabledUssd(true);
//     }

//     // console.log("daniel", value);

//     // if (selectDetails !== null) {
//     // const value = e.target.value;
//     if (productDetails.billerCode === "ABJ_PREPAID") {
//       const newValuesObj = {
//         amount: `${amount}`,
//         channelRef: "web",
//         description: "Electricity Prepaid",
//         // paymentMethod: "billpayflutter",
//         paymentMethod:
//           value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
//         productId: `${productDetails.productId}`,
//         referenceValues: {
//           "Email Address": otherValues["Email Address"],
//           // "Email Address": user.user.email,
//           "Customer Name": `${verifiedUser.result.account.accountName}`,
//           "customer Number": `${verifiedUser.result.account.accountNumber}`,
//           "Meter Number": `${verifiedUser.result.account.accountNumber}`,
//           "Meter Type": meterType === "PREPAID" ? "ABJ_PREPAID" : "",
//         },
//         references: [
//           "Email Address",
//           "customer Number",
//           "Customer Name",
//           "Meter Number",
//           "Meter Type",
//         ],
//       };

//       props.PaymentIntent(newValuesObj);
//     } else if (productDetails.billerCode === "PHCNEKO") {
//       const newValuesObj = {
//         amount: `${amount}`,
//         channelRef: "web",
//         description: "Electricity Prepaid",
//         // paymentMethod: "billpayflutter",
//         paymentMethod:
//           value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
//         productId: `${productDetails.productId}`,
//         referenceValues: {
//           accountNumber: `${verifiedUser.result.account.accountNumber}`,
//           "Email Address": `${email}`,
//           "Account Name": `${verifiedUser.result.account.accountName}`,
//         },
//         references: ["Email Address", "Account Name", "ProductCode"],
//       };

//       props.PaymentIntent(newValuesObj);
//     } else if (productDetails.billerCode === "iedc") {
//       console.log("payment intent");
//       const newValuesObj = {
//         amount: `${amount}`,
//         channelRef: "web",
//         description: "Electricity Prepaid",
//         // paymentMethod: "billpayflutter",
//         paymentMethod:
//           value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
//         productId: `${productDetails.productId}`,
//         referenceValues: {
//           "Email Address": otherValues["Email Address"],
//           "Account Name": `${amount}`,
//           "METER NUMBER": `${verifiedUser.result.account.accountNumber}`,
//           "Phone Number": otherValues["Phone Number"],
//           "Customer Details": `${verifiedUser.result.account.accountName}`,
//         },
//         references: [
//           "Email Address",
//           "Account Name",
//           "METER NUMBER",
//           "Phone Number",
//           "Customer Details",
//         ],
//       };

//       console.log(newValuesObj);

//       props.PaymentIntent(newValuesObj);
//     } else if (productDetails.billerCode === "PHEDDIR2") {
//       const newValuesObj = {
//         amount: `${amount}`,
//         channelRef: "web",
//         description: "Electricity Prepaid",
//         // paymentMethod: "billpayflutter",
//         paymentMethod:
//           value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
//         productId: `${productDetails.productId}`,
//         referenceValues: {
//           "Email Address": otherValues["Email Address"],
//           // "Email Address": user.user.email,
//           "Meter or Account Number": `${verifiedUser.result.account.accountNumber}`,
//           "Ref ID": `${verifiedUser.result.account.accountName}`,
//           "Meter Type": meterType,
//           "Phone Number": otherValues["Phone Number"],
//           "Customer Details": JSON.parse(verifiedUser.result.account.extras)
//             .extra,
//         },
//         references: [
//           "Email Address",
//           "Meter or Account Number",
//           "Ref ID",
//           "Meter Type",
//           "Phone Number",
//           "Customer Details",
//         ],
//       };
//       props.PaymentIntent(newValuesObj);
//     } else if (productDetails.billerCode === "JOS_PREPAID") {
//       const newValuesObj = {
//         amount: `${amount}`,
//         channelRef: "web",
//         description: "Electricity Prepaid",
//         // paymentMethod: "billpayflutter",
//         paymentMethod:
//           value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
//         productId: `${productDetails.productId}`,
//         referenceValues: {
//           "Email Address": otherValues["Email Address"],
//           "Meter Number": `${verifiedUser.result.account.accountNumber}`,
//           "Invoice Number": `${verifiedUser.result.extra}`,
//           "Product Type": meterType === "PREPAID" ? "Jos_Disco" : "",
//           "Phone Number": otherValues["Phone Number"],
//           "Customer Name": `${verifiedUser.result.account.accountName}`,
//         },
//         references: [
//           "Email Address",
//           "Invoice Number",
//           "Meter Number",
//           "Product Type",
//           "Phone Number",
//           "Customer Name",
//         ],
//       };

//       // console.log(newValuesObj);
//       props.PaymentIntent(newValuesObj);
//     } else if (productDetails.billerCode === "KADUNA_PREPAID") {
//       const newValuesObj = {
//         amount: `${amount}`,
//         channelRef: "web",
//         description: "Electricity Prepaid",
//         // paymentMethod: "billpayflutter",
//         paymentMethod:
//           value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
//         productId: `${productDetails.productId}`,
//         referenceValues: {
//           "Email Address": otherValues["Email Address"],
//           "Meter Number": `${verifiedUser.result.account.accountNumber}`,
//           "Invoice Number": `${verifiedUser.result.extra}`,
//           "Product Type":
//             meterType === "PREPAID" ? "Kaduna_Electricity_Disco" : "",
//           "Phone Number": otherValues["Phone Number"],
//           "Customer Name": `${verifiedUser.result.account.accountName}`,
//         },
//         references: [
//           "Email Address",
//           "Invoice Number",
//           "Meter Number",
//           "Product Type",
//           "Phone Number",
//           "Customer Name",
//         ],
//       };

//       console.log(newValuesObj);
//       props.PaymentIntent(newValuesObj);
//     } else if (productDetails.billerCode === "PHCNKAN") {
//       const newValuesObj = {
//         amount: `${amount}`,
//         channelRef: "web",
//         description: "Electricity Prepaid",
//         // paymentMethod: "billpayflutter",
//         paymentMethod:
//           value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
//         productId: `${productDetails.productId}`,
//         referenceValues: {
//           "Email Address": otherValues["Email Address"],
//           "Meter Number": `${verifiedUser.result.account.accountNumber}`,
//           "Invoice Number": `${verifiedUser.result.extra}`,
//           "Product Type": "PREPAID",
//           "Phone Number": otherValues["Phone Number"],
//           "Customer Name": `${verifiedUser.result.account.accountName}`,
//         },
//         references: [
//           "Email Address",
//           "Invoice Number",
//           "Meter Number",
//           "Product Type",
//           "Phone Number",
//           "Customer Name",
//         ],
//       };

//       console.log(newValuesObj);
//       props.PaymentIntent(newValuesObj);
//     }
//     // } else {
//     //   // setLoading(false);
//     //   // // const path = `${props.location.pathname}${props.location.search}`;
//     //   // // props.loginRediectSuccess(path, props.location.state.data);
//     //   // // props.history.push("/registration");
//     //   // setOpen(true);
//     // }
//   };

//   useEffect(() => {
//     if (verifiedUser.verifySuccess === true) {
//       setLoading(false);
//       setVerifiedProducts(verifiedUser.result.product);
//       setVerifiedAccount(verifiedUser.result.account);
//       props.verify("Electricity", true);
//     }
//   }, [verifiedUser.verifySuccess]);

//   const handleFieldChange = (e, name) => {
//     const newValues = { ...otherValues };
//     newValues[name] = e.target.value;
//     setOtherValues(newValues);
//   };

//   const handleAmount = (e) => {
//     setAmount(e.target.value);
//   };

//   const handleSelect = (name, value) => {
//     setSelectDetails(value);
//   };

//   const item = JSON.parse(productDetails.detail.productvalue);
//   const fieldsArray = [];
//   for (const data in item) {
//     fieldsArray.push(item[data]);
//   }

//   const verifyNumber = JSON.parse(productDetails.detail.productvalue).field0;

//   const Options =
//     JSON.parse(productDetails.detail.productvalue).field6 === undefined
//       ? ""
//       : JSON.parse(productDetails.detail.productvalue).field6.options;

//   const fieldsOption = [];
//   for (const key in Options) {
//     if (Options.hasOwnProperty(key)) {
//       var value = Options[key];
//       fieldsOption.push(value);
//     }
//   }

//   useEffect(() => {
//     if (paymentIntent.success === true) {
//       // pro
//       setLoading(false);
//       // let amount = amount;
//       const detail = {
//         amount: amount,
//         email: otherValues["Email Address"],
//         product: productDetails.productname,
//         accountNumber:
//           verifiedUser.result === null
//             ? ""
//             : verifiedUser.result.account.accountNumber,
//         buttonClick: buttonValue,
//         transRef: paymentIntent.detail.transRef,
//         customerName:
//           verifiedUser.result === null
//             ? ""
//             : verifiedUser.result.account.accountName,
//       };

//       console.log(detail);

//       dispatch(pay(detail));
//       props.dataPay(true, "Cable");
//       // props.onpaymentProcess(buttonValue);
//     }
//   }, [paymentIntent.success]);

//   useEffect(() => {
//     if (verifiedUser.verifySuccess === true) {
//       setLoading(false);
//       props.verify("Electricity", true);
//     }
//   }, [verifiedUser.verifySuccess]);

//   // console.log(selectDetails);

//   return (
//     <div className="property-details-area">
//       {loading ? (
//         <div className="preloader" id="preloader">
//           <div className="preloader-inner">
//             <div className="spinner">
//               <div className="dot1"></div>
//               <div className="dot2"></div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <div className="d-flex align-item-center justify-content-center">
//             {errors && <Alert severity="error">{errors}</Alert>}
//           </div>
//           <div>
//             {verifyUserdetails.onclick === false &&
//             verifyUserdetails.name === "" ? (
//               verifyNumber.text === "Meter Number" ||
//               "METER NUMBER" ||
//               "Meter or Account Number" ? (
//                 <>
//                   <div className="d-flex align-item-center justify-content-center">
//                     <TextField
//                       required
//                       // style={{ width: "50%" }}
//                       className="inputSize"
//                       label={verifyNumber.text}
//                       name="smartCard"
//                       onChange={handleSmartCard}
//                       placeholder={`Enter ${verifyNumber.text}`}
//                       type="number"
//                       variant="outlined"
//                       value={smartCard}
//                     />
//                   </div>
//                   <div className="d-flex align-item-center justify-content-center pt-3">
//                     <FormControl className="inputSize">
//                       <InputLabel id="demo-customized-select-label">
//                         Meter Type
//                       </InputLabel>
//                       <Select
//                         labelId="demo-customized-select-label"
//                         id="demo-customized-select"
//                         value={meterType}
//                         onChange={handleSelectMeterType}
//                         placeholder="Select Meter Type"
//                         input={<BootstrapInput />}
//                       >
//                         <MenuItem value="Select Meter Type">
//                           <em>Select Meter Type</em>
//                         </MenuItem>
//                         <MenuItem value="POSTPAID">PostPaid</MenuItem>
//                         <MenuItem value="PREPAID">PrePaid</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </div>
//                   <div className="d-flex align-item-center justify-content-center">
//                     <Button
//                       onClick={SmartNumber}
//                       type="button"
//                       style={{
//                         backgroundColor: "#fda94f",
//                         color: "#000",
//                         fontSize: "12px",
//                         padding: "11px",
//                       }}
//                     >
//                       Verify
//                     </Button>
//                   </div>
//                 </>
//               ) : (
//                 ""
//               )
//             ) : (
//               ""
//             )}
//           </div>
//         </div>
//       )}
//       <div>
//         <div className="d-flex align-item-center justify-content-center">
//           {failure && <Alert severity="error">{failure}</Alert>}
//         </div>
//         {verifyUserdetails.onclick === true &&
//         verifyUserdetails.name === "Electricity"
//           ? fieldsArray.slice(1).map((allData, i) =>
//               allData.select === false &&
//               allData.text !== "Amount" &&
//               allData.text !== "Meter Type" ? (
//                 // allData.text === "Email Address" ? (
//                 //   ""
//                 // ) : (
//                 <div key={i}>
//                   <div className="d-flex align-item-center justify-content-center pt-3">
//                     <TextField
//                       required
//                       // style={{ width: "50%" }}
//                       className="inputSize"
//                       label={allData.text}
//                       name={allData.text}
//                       onChange={(e) => handleFieldChange(e, allData.text)}
//                       placeholder={`Enter ${allData.text}`}
//                       type={
//                         allData.text === "Email Address"
//                           ? "email"
//                           : allData.text === "Customer Name"
//                           ? "text"
//                           : allData.text === "Customer Number"
//                           ? "number"
//                           : allData.text === "Account description"
//                           ? "number"
//                           : allData.text === "Account Name"
//                           ? "text"
//                           : allData.text === "Phone number"
//                           ? "number"
//                           : allData.text === "Invoice Number"
//                           ? "number"
//                           : ""
//                       }
//                       variant="outlined"
//                       value={
//                         allData.text === "Customer Name"
//                           ? verifiedUser.result.account.accountName
//                           : allData.text === "Customer Number"
//                           ? verifiedUser.result.account.accountNumber
//                           : allData.text === "Email Address"
//                           ? otherValues["Email Address"]
//                           : allData.text === "Account description"
//                           ? verifiedUser.result.account.accountNumber
//                           : allData.text === "Account Name"
//                           ? verifiedUser.result.account.accountName
//                           : allData.text === "Customer Details"
//                           ? verifiedUser.result.account.accountNumber
//                           : allData.text === "Ref ID"
//                           ? verifiedUser.result.account.accountName
//                           : allData.text === "Phone Number"
//                           ? otherValues["Phone Number"]
//                           : allData.text === "Invoice Number"
//                           ? verifiedUser.result.account.accountNumber
//                           : ""
//                       }
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 // )
//                 ""
//               )
//             )
//           : ""}
//         {verifyUserdetails.onclick === true &&
//         verifyUserdetails.name === "Electricity"
//           ? fieldsArray.slice(1).map((allData, i) =>
//               allData.select === false && allData.text === "Amount" ? (
//                 <div key={i}>
//                   <div className="d-flex align-item-center justify-content-center pt-3">
//                     <TextField
//                       required
//                       // style={{ width: "50%" }}
//                       className="inputSize"
//                       label={allData.text}
//                       name={allData.text}
//                       onChange={handleAmount}
//                       placeholder={`Enter ${allData.text}`}
//                       type="number"
//                       variant="outlined"
//                       value={amount}
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 ""
//               )
//             )
//           : ""}

//         <div>
//           {verifyUserdetails.onclick === true &&
//           verifyUserdetails.name === "Electricity" ? (
//             <div className="ButtonSide pt-3">
//               <div>
//                 {props.disabledCard === true ? (
//                   <button
//                     onClick={(e) => {
//                       e.preventDefault();
//                       window.location.href = `/${process.env.REACT_APP_RELOADNG}/product-details`;
//                       // state: productDetails.productname,
//                       // });
//                     }}
//                   >
//                     Go Back
//                   </button>
//                 ) : (
//                   <button
//                     onClick={(e) => {
//                       e.preventDefault();
//                       // console.log(payment);
//                       handleSubmit(FLUTTERWAVE_KEY);
//                     }}
//                     value={FLUTTERWAVE_KEY}
//                     type="submit"
//                     style={{
//                       backgroundColor: "#fda94f",
//                       cursor:
//                         props.disabledUssd === true ? "not-allowed" : "pointer",
//                       color: "#000",
//                       fontSize: "12px",
//                       padding: "11px",
//                     }}
//                     disabled={props.disabledUssd}
//                   >
//                     Proceed to Card
//                   </button>
//                 )}
//               </div>
//               <div>
//                 {props.disabledUssd === true ? (
//                   <button
//                     onClick={(e) => {
//                       e.preventDefault();
//                       window.location.href = `/${process.env.REACT_APP_RELOADNG}/product-details`;
//                       // state: productDetails.productname,
//                       // });
//                     }}
//                   >
//                     Go Back
//                   </button>
//                 ) : (
//                   <div>
//                     <Button
//                       onClick={(e) => {
//                         // e.preventDefault();
//                         handleSubmit(USSD_KEY);
//                       }}
//                       // className="btn"
//                       value={USSD_KEY}
//                       // href="#open-modal"
//                       style={{
//                         backgroundColor: "#fda94f",
//                         cursor:
//                           props.disabledCard === true
//                             ? "not-allowed"
//                             : "pointer",
//                         color: "#000",
//                         fontSize: "12px",
//                         padding: "11px",
//                       }}
//                       disabled={props.disabledCard}
//                     >
//                       Pay with Ussd
//                     </Button>{" "}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : (
//             ""
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default withRouter(
//   connect(null, {
//     verifySmartcardNumber,
//     verify,
//     PaymentIntent,
//     pay,
//     showLoader,
//     clearErrors,
//     hideLoader,
//     finalPayment,
//   })(Electricity)
// );

import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { withRouter, Link, useHistory } from "react-router-dom";
import { verifySmartcardNumber } from "../../_action/verifyNumber";
import { verify } from "../../_action/verify";
import { pay } from "../../_action/Payment/paymentButtons";
import { finalPayment } from "../../_action/Payment/finalPayment";
import { clearErrors } from "../../_action/errorAction";
import { PaymentIntent } from "../../_action/Payment";
import { USSD_KEY, FLUTTERWAVE_KEY } from "./PaymentProcess/hooks";
import Alert from "@material-ui/lab/Alert";
import { Button, TextField, MenuItem } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import IkejaPrepaid from "./Electric/ikejaPrepaid";
import PhedprePaid from "./Electric/phedprePaid";
import PhedpostPaid from "./Electric/phedpostPaid";
import EkoPrepaid from "./Electric/EkoPrepaid";
import JosPrepaid from "./Electric/JosPrepaid";
import KadunaPrepaid from "./Electric/KadunaPrepaid";
import KanoPrepaid from "./Electric/KanoPrepaid";
import AbujaPrepaid from "./Electric/AbujaPrepaid";

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

function Electricity(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // let history = useHistory();
  // const [email, setEmail] = useState("");
  // const user = useSelector((state) =>
  //   state.authUser.user === null ? "" : state.authUser.user
  // );
  const [disabledCard, setDisabledCard] = useState(false);
  const [disabledUssd, setDisabledUssd] = useState(false);
  const [buttonValue, setButtonValue] = useState(null);
  const [valueData, setValueData] = useState(null);
  const error = useSelector((state) => state.error);
  const [errors, setErrors] = useState("");
  // const [failure, setFailure] = useState("");
  // const [otherValues, setOtherValues] = useState("");
  // const [amount, setAmount] = useState("");
  const [smartCard, setSmartCard] = useState("");
  // const [open, setOpen] = React.useState(false);
  // const [selectDetails, setSelectDetails] = useState(null);
  const verifiedUser = useSelector((state) => state.verify);
  // const paymentButton = useSelector((state) => state.paymentButton);
  const productDetails = useSelector((state) => state.someData.detail);
  const verifyUserdetails = useSelector((state) => state.verifyUserdetails);
  const paymentIntent = useSelector((state) => state.paymentIntent);
  const [meterType, setMeterType] = useState("");
  const [failure, setFailure] = useState("");
 
  const handleSelectMeterType = (event) => {
    setMeterType(event.target.value);
  };

  const handleSmartCard = (e) => {
    setSmartCard(e.target.value);
  };

  const handleSubmit = (value, data) => {
    console.log(data);
    setButtonValue(value);
    setValueData(data);
    if (value === "FLUTTERWAVE") {
      setDisabledCard(true);
    } else if (value === "USSD") {
      setDisabledUssd(true);
    }
    props.PaymentIntent(data);
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

      dispatch(verifySmartcardNumber(details));
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

      dispatch(verifySmartcardNumber(details));
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

      dispatch(verifySmartcardNumber(details));
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

      dispatch(verifySmartcardNumber(details));
    }
  };

  const SmartNumber = async (e) => {
    e.preventDefault();
    setLoading(true);
    let result = verifyMeterNumber();
  };

  const verifyNumber = JSON.parse(productDetails.detail.productvalue).field0;

  useEffect(() => {
    if (paymentIntent.success === true) {
      // pro
      setLoading(false);
      const amounts = valueData === null ? "" : valueData.amount;
      const iedc =
        valueData === null ? "" : valueData.referenceValues["Email Address"];
      const detail = {
        amount: amounts,
        email: `${
          productDetails.billerCode === "iedc"
            ? iedc
            : productDetails.billerCode === "PHEDDIR2"
            ? iedc
            : productDetails.billerCode === "PHCNEKO"
            ? iedc
            : productDetails.billerCode === "JOS_PREPAID"
            ? iedc
            : productDetails.billerCode === "KADUNA_PREPAID"
            ? iedc
            : productDetails.billerCode === "PHCNKAN"
            ? iedc
            : productDetails.billerCode === "ABJ_PREPAID"
            ? iedc
            : ""
        }`,
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

      console.log(detail, valueData);

      dispatch(pay(detail));
      props.dataPay(true, "Cable");
    }
  }, [paymentIntent.success]);

  useEffect(() => {
    if (verifiedUser.verifySuccess === true) {
      setLoading(false);
      dispatch(verify("Electricity", true));
    }
  }, [verifiedUser.verifySuccess]);

  const getData = (data) => {
    setIntentData(data);
  };

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
              "Account Number" ||
              "Meter or Account Number" ? (
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
                  <div className="d-flex align-item-center justify-content-center pt-3">
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
                        <MenuItem value="PREPAID">PREPAID</MenuItem>
                        {productDetails.billerCode === "PHEDDIR2" ? (
                          <MenuItem value="POSTPAID">POSTPAID</MenuItem>
                        ) : (
                          ""
                        )}
                      </Select>
                    </FormControl>
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
            {verifiedUser.verifySuccess === true && meterType === "PREPAID" && (
              <>
                {productDetails.billerCode === "iedc" ? (
                  <IkejaPrepaid
                    getData={getData}
                    handleSubmit={handleSubmit}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                ) : (
                  ""
                )}
                {productDetails.billerCode === "PHEDDIR2" ? (
                  <PhedprePaid
                    meterType={meterType}
                    getData={getData}
                    handleSubmit={handleSubmit}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                ) : (
                  ""
                )}
                {productDetails.billerCode === "PHCNEKO" ? (
                  <EkoPrepaid
                    meterType={meterType}
                    getData={getData}
                    handleSubmit={handleSubmit}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                ) : (
                  ""
                )}
                {productDetails.billerCode === "JOS_PREPAID" ? (
                  <JosPrepaid
                    meterType={meterType}
                    getData={getData}
                    handleSubmit={handleSubmit}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                ) : (
                  ""
                )}
                {productDetails.billerCode === "KADUNA_PREPAID" ? (
                  <KadunaPrepaid
                    meterType={meterType}
                    getData={getData}
                    handleSubmit={handleSubmit}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                ) : (
                  ""
                )}
                {productDetails.billerCode === "PHCNKAN" ? (
                  <KanoPrepaid
                    meterType={meterType}
                    getData={getData}
                    handleSubmit={handleSubmit}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                ) : (
                  ""
                )}
                {productDetails.billerCode === "ABJ_PREPAID" ? (
                  <AbujaPrepaid
                    meterType={meterType}
                    getData={getData}
                    handleSubmit={handleSubmit}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                ) : (
                  ""
                )}
              </>
            )}
            {verifiedUser.verifySuccess === true && meterType === "POSTPAID" ? (
              <>
                {productDetails.billerCode === "PHEDDIR2" ? (
                  <PhedprePaid
                    meterType={meterType}
                    getData={getData}
                    handleSubmit={handleSubmit}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
            {/* {verifiedUser.verifySuccess === true && meterType === "POSTPAID" && (
              <>
                {productDetails.billerCode === "iedc" ? (
                  <IkejaPostpaid
                    meterType={meterType}
                    getData={getData}
                    handleSubmit={handleSubmit}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                ) : (
                  ""
                )}
                {productDetails.billerCode === "PHEDDIR2"
                  ? 
                  <PhedpostPaid
                      meterType={meterType}
                      getData={getData}
                      handleSubmit={handleSubmit}
                      disabledCard={props.disabledCard}
                      disabledUssd={props.disabledUssd}
                    />
                  : ""}
              </>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(
  connect(null, {
    verifySmartcardNumber,
    verify,
    PaymentIntent,
    pay,
    // showLoader,
    clearErrors,
    // hideLoader,
    finalPayment,
  })(Electricity)
);
