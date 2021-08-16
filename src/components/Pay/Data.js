import React, { useState, useEffect } from "react";
import { MenuItem, TextField, Button } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { PaymentIntent } from "../../_action/Payment";
import { DataOptionSelect } from "../../components/jsonData/DataSelectOption";
import Alert from "@material-ui/lab/Alert";
import { pay } from "../../_action/Payment/paymentButtons";
import { fieldSelect } from "../../_action/Payment/paymentButtons";
import "../../css/input.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { USSD_KEY, FLUTTERWAVE_KEY } from "./PaymentProcess/hooks";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NewForm(props) {
  // const dispatch1 = useDispatch();
  const dispatch = useDispatch();
  const user = useSelector((state) =>
    state.authUser.user === null ? "" : state.authUser.user
  );
  const [disabled, setDisabled] = useState(false);
  const [disabledCard, setDisabledCard] = useState(false);
  const [disabledUssd, setDisabledUssd] = useState(false);
  const verifyDetails = useSelector((state) => state.verify);
  const [verifyEnabled, setVerifiedEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = React.useState(false);
  const [valuesDetails, setValuesDetails] = useState([]);
  const productDetails = useSelector((state) => state.someData.detail);
  const paymentIntent = useSelector((state) => state.paymentIntent);
  const [buttonValue, setButtonValue] = useState(null);
  const [smartCard, setSmartCard] = useState({
    "E-mail": "",
    "Phone Number": "",
  });
  const [detailValues, setDetailValues] = useState({
    values: {},
    mainValues: {
      description: "",
      amount: "",
      price: 0,
    },
  });
  const [selectDetails, setSelectDetails] = useState({
    id: "",
    amount: "",
    name: "",
  });

  const { phone, email } = smartCard;
  const { id, amount, name } = selectDetails;
  const { values, mainValues } = detailValues;

  const handleSelect = (field, value) => {
    setSelectDetails({
      ...selectDetails,
      id: value.ItemType,
      amount: value.Amount,
      name: value.ItemName,
    });
  };

  const handleOthers = (e, name) => {
    const newValues = { ...smartCard };
    newValues[name] = e.target.value;
    setSmartCard(newValues);
  };

  // console.log(productDetails.billerCode);

  const handleSubmit = (value) => {
    // e.preventDefault()
    setButtonValue(value);
    if (value === "FLUTTERWAVE") {
      setDisabledCard(true);
    } else if (value === "USSD") {
      setDisabledUssd(true);
    }

    // console.log(value);
    // const value = e.target.value;
    if (selectDetails !== null) {
      setLoading(true);
      // console.log(smartCard["Phone Number"].length);
      if (productDetails.billerCode === "airtel-data") {
        if (smartCard["Phone Number"].length < 11) {
          setError("Phone number must be 11 digits");
          // return
        } else {
          const newValuesObj = {
            amount: `${selectDetails.amount}`,
            channelRef: "web",
            description: "Data",
            // paymentMethod: "billpayflutter",
            paymentMethod:
              value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
            productId: `${productDetails.productId}`,
            referenceValues: {
              "E-mail": `${smartCard["E-mail"]}`,
              // "E-mail": user.user.email,
              "Product Type": `${selectDetails.id}`,
              "Phone Number": `${smartCard["Phone Number"]}`,
            },
            references: ["E-mail", "Product Type", "Phone Number"],
          };

          // console.log(newValuesObj);
          props.PaymentIntent(newValuesObj);
          // props.pay(true, "Data");
        }
      } else if (productDetails.billerCode === "glo-data") {
        if (smartCard["Phone Number"].length < 11) {
          setError("Phone number must be 11 digits");
          // return
        } else {
          const newValuesObj = {
            amount: `${selectDetails.amount}`,
            channelRef: "web",
            description: "Data",
            // paymentMethod: "billpayflutter",
            paymentMethod:
              value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
            productId: `${productDetails.productId}`,
            referenceValues: {
              "E-mail": `${smartCard["E-mail"]}`,
              // "E-mail": user.user.email,
              "Product Type": `${selectDetails.id}`,
              "Phone Number": `${smartCard["Phone Number"]}`,
            },
            references: ["E-mail", "Product Type", "Phone Number"],
          };

          // console.log(newValuesObj);
          props.PaymentIntent(newValuesObj);
        }
      } else if (productDetails.billerCode === "data") {
        if (smartCard["Phone Number"].length < 11) {
          setError("Phone number must be 11 digits");
          // return
        } else {
          const newValuesObj = {
            amount: `${selectDetails.amount}`,
            channelRef: "web",
            description: "Data",
            // paymentMethod: "billpayflutter",
            paymentMethod:
              value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
            productId: `${productDetails.productId}`,
            referenceValues: {
              Email: `${smartCard["Email"]}`,
              // Email: user.user.email,
              "Product type": `${selectDetails.id}`,
              "Phone Number": `${smartCard["Phone Number"]}`,
            },
            references: ["Email", "Product type", "Phone Number"],
          };

          // console.log(newValuesObj);
          props.PaymentIntent(newValuesObj);
        }
      } else if (productDetails.billerCode === "9mobiledata1") {
        if (smartCard["Phone Number"].length < 11) {
          setError("Phone number must be 11 digits");
          // return
        } else {
          const newValuesObj = {
            amount: `${selectDetails.amount}`,
            channelRef: "web",
            description: "Data",
            // paymentMethod: "billpayflutter",
            paymentMethod:
              value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
            productId: `${productDetails.productId}`,
            referenceValues: {
              Email: `${smartCard["Email"]}`,
              // Email: user.user.email,
              Product: `${selectDetails.id}`,
              "Phone Number": `${smartCard["Phone Number"]}`,
            },
            references: ["Email", "Product", "Phone Number"],
          };

          // console.log(newValuesObj);
          props.PaymentIntent(newValuesObj);
        }
      }
    } else {
      // setLoading(false);
      // // const path = `${props.location.pathname}${props.location.search}`;
      // // props.loginRediectSuccess(path, productDetails);
      // // props.history.push("/registration");
      // setOpen(true);
    }
  };

  useEffect(() => {
    if (paymentIntent.success === true) {
      // pro
      setLoading(false);
      const amount = selectDetails.amount;
      const detail = {
        amount: amount,
        buttonClick: buttonValue,
        product: productDetails.productname,
        email: `${
          productDetails.billerCode === "data"
            ? smartCard["Email"]
            : productDetails.billerCode === "glo-data"
            ? smartCard["E-mail"]
            : productDetails.billerCode === "airtel-data"
            ? smartCard["E-mail"]
            : productDetails.billerCode === "9mobiledata1"
            ? smartCard["Email"]
            : ""
        }`,
        // email: user.user.email,
        transRef: paymentIntent.detail.transRef,
        customerName: `${smartCard["Phone Number"]}`,
      };

      dispatch(pay(detail));
      props.dataPay(true, "Data");
    }
  }, [paymentIntent.success]);

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  console.log(item.field2.select);
  const fieldsOptions = [];
  const secondOptions = [];

  // if (item.field3.select === true) {
  //   const data = item.field3.options;
  //   console.log(data);
  //   if (item.field3.text === "Select Data Package") {
  //     for (const key in data) {
  //       if (data.hasOwnProperty(key)) {
  //         var value = data[key];
  //         fieldsOptions.push(value);
  //       }
  //     }
  //   }
  // } 
  // if (item.field2.select === true) {
  //   console.log("how");
  //   // if (item.field2.text === "Invoice Id") {
  //     const data = item.field2.options;
  //     console.log(data);
  //     for (const key in data) {
  //       // if (data.hasOwnProperty(key)) {
  //       //   var value = data[key];
  //       //   console.log("invoice");
  //       //   secondOptions.push(value);
  //       // }
  //     // }
  //   }
  // }

  if (item.field3.select === true) {
    const data = item.field3.options;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        var value = data[key];
        fieldsOptions.push(value);
      }
    }
  } 
  if (item.field2.select === true) {
    const data = item.field2.options;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        var value = data[key];
        secondOptions.push(value);
      }
    }
  }

  console.log(item);
  console.log(fieldsOptions);
  console.log(secondOptions);

  const deal = Object.values(fieldsArray);
  useEffect(() => {
    deal.map((allData) => {
      // console.log(allData);
      if (allData.text === "Product type") {
        if (allData.select !== true) {
          // console.log("bad");
          return setDisabled(false);
        } else {
          // console.log("fine");
          return setDisabled(true);
        }
      } else {
        return setDisabled(false);
      }
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegRedirect = () => {
    props.history.push("/registration");
  };

  return (
    <div>
      {/* <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Welcome to reload.ng"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Please sign-in to process payment.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              cancel
            </Button>
            <Button onClick={handleRegRedirect} color="primary">
              ok
            </Button>
          </DialogActions>
        </Dialog>
      </div> */}
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
              {error && <Alert severity="error">{error}</Alert>}
            </div>
            <div>
              {fieldsArray.map((allFields, i) =>
                allFields.select === true ? (
                  <div
                    key={i}
                    className="d-flex align-item-center justify-content-center pt-3"
                  >
                    <TextField
                      // style={{ width: "50%" }}
                      className="inputSize"
                      required
                      label={allFields.text}
                      name={allFields.text}
                      placeholder={`Enter ${allFields.text}`}
                      select
                      type="text"
                      value={values[allFields.text]}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      <MenuItem>Select Data Type</MenuItem>
                      {fieldsOptions.map((option, index) => {
                        const detail = JSON.parse(option);
                        return (
                          <MenuItem
                            key={index}
                            value={detail.ItemName}
                            onClick={(event) =>
                              handleSelect(allFields.text, detail)
                            }
                          >
                            {detail.ItemName}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </div>
                ) : (
                  ""
                )
              )}
              {fieldsArray.map((allFields, i) =>
                allFields.select !== true ? (
                  // allFields.text === "Email" || allFields.text === "E-mail" ? (
                  //   ""
                  // ) : (
                  <div
                    key={i}
                    className="d-flex align-item-center justify-content-center pt-3"
                  >
                    <TextField
                      // style={{ width: "50%" }}
                      className="inputSize"
                      required
                      label={allFields.text}
                      name={allFields.text}
                      onChange={(e) => handleOthers(e, allFields.text)}
                      placeholder={`Enter ${allFields.text}`}
                      type={
                        allFields.text === "Email" ||
                        allFields.text === "E-mail"
                          ? "email"
                          : "number"
                      }
                      // value={values[allFields.text]}
                      disabled={allFields.text === "Amount" && disabled}
                      value={
                        selectDetails.amount === undefined
                          ? ""
                          : allFields.text === "Amount"
                          ? selectDetails.amount
                          : allFields.text === "Phone Number"
                          ? smartCard["Phone Number"]
                          : allFields.text === "Email"
                          ? smartCard["Email"]
                          : allFields.text === "E-mail"
                          ? smartCard["E-mail"]
                          : ""
                      }
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
                  // )
                  ""
                )
              )}
            </div>
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
                  <div
                    onClick={(e) => {
                      // e.preventDefault();
                      handleSubmit(USSD_KEY);
                    }}
                    style={{ marginTop: "25px" }}
                  >
                    <a
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
          </div>
        </>
      )}
    </div>
  );
}

export default withRouter(connect(null, { PaymentIntent })(NewForm));
