// import React, { useState, useEffect } from "react";
// import { useSelector, connect } from "react-redux";
// import { MenuItem, TextField, Button, ButtonBase } from "@material-ui/core";
// import { verify } from "../../_action/verify";
// import {
//   verifySmartcardNumber,
//   clearVerified,
// } from "../../_action/verifyNumber";
// import { withRouter } from "react-router-dom";
// import { USSD_KEY, FLUTTERWAVE_KEY } from "./PaymentProcess/hooks";

// function Smile(props) {
//   const verifiedUser = useSelector((state) => state.verify);
//   const productDetails = useSelector((state) => state.someData.detail);
//   const verifyUserdetails = useSelector((state) => state.verifyUserdetails);
//   const [verifiedAccount, setVerifiedAccount] = useState(null);
//   const [verifiedProducts, setVerifiedProducts] = useState(null);
//   const [smileNumber, setSmileNumber] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [disabled, setDisabled] = useState(false);
//   const [smartCard, setSmartCard] = useState({
//     "E-mail": "",
//     "Phone Number": "",
//   });
//   const [selectDetails, setSelectDetails] = useState({
//     id: "",
//     amount: "",
//     name: "",
//   });
//   const [detailValues, setDetailValues] = useState({
//     values: {},
//     mainValues: {
//       description: "",
//       amount: "",
//       price: 0,
//     },
//   });

//   const { values, mainValues } = detailValues;

//   const handleSmartCard = (e) => {
//     setSmileNumber(e.target.value);
//   };

//   // console.log(smartCard);

//   const handleSelect = (field, value) => {
//     // console.log(field, value);
//     setSelectDetails({
//       ...selectDetails,
//       id: value.ItemType,
//       amount: value.Amount,
//       field: value,
//     });
//     // setSelectDetails({
//     //   ...selectDetails,
//     //   id: value.ItemType,
//     //   amount: value.Amount,
//     //   name: value.ItemName,
//     // });
//   };

//   const handleOthers = (e, name) => {
//     const newValues = { ...smartCard };
//     newValues[name] = e.target.value;

//     // console.log(e.target.value);
//     setSmartCard(newValues);
//   };

//   console.log(smartCard);

//   const verifyMeterNumber = async () => {
//     const details = {
//       product: productDetails.productId,
//       accountNumber: smileNumber,
//       extras: {
//         billerCode: productDetails.billerCode,
//         field1: null,
//         field2: null,
//       },
//     };

//     console.log(details);

//     props.verifySmartcardNumber(details);
//   };

//   const handleSubmit = (value) => {
//     const newValuesObj = {
//       amount: `${selectDetails.amount}`,
//       channelRef: "web",
//       description: "Data",
//       // paymentMethod: "billpayflutter",
//       paymentMethod:
//         value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
//       productId: `${productDetails.productId}`,
//       referenceValues: {
//         "E-mail": `${smartCard["E-mail"]}`,
//         // Product: `${selectDetails.id}`,
//         "Phone Number": `${smartCard["Phone Number"]}`,
//         "Product Type": selectDetails.id,
//       },
//       references: ["E-mail", "Phone Number", "Product Type"],
//     };

//     console.log(newValuesObj);

//     props.handleSubmit(value, newValuesObj);
//   };

//   const SmartNumber = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     let result = verifyMeterNumber();
//   };

//   useEffect(() => {
//     if (verifiedUser.verifySuccess === true) {
//       setLoading(false);
//       setVerifiedProducts(verifiedUser.result.product);
//       setVerifiedAccount(verifiedUser.result.account);
//       props.verify("NTEL", true);
//     }
//   }, [verifiedUser.verifySuccess]);

//   const item = JSON.parse(productDetails.detail.productvalue);
//   const fieldsArray = [];
//   for (const data in item) {
//     fieldsArray.push(item[data]);
//   }

//   console.log(selectDetails);

//   const fieldsOptions = [];

//   if (item.field3) {
//     if (item.field3.select === true) {
//       const data = item.field3.options;
//       for (const key in data) {
//         if (data.hasOwnProperty(key)) {
//           var value = data[key];
//           fieldsOptions.push(value);
//         }
//       }
//     }
//   }
//   if (item.field2) {
//     if (item.field2.select === true) {
//       const data = item.field2.options;
//       for (const key in data) {
//         if (data.hasOwnProperty(key)) {
//           var value = data[key];
//           fieldsOptions.push(value);
//         }
//       }
//     }
//   }

//   // const verifyNumber = JSON.parse(productDetails.detail.productvalue).field4;

//   // const deal = Object.values(fieldsArray);
//   const onTrigger = (event) => {
//     props.getData();
//     event.preventDefault();
//   };

//   return (
//     <div>
//       <div>
//         {loading ? (
//           <div className="preloader" id="preloader">
//             <div className="preloader-inner">
//               <div className="spinner">
//                 <div className="dot1"></div>
//                 <div className="dot2"></div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <>
//             {fieldsArray.map((allFields, i) =>
//               allFields.text !== "Smile Account Number" &&
//               allFields.select !== true ? (
//                 allFields.text === "Customer Name" ? (
//                   <div className="d-flex align-item-center justify-content-center">
//                     <div className="inputSize text-right allnew">
//                       <p>Account Name</p>
//                       <p
//                         style={{
//                           display: "flex",
//                           right: 0,
//                           marginLeft: "20px",
//                         }}
//                       >
//                         {verifiedAccount === null
//                           ? ""
//                           : verifiedAccount.accountName}
//                       </p>
//                     </div>
//                   </div>
//                 ) : (
//                   <div
//                     key={i}
//                     className="d-flex align-item-center justify-content-center pt-3"
//                   >
//                     {console.log(allFields)}
//                     <TextField
//                       // style={{ width: "50%" }}
//                       className="inputSize"
//                       required
//                       label={allFields.text}
//                       name={allFields.text}
//                       onChange={(e) => handleOthers(e, allFields.text)}
//                       placeholder={`Enter ${allFields.text}`}
//                       type={
//                         allFields.text === "Email" ||
//                         allFields.text === "E-mail"
//                           ? "email"
//                           : "number"
//                       }
//                       disabled={allFields.text === "Amount" && disabled}
//                       value={
//                         selectDetails.amount === undefined
//                           ? ""
//                           : allFields.text === "Amount"
//                           ? selectDetails.amount
//                           : allFields.text === "Phone Number"
//                           ? smartCard["Phone Number"]
//                           : allFields.text === "E-mail"
//                           ? smartCard["E-mail"]
//                           : allFields.text === "Customer Name"
//                           ? smartCard["E-mail"]
//                           : ""
//                       }
//                       variant="outlined"
//                       InputProps={{
//                         startAdornment:
//                           allFields.text === "Amount" ? (
//                             <InputAdornment position="start">₦</InputAdornment>
//                           ) : (
//                             ""
//                           ),
//                       }}
//                     />
//                   </div>
//                 )
//               ) : (
//                 ""
//               )
//             )}
//             {fieldsArray.map((allFields, i) =>
//               allFields.text !== "Select Product" &&
//               allFields.text !== "Invoice Id" &&
//               allFields.select === true ? (
//                 <>
//                   <div
//                     key={i}
//                     className="d-flex align-item-center justify-content-center pt-3"
//                   >
//                     <TextField
//                       className="inputSize"
//                       required
//                       label={allFields.text}
//                       name={allFields.text}
//                       placeholder={`Enter ${allFields.text}`}
//                       select
//                       type="text"
//                       // value={values[allFields.text]}
//                       variant="outlined"
//                       InputLabelProps={{
//                         shrink: true,
//                       }}
//                     >
//                       <MenuItem>Select Data Type</MenuItem>
//                       {fieldsOptions.map((option, index) => {
//                         const detail = JSON.parse(option);
//                         return (
//                           <MenuItem
//                             key={index}
//                             value={detail.ItemName}
//                             onClick={(event) =>
//                               handleSelect(allFields.text, detail)
//                             }
//                           >
//                             {detail.ItemName}
//                           </MenuItem>
//                         );
//                       })}
//                     </TextField>
//                   </div>
//                   <div className="d-flex align-item-center justify-content-center pt-3">
//                     <TextField
//                       required
//                       className="inputSize"
//                       label="Amount"
//                       name="smileNumber"
//                       onChange={handleSmartCard}
//                       placeholder={`Enter Amount`}
//                       type="number"
//                       variant="outlined"
//                       value={selectDetails["amount"]}
//                     />
//                   </div>
//                 </>
//               ) : (
//                 ""
//               )
//             )}
//             {productDetails.billerCode === "NTELBundle" ? (
//               <div className="ButtonSide">
//                 <div>
//                   {props.disabledCard === true ? (
//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();
//                         window.location.href = `/${process.env.REACT_APP_RELOADNG}/product-details`;
//                         // state: productDetails.productname,
//                         // });
//                       }}
//                     >
//                       Go Back
//                     </button>
//                   ) : (
//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();
//                         // console.log(payment);
//                         handleSubmit(FLUTTERWAVE_KEY);
//                       }}
//                       type="submit"
//                       style={{
//                         backgroundColor: "#fda94f",
//                         cursor:
//                           props.disabledUssd === true
//                             ? "not-allowed"
//                             : "pointer",
//                         color: "#000",
//                         fontSize: "12px",
//                         padding: "11px",
//                       }}
//                       disabled={props.disabledUssd}
//                     >
//                       Proceed to Card
//                     </button>
//                   )}
//                 </div>
//                 <div>
//                   {props.disabledUssd === true ? (
//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();
//                         window.location.href = `/${process.env.REACT_APP_RELOADNG}/product-details`;
//                       }}
//                     >
//                       Go Back
//                     </button>
//                   ) : (
//                     <div>
//                       <button
//                         // className="btn"
//                         value={USSD_KEY}
//                         onClick={(e) => {
//                           // e.preventDefault();
//                           handleSubmit(USSD_KEY);
//                         }}
//                         style={{
//                           backgroundColor: "#fda94f",
//                           cursor:
//                             props.disabledCard === true
//                               ? "not-allowed"
//                               : "pointer",
//                           color: "#000",
//                           fontSize: "12px",
//                           padding: "11px",
//                         }}
//                         disabled={props.disabledCard}
//                       >
//                         Pay with Ussd
//                       </button>{" "}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ) : (
//               ""
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default withRouter(
//   connect(null, { verifySmartcardNumber, verify })(Smile)
// );
