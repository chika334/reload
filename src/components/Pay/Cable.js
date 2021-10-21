import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../_action/loading";
import {
  verifySmartcardNumber,
  clearVerified,
} from "../../_action/verifyNumber";
// import CoralUssd from "../../components/CorralUssd/App";
import {
  MenuItem,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { PaymentIntent, clearPayment } from "../../_action/Payment/index";
import Alert from "@material-ui/lab/Alert";
import { pay, paymentButtons } from "../../_action/Payment/paymentButtons";
import { clearErrors } from "../../_action/errorAction";
import { verify } from "../../_action/verify";
import "../../css/input.css";
import Slide from "@material-ui/core/Slide";
import { USSD_KEY, FLUTTERWAVE_KEY } from "./PaymentProcess/hooks";
import Dstv from "./Cable/Dstv";
import Gotv from "./Cable/Gotv";
import Startimes from "./Cable/Startimes";

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
  const [disabledCard, setDisabledCard] = useState(false);
  const [disabledUssd, setDisabledUssd] = useState(false);
  const [buttonValue, setButtonValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [open, setOpen] = React.useState(false);
  const [smartCard, setSmartCard] = useState("");
  const [selectDetails, setSelectDetails] = useState(null);
  const [email, setEmail] = useState("");
  const productDetails = useSelector((state) => state.someData.detail);
  const paymentIntent = useSelector((state) => state.paymentIntent);
  const [verifiedAccount, setVerifiedAccount] = useState(null);
  const [verifiedProducts, setVerifiedProducts] = useState(null);
  const [valueData, setValueData] = useState(null);

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

  const handleSubmit = (value, data) => {
    console.log("submitData", data);
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
    if (paymentIntent.success === true) {
      setLoading(false);
      // console.log("Data", valueData);

      let valueAmount =
        valueData === null ? "" : valueData["Subscription Amount"];
      let generalAmount = valueData === null ? "" : valueData.amount;

      let amounts =
        valueData === null
          ? ""
          : productDetails.billerCode === "DSTV1"
          ? valueAmount
          : generalAmount;
      let emails =
        valueData === null ? "" : valueData.referenceValues["Email Address"];
      const detail = {
        amount: amounts,
        email: emails,
        product: productDetails.productname,
        accountNumber:
          verifiedUser.result === null
            ? ""
            : verifiedUser.result.account.accountNumber,
        buttonClick: buttonValue,
        transRef: paymentIntent.detail.transRef,
        customerName:
          productDetails.billerCode === "DSTV1" && verifiedUser.result === null
            ? ""
            : verifiedUser.result.account.accountName,
      };

      dispatch(pay(detail));
      props.dataPay(true, "Cable");
    }
  }, [paymentIntent.success]);

  const handleSelect = (name, value) => {
    setSelectDetails(name);
  };

  const handleSmartCard = (e) => {
    setSmartCard(e.target.value);
  };

  const verifyMeterNumber = async () => {
    const details = {
      product: productDetails.productId,
      billerCode: productDetails.billerCode,
      accountNumber: smartCard,
      extras: {
        customerAccountType:
          selectDetails === null ? "" : selectDetails.ItemType,
        field1: "1",
        field2: null,
        field3: null,
      },
    };

    console.log(details);

    // const valueData = JSON.stringify(details);

    props.verifySmartcardNumber(details);
  };

  const SmartNumber = async (e) => {
    e.preventDefault();
    setLoading(true);
    let result = verifyMeterNumber();
  };

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  console.log(JSON.parse(productDetails.detail.productvalue).field3.options);

  // const Options =
  //   productDetails.billerCode === "DSTV1"
  //     ? JSON.parse(productDetails.detail.productvalue).field3.options
  //     : productDetails.billerCode === "GOTV1"
  //     ? JSON.parse(productDetails.detail.productvalue).field4.options
  //     : "";
  const Options =
    productDetails.billerCode === "DSTV1"
      ? JSON.parse(productDetails.detail.productvalue).field3.options
      : productDetails.billerCode === "GOTV1"
      ? JSON.parse(productDetails.detail.productvalue).field4.options
      : "";

  // const Options = JSON.parse(productDetails.detail.productvalue).field3.options

  // console.log(Options);

  const fieldsOption = [];
  for (const key in Options) {
    if (Options.hasOwnProperty(key)) {
      var value = Options[key];
      console.log(value);
      fieldsOption.push(value);
    }
  }

  const verifyNumber = JSON.parse(productDetails.detail.productvalue).field0;

  useEffect(() => {
    if (verifiedUser.verifySuccess === true) {
      setLoading(false);
      setVerifiedProducts(verifiedUser.result.product);
      setVerifiedAccount(verifiedUser.result.account);
      props.verify("Cable", true);
    }
  }, [verifiedUser.verifySuccess]);

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
            <div>
              {verifyUserdetails.onclick === false &&
              verifyUserdetails.name === "" ? (
                verifyNumber.text === "SmartCard Number" ||
                verifyNumber.text === "Smart Card Number" ? (
                  <>
                    {productDetails.billerCode !== "STARTIMES" ? (
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
                        {/* {productDetails.billerCode === "DSTV1" ? ( */}
                        <div className="d-flex justify-content-center">
                          <FormControl
                            variant="filled"
                            className="inputSize pt-3"
                          >
                            <InputLabel id="demo-simple-select-label">
                              Select Bouquet
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Bouquet"
                            >
                              {fieldsOption
                                ? fieldsOption.map((allData, index) => {
                                    const data = JSON.parse(allData);
                                    return (
                                      <MenuItem
                                        key={index}
                                        value={
                                          selectDetails === null
                                            ? ""
                                            : selectDetails["ItemName"]
                                        }
                                        onClick={(e) => handleSelect(data)}
                                      >
                                        {data.ItemName}
                                      </MenuItem>
                                    );
                                  })
                                : ""}
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
                      <>
                        <Startimes
                          disabledCard={disabledCard}
                          disabledUssd={disabledUssd}
                          handleSubmit={handleSubmit}
                        />
                      </>
                    )}
                  </>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>

          {verifyUserdetails.onclick === true &&
          verifyUserdetails.name === "Cable" ? (
            <div>
              <p className="text-center mb-5" style={{ color: "red" }}>
                N.B. Please select your current bouquet plan
              </p>
              {productDetails.billerCode === "DSTV1" ? (
                <Dstv
                  disabledCard={disabledCard}
                  disabledUssd={disabledUssd}
                  handleSubmit={handleSubmit}
                  amount={selectDetails === null ? "" : selectDetails.Amount}
                  packageType={
                    selectDetails === null ? "" : selectDetails.ItemType
                  }
                />
              ) : (
                ""
              )}
              {productDetails.billerCode === "GOTV1" ? (
                <Gotv
                  disabledCard={disabledCard}
                  disabledUssd={disabledUssd}
                  handleSubmit={handleSubmit}
                  amount={selectDetails === null ? "" : selectDetails.Amount}
                  packageType={
                    selectDetails === null ? "" : selectDetails.ItemType
                  }
                  packageName={
                    selectDetails === null ? "" : selectDetails.ItemName
                  }
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
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
