// import React, { useState, useEffect } from "react";
// import { withRouter } from "react-router-dom";
// import { connect, useSelector } from "react-redux";
// import { showLoader, hideLoader } from "../../../_action/loading";
// import {
//   verifySmartcardNumber,
//   clearVerified
// } from "../../../_action/verifyNumber";
// import {
//   MenuItem,
//   TextField,
//   Select,
//   FormControl,
//   InputLabel,
//   Button
// } from "@material-ui/core";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import { PaymentIntent, clearPayment } from "../../../_action/Payment/index";
// import { pay } from "../../../_action/Payment/paymentButtons";
// import { clearErrors } from "../../../_action/errorAction";
// import { verify } from "../../../_action/verify";
// import "../../../css/input.css";
// import { selectData } from "../../../_action/selectData/select";
// import { withStyles } from "@material-ui/core/styles";
// import InputBase from "@material-ui/core/InputBase";
// import NewFormData from "../../Form/NewFormData";

// const BootstrapInput = withStyles(theme => ({
//   root: {
//     "label + &": {
//       marginTop: theme.spacing(3)
//     }
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
//       '"Segoe UI Symbol"'
//     ].join(","),
//     "&:focus": {
//       borderRadius: 4,
//       borderColor: "#80bdff",
//       boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
//     }
//   }
// }))(InputBase);

// function VerifyDetails(props) {
//   const {
//     billerCode,
//     productName,
//     billerSlug,
//     productType,
//     setLoading
//   } = props;
//   const verifiedUser = useSelector(state => state.verify);
//   const verifyUserdetails = useSelector(state => state.verifyUserdetails);
//   const [smartCard, setSmartCard] = useState("");
//   const productDetails = useSelector(state => state.someData.detail);
//   const [meterType, setMeterType] = useState("");

//   const handleOthers = (e, name) => {
//     const newValues = { ...smartCard };
//     newValues[name] = e.target.value;
//     setSmartCard(newValues);
//   };

//   const handleSelectMeterType = event => {
//     if (event.target.value === "PREPAID") {
//       if (billerCode === "EEDC") {
//         props.selectData("ENUGU_PREPAID");
//         setMeterType("ENUGU_PREPAID");
//       } else if (billerCode === "KEDCO") {
//         props.selectData("KEDCO_PREPAID");
//         setMeterType("KEDCO_PREPAID");
//       }
//     } else {
//       if (billerCode === "EEDC") {
//         props.selectData("ENUGU_POSTPAID");
//         setMeterType("ENUGU_POSTPAID");
//       } else if (billerCode === "KEDCO") {
//         props.selectData("KEDCO_PREPAID");
//         setMeterType("KEDCO_PREPAID");
//       }
//     }
//   };

//   const verifyMeterNumber = async () => {
//     const details = {
//       product: productDetails.productId,
//       billerCode: billerCode,
//       accountNumber: smartCard.customerId,
//       extras: {
//         billerSlug: billerSlug,
//         customerId: smartCard.customerId,
//         productName: productType === "Electricity" ? meterType : productName
//       }
//     };

//     props.verifySmartcardNumber(details);
//   };

//   const SmartNumber = async e => {
//     e.preventDefault();
//     setLoading(true);
//     let result = verifyMeterNumber();
//   };

//   const item = JSON.parse(productDetails.detail.productvalue);

//   const fieldsArray = [];
//   for (const data in item) {
//     fieldsArray.push(item[data]);
//   }

//   useEffect(() => {
//     if (verifiedUser.verifySuccess === true) {
//       setLoading(false);
//       props.verify(productType, true);
//     }
//   }, [verifiedUser.verifySuccess]);

//   return (
//     <div className="property-details-area">
//       <div>
//         {verifyUserdetails.onclick === false &&
//         verifyUserdetails.name === "" ? (
//           <div>
//             <div>
//               <div>
//                 {fieldsArray.map((allFields, i) =>
//                   allFields.text === "customerId" &&
//                   allFields.lookup === true ? (
//                     <div key={i}>
//                       <div className="d-flex align-item-center justify-content-center pt-3">
//                         <TextField
//                           className="inputSize"
//                           required
//                           label={
//                             productType !== "Electricity" &&
//                             allFields.text === "customerId"
//                               ? "SmartCard Number"
//                               : productType === "Electricity"
//                               ? "Enter Meter Number"
//                               : ""
//                           }
//                           onChange={e => handleOthers(e, allFields.text)}
//                           type={allFields.text === "email" ? "email" : "number"}
//                           variant="outlined"
//                           InputProps={{
//                             startAdornment:
//                               allFields.text === "Amount" ? (
//                                 <InputAdornment position="start">
//                                   ₦
//                                 </InputAdornment>
//                               ) : (
//                                 ""
//                               )
//                           }}
//                         />
//                       </div>
//                       {/* {billerSlug === "STARTIMES" ? "DANIEL" : "BAD"} */}
//                       {productType === "Electricity" ? (
//                         <div className="d-flex align-item-center justify-content-center pt-3">
//                           <FormControl className="inputSize">
//                             <InputLabel id="demo-customized-select-label">
//                               Meter Type
//                             </InputLabel>
//                             <Select
//                               labelId="demo-customized-select-label"
//                               id="demo-customized-select"
//                               // value={meterType}
//                               onChange={handleSelectMeterType}
//                               placeholder="Select Meter Type"
//                               input={<BootstrapInput />}
//                             >
//                               <MenuItem value="Select Meter Type">
//                                 <em>Select Meter Type</em>
//                               </MenuItem>
//                               {productName.map((allData, i) => (
//                                 <MenuItem value={allData}>{allData}</MenuItem>
//                               ))}
//                             </Select>
//                           </FormControl>
//                         </div>
//                       ) : (
//                         console.log("bad")
//                       )}
//                     </div>
//                   ) : (
//                     ""
//                   )
//                 )}
//               </div>
//             </div>

//             <div className="d-flex align-item-center justify-content-center">
//               <Button
//                 onClick={SmartNumber}
//                 variant="contained"
//                 className="p-3"
//                 style={{
//                   backgroundColor: "#fda94f",
//                   cursor:
//                     props.disabledUssd === true ? "not-allowed" : "pointer",
//                   color: "#000",
//                   fontSize: "12px",
//                   padding: "11px"
//                 }}
//               >
//                 Verify
//               </Button>
//             </div>
//           </div>
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
//     selectData,
//     hideLoader,
//     PaymentIntent,
//     clearPayment,
//     clearVerified,
//     pay,
//     verify
//   })(VerifyDetails)
// );

import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../../_action/loading";
import {
  verifySmartcardNumber,
  clearVerified
} from "../../../_action/verifyNumber";
import {
  MenuItem,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Button
} from "@material-ui/core";
import { selectData } from "../../../_action/selectData/select";
import InputAdornment from "@material-ui/core/InputAdornment";
import { PaymentIntent, clearPayment } from "../../../_action/Payment/index";
import { pay } from "../../../_action/Payment/paymentButtons";
import { clearErrors } from "../../../_action/errorAction";
import { verify } from "../../../_action/verify";
import "../../../css/input.css";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
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
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

function VerifyDetails(props) {
  const {
    billerCode,
    productName,
    billerSlug,
    productType,
    setLoading
  } = props;
  const verifiedUser = useSelector(state => state.verify);
  const verifyUserdetails = useSelector(state => state.verifyUserdetails);
  const [smartCard, setSmartCard] = useState("");
  const productDetails = useSelector(state => state.someData.detail);
  const [meterType, setMeterType] = useState("");

  const handleOthers = (e, name) => {
    const newValues = { ...smartCard };
    newValues[name] = e.target.value;
    setSmartCard(newValues);
  };

  const handleSelectMeterType = event => {
    if (event.target.value === "PREPAID") {
      if (billerCode === "EEDC") {
        props.selectData("ENUGU_PREPAID");
        setMeterType("ENUGU_PREPAID");
      } else if (billerCode === "KEDCO") {
        props.selectData("KEDCO_PREPAID");
        setMeterType("KEDCO_PREPAID");
      }
    } else {
      if (billerCode === "EEDC") {
        props.selectData("ENUGU_POSTPAID");
        setMeterType("ENUGU_POSTPAID");
      } else if (billerCode === "KEDCO") {
        props.selectData("KEDCO_PREPAID");
        setMeterType("KEDCO_PREPAID");
      }
    }
  };

  const verifyMeterNumber = async () => {
    const details = {
      product: productDetails.productId,
      billerCode: billerCode,
      accountNumber: smartCard.customerId,
      extras: {
        billerSlug: billerSlug,
        customerId: smartCard.customerId,
        productName: productType === "Electricity" ? meterType : productName
      }
    };

    props.verifySmartcardNumber(details);
  };

  const SmartNumber = async e => {
    e.preventDefault();
    setLoading(true);
    let result = verifyMeterNumber();
  };

  const item = JSON.parse(productDetails.detail.productvalue);

  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  useEffect(() => {
    if (verifiedUser.verifySuccess === true) {
      setLoading(false);
      props.verify(productType, true);
    }
  }, [verifiedUser.verifySuccess]);

  return (
    <div className="property-details-area">
      <div>
        {verifyUserdetails.onclick === false &&
        verifyUserdetails.name === "" ? (
          <div>
            <div>
              <div>
                {fieldsArray.map((allFields, i) =>
                  allFields.text === "customerId" &&
                  allFields.lookup === true ? (
                    <div key={i}>
                      <div className="d-flex align-item-center justify-content-center pt-3">
                        <TextField
                          className="inputSize"
                          required
                          label={
                            productType !== "Electricity" &&
                            allFields.text === "customerId"
                              ? "SmartCard Number"
                              : productType === "Electricity"
                              ? "Enter Meter Number"
                              : ""
                          }
                          onChange={e => handleOthers(e, allFields.text)}
                          type={allFields.text === "email" ? "email" : "number"}
                          variant="outlined"
                          InputProps={{
                            startAdornment:
                              allFields.text === "Amount" ? (
                                <InputAdornment position="start">
                                  ₦
                                </InputAdornment>
                              ) : (
                                ""
                              )
                          }}
                        />
                      </div>
                      {/* {billerSlug === "STARTIMES" ? "DANIEL" : "BAD"} */}
                      {productType === "Electricity" ? (
                        <div className="d-flex align-item-center justify-content-center pt-3">
                          <FormControl className="inputSize">
                            <InputLabel id="demo-customized-select-label">
                              Meter Type
                            </InputLabel>
                            <Select
                              labelId="demo-customized-select-label"
                              id="demo-customized-select"
                              // value={meterType}
                              onChange={handleSelectMeterType}
                              placeholder="Select Meter Type"
                              input={<BootstrapInput />}
                            >
                              <MenuItem value="Select Meter Type">
                                <em>Select Meter Type</em>
                              </MenuItem>
                              {productName.map((allData, i) => (
                                <MenuItem key={i} value={allData}>{allData}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      ) : (
                        console.log("bad")
                      )}
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>

            <div className="d-flex align-item-center justify-content-center">
              <Button
                onClick={SmartNumber}
                variant="contained"
                className="p-3"
                style={{
                  backgroundColor: "#fda94f",
                  cursor:
                    props.disabledUssd === true ? "not-allowed" : "pointer",
                  color: "#000",
                  fontSize: "12px",
                  padding: "11px"
                }}
              >
                Verify
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
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
    selectData,
  })(VerifyDetails)
);
