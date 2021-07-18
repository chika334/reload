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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Electricity(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const [email, setEmail] = useState("");
  const user = useSelector((state) =>
    state.authUser.user === null ? "" : state.authUser.user
  );
  const error = useSelector((state) => state.error);
  const [errors, setErrors] = useState("");
  const [failure, setFailure] = useState("");
  const [otherValues, setOtherValues] = useState({});
  const [amount, setAmount] = useState("");
  const [smartCard, setSmartCard] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selectDetails, setSelectDetails] = useState({});
  const verifiedUser = useSelector((state) => state.verify);
  const paymentButton = useSelector((state) => state.paymentButton);
  const verifyUserdetails = useSelector((state) => state.verifyUserdetails);
  const paymentIntent = useSelector((state) => state.paymentIntent);
  const pays = useSelector((state) =>
    state.paymentDone.payment === true ? state.paymentDone.detail : ""
  );
  // const

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
  }, [error.error]);

  console.log(props.location);

  const verifyMeterNumber = async () => {
    const details = {
      product: props.location.state.productId,
      accountNumber: smartCard,
      extras: {
        field1: null,
        billerCode: props.location.state.data.billerCode,
        field2: "PREPAID",
        field3: "",
        field4: "",
        customerAccountType: null,
      },
    };

    props.verifySmartcardNumber(details);
  };

  const SmartNumber = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (localStorage.token) {
      let result = verifyMeterNumber();
    } else {
      setLoading(false);
      // const path = `${props.location.pathname}${props.location.search}`;
      // props.loginRediectSuccess(path, props.location.state.data);
      // props.history.push("/reloadng/registration");
      setOpen(true);
      // props.history.push("/reloadng/registration");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      props.location.state.productName === "Electricity Prepaid" &&
      localStorage.token !== undefined
    ) {
      if (props.location.state.data.billerCode === "ABJ_PREPAID") {
        const newValuesObj = {
          amount: `${amount}`,
          channelRef: "web",
          description: "Electricity Prepaid",
          paymentMethod: "billpayflutter",
          productId: `${props.location.state.data.productId.id}`,
          referenceValues: {
            // "Email Address": otherValues["Email Address"],
            "Email Address": user.user.email,
            "Customer Name": `${verifiedUser.result.account.accountName}`,
            "customer Number": `${verifiedUser.result.account.accountNumber}`,
            "Meter Number": `${verifiedUser.result.account.accountNumber}`,
            "Meter Type": selectDetails.ItemType,
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
      } else if (props.location.state.data.billerCode === "ekdc prepaid") {
        const newValuesObj = {
          amount: `${amount}`,
          channelRef: "web",
          description: "Electricity Prepaid",
          paymentMethod: "billpayflutter",
          productId: `${props.location.state.data.productId.id}`,
          referenceValues: {
            // "Email Address": `${email}`,
            "Email Address": user.user.email,
            "Account Name": `${verifiedUser.result.account.accountName}`,
            ProductCode: `${verifiedUser.result.account.accountNumber}`,
          },
          references: ["Email Address", "Account Name", "ProductCode"],
        };

        props.PaymentIntent(newValuesObj);
      } else if (props.location.state.data.billerCode === "iedc") {
        const newValuesObj = {
          amount: `${amount}`,
          channelRef: "web",
          description: "Electricity Prepaid",
          paymentMethod: "billpayflutter",
          productId: `${props.location.state.data.productId.id}`,
          referenceValues: {
            // "Email Address": otherValues["Email Address"],
            "Email Address": user.user.email,
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
      } else if (props.location.state.data.billerCode === "PHEDDIR2") {
        const newValuesObj = {
          amount: `${amount}`,
          channelRef: "web",
          description: "Electricity Prepaid",
          paymentMethod: "billpayflutter",
          productId: `${props.location.state.data.productId.id}`,
          referenceValues: {
            // "Email Address": otherValues["Email Address"],
            "Email Address": user.user.email,
            "Meter or Account Number": `${verifiedUser.result.account.accountNumber}`,
            "Ref ID": `${verifiedUser.result.account.accountName}`,
            "Meter Type": `${selectDetails.ItemType}`,
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
    } else {
      setLoading(false);
      // const path = `${props.location.pathname}${props.location.search}`;
      // props.loginRediectSuccess(path, props.location.state.data);
      // props.history.push("/reloadng/registration");
      setOpen(true);
    }
  };

  // console.log(verifiedUser.result);

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

  const item = JSON.parse(props.location.state.data.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  const verifyNumber = JSON.parse(props.location.state.data.productvalue)
    .field0;

  const Options =
    JSON.parse(props.location.state.data.productvalue).field6 === undefined
      ? ""
      : JSON.parse(props.location.state.data.productvalue).field6.options;

  const fieldsOption = [];
  for (const key in Options) {
    if (Options.hasOwnProperty(key)) {
      var value = Options[key];
      fieldsOption.push(value);
    }
  }

  // console.log(Options);

  useEffect(() => {
    if (paymentIntent.success === true) {
      setLoading(false);
      const detail = {
        amount: amount,
        // email: otherValues["Email Address"],
        email: user.user.email,
        transRef: paymentIntent.detail.transRef,
        customerName: verifiedUser.result.account.accountName,
      };

      dispatch(pay(detail));
      props.dataPay(true, "Electricity");
    }
  }, [paymentIntent.success]);

  useEffect(() => {
    if (verifiedUser.verifySuccess === true) {
      setLoading(false);
      props.verify("Electricity", true);
    }
  }, [verifiedUser.verifySuccess]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegRedirect = () => {
    props.history.push("/reloadng/registration");
  };

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
      <form onSubmit={handleSubmit}>
        <div className="d-flex align-item-center justify-content-center">
          {failure && <Alert severity="error">{failure}</Alert>}
        </div>
        {verifyUserdetails.onclick === true &&
        verifyUserdetails.name === "Electricity"
          ? fieldsArray.slice(1).map((allData, i) =>
              allData.select === false &&
              allData.text !== "Amount" &&
              allData.text !== "Meter Type" ? (
                allData.text === "Email Address" ? (
                  ""
                ) : (
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
                            : ""
                        }
                      />
                    </div>
                  </div>
                )
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
        {verifyUserdetails.onclick === true &&
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
          : ""}
        <div>
          {verifyUserdetails.onclick === true &&
          verifyUserdetails.name === "Electricity" ? (
            <div className="d-flex align-item-center justify-content-center">
              <Button
                onSubmit={handleSubmit}
                type="submit"
                style={{
                  backgroundColor: "#fda94f",
                  color: "#000",
                  fontSize: "12px",
                  padding: "11px",
                }}
              >
                Proceed to payment
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
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
