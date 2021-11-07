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

//   const handleSelect = (e) => {
//     console.log(e.target.value);
//     setSelectDetails({
//       ...selectDetails,
//       amount: e.target.value,
//     });
//   };

//   const handleOthers = (e, name) => {
//     const newValues = { ...smartCard };
//     newValues[name] = e.target.value;
//     setSmartCard(newValues);
//   };

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

//     // console.log(details);

//     props.verifySmartcardNumber(details);
//   };

//   console.log(selectDetails);

//   const handleSubmit = (value) => {
//     const newValuesObj = {
//       amount: `${selectDetails.amount}`,
//       channelRef: "web",
//       description: "Data",
//       paymentMethod:
//         value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
//       productId: `${productDetails.productId}`,
//       referenceValues: {
//         accountNumber: smileNumber,
//         Email: `${smartCard["Email"]}`,
//         Product: `${selectDetails.id}`,
//       },
//       references: ["accountNumber", "Email", "Product"],
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
//       props.verify("SMILE", true);
//     }
//   }, [verifiedUser.verifySuccess]);

//   const item = JSON.parse(productDetails.detail.productvalue);
//   const fieldsArray = [];
//   for (const data in item) {
//     fieldsArray.push(item[data]);
//   }

//   const fieldsOptions = [];

//   if (item.field3.select === true) {
//     const data = item.field3.options;
//     for (const key in data) {
//       if (data.hasOwnProperty(key)) {
//         var value = data[key];
//         fieldsOptions.push(value);
//       }
//     }
//   }
//   if (item.field2.select === true) {
//     const data = item.field2.options;
//     for (const key in data) {
//       if (data.hasOwnProperty(key)) {
//         var value = data[key];
//         fieldsOptions.push(value);
//       }
//     }
//   }

//   const verifyNumber = JSON.parse(productDetails.detail.productvalue).field4;

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
//             <div>
//               {verifyUserdetails.onclick === false &&
//               verifyUserdetails.name === "" ? (
//                 verifyNumber.text === "Smile Account Number" ? (
//                   <>
//                     <div className="d-flex align-item-center justify-content-center">
//                       <TextField
//                         required
//                         className="inputSize"
//                         label={verifyNumber.text}
//                         name="smileNumber"
//                         onChange={handleSmartCard}
//                         placeholder={`Enter ${verifyNumber.text}`}
//                         type="number"
//                         variant="outlined"
//                         value={smileNumber}
//                       />
//                     </div>
//                     <div className="d-flex align-item-center justify-content-center">
//                       <Button
//                         onClick={SmartNumber}
//                         type="button"
//                         style={{
//                           backgroundColor: "#fda94f",
//                           color: "#000",
//                           fontSize: "12px",
//                           padding: "11px",
//                         }}
//                       >
//                         Verify
//                       </Button>
//                     </div>
//                   </>
//                 ) : (
//                   ""
//                 )
//               ) : (
//                 ""
//               )}
//             </div>
//             {verifyUserdetails.onclick === true &&
//             verifyUserdetails.name === "SMILE"
//               ? fieldsArray.map((allFields, i) =>
//                   allFields.text !== "Smile Account Number" &&
//                   allFields.select !== true ? (
//                     allFields.text === "Customer Name" ? (
//                       <div className="d-flex align-item-center justify-content-center">
//                         <div className="inputSize text-right allnew">
//                           <p>Account Name</p>
//                           <p
//                             style={{
//                               display: "flex",
//                               right: 0,
//                               marginLeft: "20px",
//                             }}
//                           >
//                             {verifiedAccount === null
//                               ? ""
//                               : verifiedAccount.accountName}
//                           </p>
//                         </div>
//                       </div>
//                     ) : (
//                       <div>
//                         <div className="d-flex align-item-center justify-content-center pt-3">
//                           <TextField
//                             className="inputSize"
//                             required
//                             label="Email"
//                             name="Email"
//                             onChange={(e) => handleOthers(e, "Email")}
//                             placeholder={`Enter Email`}
//                             type="email"
//                             value={smartCard["Email"]}
//                             variant="outlined"
//                           />
//                         </div>
//                         <div className="d-flex align-item-center justify-content-center pt-3">
//                           <TextField
//                             className="inputSize"
//                             required
//                             label="Amount"
//                             name="amount"
//                             onChange={(e) => handleSelect(e, "amount")}
//                             placeholder={`Enter Amount`}
//                             type="number"
//                             value={selectDetails["amount"]}
//                             variant="outlined"
//                           />
//                         </div>
//                       </div>
//                     )
//                   ) : (
//                     ""
//                   )
//                 )
//               : ""}
//             {/* {verifyUserdetails.onclick === true &&
//             verifyUserdetails.name === "SMILE"
//               ? fieldsArray.map((allFields, i) =>
//                   allFields.text !== "Select Product" &&
//                   allFields.text !== "Invoice Id" &&
//                   allFields.select === true ? (
//                     <>
//                       <div
//                         key={i}
//                         className="d-flex align-item-center justify-content-center pt-3"
//                       >
//                         <TextField
//                           className="inputSize"
//                           required
//                           label={allFields.text}
//                           name={allFields.text}
//                           placeholder={`Enter ${allFields.text}`}
//                           select
//                           type="text"
//                           value={values[allFields.text]}
//                           variant="outlined"
//                           InputLabelProps={{
//                             shrink: true,
//                           }}
//                         >
//                           <MenuItem>Select Data Type</MenuItem>
//                           {fieldsOptions.map((option, index) => {
//                             const detail = JSON.parse(option);
//                             return (
//                               <MenuItem
//                                 key={index}
//                                 value={detail.ItemName}
//                                 onClick={(event) =>
//                                   handleSelect(allFields.text, detail)
//                                 }
//                               >
//                                 {detail.ItemName}
//                               </MenuItem>
//                             );
//                           })}
//                         </TextField>
//                       </div>
//                       <div className="d-flex align-item-center justify-content-center pt-3">
//                         <TextField
//                           required
//                           className="inputSize"
//                           label="Amount"
//                           name="smileNumber"
//                           onChange={handleSmartCard}
//                           placeholder={`Enter AMount`}
//                           type="number"
//                           variant="outlined"
//                           value={selectDetails["amount"]}
//                         />
//                       </div>
//                     </>
//                   ) : (
//                     ""
//                   )
//                 )
//               : ""} */}
//             {verifyUserdetails.onclick === true &&
//             verifyUserdetails.name === "SMILE" ? (
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

import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../_action/loading";
import {
  verifySmartcardNumber,
  clearVerified,
} from "../../_action/verifyNumber";
import { TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { PaymentIntent, clearPayment } from "../../_action/Payment/index";
import Alert from "@material-ui/lab/Alert";
import { pay } from "../../_action/Payment/paymentButtons";
import { clearErrors } from "../../_action/errorAction";
import { verify } from "../../_action/verify";
import "../../css/input.css";
import { USSD_KEY, FLUTTERWAVE_KEY } from "./PaymentProcess/hooks";
import axios from "axios";

function Smile(props) {
  const error = useSelector((state) => state.error);
  const [disabledCard, setDisabledCard] = useState(false);
  const [disabledUssd, setDisabledUssd] = useState(false);
  const [buttonValue, setButtonValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [smartCard, setSmartCard] = useState("");
  const [selectDetails, setSelectDetails] = useState(null);
  const productDetails = useSelector((state) => state.someData.detail);
  const [bouquet, setBouquet] = useState(null);
  const [selectName, setSelectName] = useState(null);

  useEffect(() => {
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;
    const config = {
      headers: {
        Authorization: "Basic " + btoa(`${username}:${password}`),
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_CORALPAY_URL}/coralpay-vas/api/packages/biller/slug/SMILE`,
        config
      )
      .then((res) => {
        for (var i = 0; i < res.data.responseData.length; i++) {
          // if (
          //   res.data.responseData[i].name === "AIRTEL VTU" ||
          //   res.data.responseData[i].name === "AIRTEL VTU 2"
          // ) {
          res.data.responseData.splice(i, 1);
          setBouquet(res.data.responseData);
          i--;
          // }
        }
      })
      .catch((err) => console.log(err));
  }, []);

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

  const handleSelect = (e) => {
    setSelectDetails(e.target.value);

    bouquet === null
      ? ""
      : bouquet.map((allData) => {
          if (allData.amount === parseInt(e.target.value)) {
            setSelectName(allData.slug);
          }
        });
  };

  const handleSubmit = (value) => {
    setButtonValue(value);
    if (value === "FLUTTERWAVE") {
      setDisabledCard(true);
    } else if (value === "USSD") {
      setDisabledUssd(true);
    }

    const newValuesObj = {
      amount: selectDetails === null ? "" : selectDetails,
      channelRef: "web",
      description: "Airtime",
      paymentMethod:
        value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
      productId: `${productDetails.productId}`,
      referenceValues: {
        customerId: `${smartCard["phoneNumber"]}`,
        customerName: `${smartCard["email"]}`,
        phoneNumber: `${smartCard["phoneNumber"]}`,
        packageSlug: selectName === null ? "" : selectName,
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
          {/* bouquet */}
          <div className="">
            <div className="pt-3">
              <div className="d-flex align-item-center justify-content-center">
                <select
                  value={selectDetails === null ? "" : selectDetails["name"]}
                  onChange={(e) => handleSelect(e)}
                  className="p-3"
                  id="inputSize"
                  style={{ borderRadius: "3px" }}
                >
                  <option>Select bouquet</option>
                  {bouquet === null
                    ? ""
                    : bouquet.map((allData, i) => (
                        <option
                          onClick={(e) => handleSelectClick(e, allData.name)}
                          value={allData.amount}
                          key={i}
                        >
                          {allData.name}
                        </option>
                      ))}
                </select>
              </div>
            </div>
          </div>
          <div>
            <div>
              {fieldsArray.map((allFields, i) =>
                allFields.text === "customerId" ||
                allFields.text === "amount" ? (
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
                          : ""
                      }
                      onChange={(e) => handleOthers(e, allFields.text)}
                      type={allFields.text === "email" ? "email" : "number"}
                      variant="outlined"
                    />
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
            {fieldsArray.map((allFields, i) =>
              allFields.text === "customerId" ||
              allFields.text === "email" ||
              allFields.text === "phoneNumber" ? (
                ""
              ) : allFields.select !== true ? (
                <div
                  key={i}
                  className="d-flex align-item-center justify-content-center pt-3"
                >
                  <TextField
                    className="inputSize"
                    required
                    label={allFields.text === "amount" ? "Amount" : ""}
                    onChange={(e) => handleOthers(e, allFields.text)}
                    value={selectDetails === null ? "" : selectDetails}
                    disabled
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
  })(Smile)
);
