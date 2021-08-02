import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../_action/loading";
import {
  verifySmartcardNumber,
  clearVerified,
} from "../../_action/verifyNumber";
import { MenuItem, TextField, Button } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { PaymentIntent, clearPayment } from "../../_action/Payment/index";
import Alert from "@material-ui/lab/Alert";
import { pay } from "../../_action/Payment/paymentButtons";
import { clearErrors } from "../../_action/errorAction";
import { verify } from "../../_action/verify";
import "../../css/input.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

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
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [open, setOpen] = React.useState(false);
  const [smartCard, setSmartCard] = useState("");
  const [selectDetails, setSelectDetails] = useState({});
  const [email, setEmail] = useState("");
  const productDetails = useSelector((state) => state.someData.detail);
  const paymentIntent = useSelector((state) => state.paymentIntent);

  useEffect(() => {
    if (error.id === "VERIFY_FAILED") {
      setLoading(false);
      setErrors(error.message.message);
      setTimeout(() => {
        props.clearErrors();
        setErrors("");
      }, 5000);
    } else if (error.id === "BUY_DATA_FAILURE") {
      setLoading(false);
      setErrors(error.message.message);
      setTimeout(() => {
        props.clearErrors();
        setErrors("");
      }, 5000);
    }
  }, [error.error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const value = e.target.value;
    if (productDetails.productname === "Cable") {
      if (productDetails.billerCode === "startimes") {
        const newValuesObj = {
          amount: `${selectDetails.Amount}`,
          channelRef: "web",
          description: "Cable",
          // paymentMethod: "billpayflutter",
          paymentMethod:
            value === "card" ? "billpayflutter" : "billpaycoralpay",
          productId: `${productDetails.productId}`,
          referenceValues: {
            "E-mail": `${email}`,
            // "E-mail": user.user.email,
            "Product ": selectDetails.ItemType,
            "Customer Name": `${verifiedUser.result.account.accountName}`,
            "SmartCard Number": `${verifiedUser.result.account.accountNumber}`,
          },
          references: [
            "E-mail",
            "Product ",
            "Customer Name",
            "SmartCard Number",
          ],
        };

        props.PaymentIntent(newValuesObj);
        // props.pay(true, "Cable");
        // props.verify("Cable", true);
      } else if (productDetails.billerCode === "DSTV2") {
        const newValuesObj = {
          amount: selectDetails.Amount.trim(),
          channelRef: "web",
          description: "Cable",
          // paymentMethod: "billpayflutter",
          paymentMethod:
            value === "card" ? "billpayflutter" : "billpaycoralpay",
          productId: `${productDetails.productId}`,
          referenceValues: {
            "Email Address": `${email}`,
            // "Email Address": user.user.email,
            "Select Package (Amount)": selectDetails.ItemType,
            "Number of Months": "1",
            "SmartCard Number": `${verifiedUser.result.account.accountNumber}`,
            "Customer Number": selectDetails.Amount.trim(),
            "Customer Details": `${verifiedUser.result.account.accountName}`,
          },
          references: [
            "Email Address",
            "Select Package (Amount)",
            "Number of Months",
            "SmartCard Number",
            "Customer Number",
            "Customer Details",
          ],
        };

        props.PaymentIntent(newValuesObj);
      } else if (productDetails.billerCode === "GOTV2") {
        const newValuesObj = {
          amount: `${selectDetails.Amount.trim()}`,
          channelRef: "web",
          description: "Cable",
          // paymentMethod: "billpayflutter",
          paymentMethod:
            value === "card" ? "billpayflutter" : "billpaycoralpay",
          productId: `${productDetails.productId}`,
          referenceValues: {
            Email: `${email}`,
            // Email: user.user.email,
            "Select Package (Amount)": selectDetails.ItemName,
            "Number of Months": "1",
            "SmartCard Number": `${verifiedUser.result.account.accountNumber}`,
          },
          references: [
            "Email",
            "Select Package (Amount)",
            "Number of Months",
            "SmartCard Number",
          ],
        };
        // props.pay(true, "Cable");
        props.PaymentIntent(newValuesObj);
        // props.verify("Cable", true);
      }
      // handlePaymentProcess();
    } else {
      if (!localStorage.token) {
        // setLoading(false);
        // // const path = `${props.location.pathname}${props.location.search}`;
        // // props.loginRediectSuccess(path, props.location.state.data);
        // // props.history.push("/reloadng/registration");
        // setOpen(true);
      }
    }
  };

  const handleRegRedirect = () => {
    props.history.push("/reloadng/registration");
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (paymentIntent.success === true) {
      // pro
      setLoading(false);
      const amount = selectDetails.Amount.trim();
      const detail = {
        amount: amount,
        email: email,
        // email: user.user.email,
        transRef: paymentIntent.detail.transRef,
        customerName: verifiedUser.result.account.accountName,
      };

      // console.log(detail);
      dispatch(pay(detail));
      props.dataPay(true, "Cable");
    }
  }, [paymentIntent.success]);

  const handleFieldChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSelect = (name, value) => {
    setSelectDetails(value);
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
    //   props.history.push("/reloadng/registration");
    // }
  };

  // console.log(productDetails);

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  const deal = Object.values(fieldsArray);
  useEffect(() => {
    deal.map((allData) => {
      if (allData.text === "Product type") {
        if (allData.select !== true) {
          return setDisabled(false);
        } else {
          return setDisabled(true);
        }
      } else {
        return setDisabled(false);
      }
    });
  }, []);

  const verifyNumber = JSON.parse(productDetails.detail.productvalue).field0;

  // console.log(productDetails);

  const packages = JSON.parse(productDetails.detail.productvalue).field1
    .options;

  const fieldsOptions = [];
  for (const key in packages) {
    if (packages.hasOwnProperty(key)) {
      var value = packages[key];
      fieldsOptions.push(value);
    }
  }

  // console.log(fieldsOptions);

  const startimesOptions = JSON.parse(productDetails.detail.productvalue).field3
    .options;

  const fieldsStartimes = [];
  for (const key in startimesOptions) {
    if (startimesOptions.hasOwnProperty(key)) {
      var value = startimesOptions[key];
      fieldsStartimes.push(value);
    }
  }

  const numberOfMonths = JSON.parse(productDetails.detail.productvalue).field2
    .options;

  const fieldsNumber = [];
  for (const key in numberOfMonths) {
    if (numberOfMonths.hasOwnProperty(key)) {
      var value = numberOfMonths[key];
      fieldsNumber.push(value);
    }
  }

  useEffect(() => {
    if (verifiedUser.verifySuccess === true) {
      setLoading(false);
      props.verify("Cable", true);
    }
  }, [verifiedUser.verifySuccess]);

  // console.log(props);

  // useEffect(() => {
  //   props.clearVerified();
  // }, []);

  return (
    <div className="property-details-area">
      <div>
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
      </div>
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
                verifyNumber.text === "GoTv Smart Card Number" ||
                "SmartCard Number" ? (
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
            <div>
              {verifyUserdetails.onclick === true &&
              verifyUserdetails.name === "Cable"
                ? fieldsArray.slice(1).map(
                    (allField, i) =>
                      allField.select === true &&
                      (allField.text === "Select Package (Amount)" ? (
                        <div key={i}>
                          <div className="d-flex align-item-center justify-content-center pt-3">
                            <TextField
                              // style={{ width: "50%" }}
                              className="inputSize"
                              required
                              label={allField.text}
                              name={allField.text}
                              placeholder={`Enter ${allField.text}`}
                              select
                              type="text"
                              // value={values[allField.text]}
                              variant="outlined"
                              InputLabelProps={{
                                shrink: true,
                              }}
                            >
                              <MenuItem>Select Data Type</MenuItem>
                              {fieldsOptions.map((option, index) => {
                                const detail = JSON.parse(option);
                                // console.log(detail);
                                return (
                                  <MenuItem
                                    key={index}
                                    value={detail.ItemName}
                                    onClick={(e) =>
                                      handleSelect(allField.text, detail)
                                    }
                                  >
                                    {detail.ItemName}
                                  </MenuItem>
                                );
                              })}
                            </TextField>
                          </div>
                        </div>
                      ) : allField.text === "Number of Months" ? (
                        <div
                          key={i}
                          className="d-flex align-item-center justify-content-center pt-3"
                        >
                          <TextField
                            required
                            // style={{ width: "50%" }}
                            className="inputSize"
                            label="Number of Months"
                            name="months"
                            // onChange={handleSmartCard}
                            placeholder={`Enter Number of Months`}
                            type="number"
                            variant="outlined"
                            value="1"
                            disabled
                          />
                        </div>
                      ) : allField.text === "Email" ? (
                        <div
                          key={i}
                          className="d-flex align-item-center justify-content-center pt-3"
                        >
                          <TextField
                            required
                            // style={{ width: "50%" }}
                            className="inputSize"
                            label="Email"
                            name="months"
                            onChange={handleFieldChange}
                            placeholder={`Enter Email Address`}
                            type="email"
                            variant="outlined"
                            value="1"
                            disabled
                          />
                        </div>
                      ) : (
                        allField.text === "Product " && (
                          <div className="d-flex align-item-center justify-content-center pt-3">
                            <TextField
                              // style={{ width: "50%" }}
                              className="inputSize"
                              required
                              label={allField.text}
                              name={allField.text}
                              placeholder={`Enter ${allField.text}`}
                              select
                              type="text"
                              // value={values[allField.text]}
                              variant="outlined"
                              InputLabelProps={{
                                shrink: true,
                              }}
                            >
                              <MenuItem>Select Data Type</MenuItem>
                              {fieldsStartimes.map((option, index) => {
                                const detail = JSON.parse(option);
                                console.log(detail);
                                return (
                                  <MenuItem
                                    key={index}
                                    value={detail.ItemName}
                                    onClick={(e) =>
                                      handleSelect(allField.text, detail)
                                    }
                                  >
                                    {detail.ItemName}
                                  </MenuItem>
                                );
                              })}
                            </TextField>
                          </div>
                        )
                      ))
                  )
                : ""}
              {verifyUserdetails.onclick === true &&
              verifyUserdetails.name === "Cable"
                ? fieldsArray.slice(1).map((allFields, i) =>
                    allFields.select === false &&
                    allFields.text !== "Email Address" &&
                    allFields.text !== "Customers Name" &&
                    allFields.text !== "SmartCard Number" ? (
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
                          onChange={handleFieldChange}
                          placeholder={`Enter ${allFields.text}`}
                          type={
                            allFields.text === "Subscription Amount" ||
                            allFields.text === "Amount"
                              ? allFields.type
                              : ""
                          }
                          variant="outlined"
                          InputProps={{
                            startAdornment:
                              allFields.text === "Subscription Amount" ||
                              allFields.text === "Amount" ? (
                                <InputAdornment position="start">
                                  ₦
                                </InputAdornment>
                              ) : (
                                ""
                              ),
                          }}
                          disabled={
                            allFields.text === "Subscription Amount" ||
                            (allFields.text === "Amount" && disabled)
                          }
                          value={
                            allFields.text === "Customer Name"
                              ? verifiedUser.result.account.accountName
                              : allFields.text === "Customer Number"
                              ? verifiedUser.result.account.accountNumber
                              : allFields.text === "Customer Details"
                              ? verifiedUser.result.account.accountName
                              : selectDetails.Amount === undefined
                              ? ""
                              : allFields.text === "Amount"
                              ? selectDetails.Amount
                              : allFields.text === "Subscription Amount"
                              ? selectDetails.Amount
                              : values[allFields.text]
                          }
                        />
                      </div>
                    ) : (
                      ""
                    )
                  )
                : ""}
              {verifyUserdetails.onclick === true &&
              verifyUserdetails.name === "Cable"
                ? fieldsArray.slice(1).map(
                    (allFields, i) =>
                      allFields.select === false &&
                      allFields.text !== "Email Address" &&
                      allFields.text === "Customers Name" && (
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
                            onChange={handleFieldChange}
                            placeholder={`Enter ${allFields.text}`}
                            type={
                              allFields.text === "Customers Name"
                                ? allFields.type
                                : ""
                            }
                            disabled
                            variant="outlined"
                            value={
                              allFields.text === "Customer Name"
                                ? verifiedUser.result.account.accountName
                                : allFields.text === "Customers Name"
                                ? verifiedUser.result.account.accountName
                                : values[allFields.text]
                            }
                          />
                        </div>
                      )
                  )
                : ""}
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
              {verifyUserdetails.onclick === true &&
              verifyUserdetails.name === "Cable" ? (
                <div className="ButtonSide">
                  <div>
                    <button
                      onClick={(e) => handleSubmit(e)}
                      value="card"
                      type="submit"
                      style={{
                        backgroundColor: "#fda94f",
                        color: "#000",
                        fontSize: "12px",
                        padding: "11px",
                      }}
                    >
                      Proceed to Card
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={(e) => handleSubmit(e)}
                      value="ussd"
                      type="submit"
                      style={{
                        backgroundColor: "#fda94f",
                        color: "#000",
                        fontSize: "12px",
                        padding: "11px",
                      }}
                    >
                      Proceed to Ussd
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
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
  })(Cable)
);
