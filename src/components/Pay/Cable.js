import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../_action/loading";
import {
  verifySmartcardNumber,
  clearVerified,
} from "../../_action/verifyNumber";
import {
  MenuItem,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@material-ui/core";
import { PaymentIntent, clearPayment } from "../../_action/Payment/index";
import Alert from "@material-ui/lab/Alert";
import { pay } from "../../_action/Payment/paymentButtons";
import { clearErrors } from "../../_action/errorAction";
import { verify } from "../../_action/verify";
import "../../css/input.css";
import Dstv from "./Cable/Dstv";
import Gotv from "./Cable/Gotv";
import Startimes from "./Cable/Startimes";

function Cable(props) {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const verifiedUser = useSelector((state) => state.verify);
  const verifyUserdetails = useSelector((state) => state.verifyUserdetails);
  const [disabledCard, setDisabledCard] = useState(false);
  const [disabledUssd, setDisabledUssd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [smartCard, setSmartCard] = useState("");
  const [selectDetails, setSelectDetails] = useState(null);
  const productDetails = useSelector((state) => state.someData.detail);
  const paymentIntent = useSelector((state) => state.paymentIntent);
  const [buttonValue, setButtonValue] = useState(null);
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
    setLoading(true);
    setButtonValue(value);
    setValueData(data);
    if (value === "FLUTTERWAVE") {
      setDisabledCard(true);
    } else if (value === "USSD") {
      setDisabledUssd(true);
    }

    props.PaymentIntent(data);
  };

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

  const Options =
    productDetails.billerCode === "DSTV1"
      ? JSON.parse(productDetails.detail.productvalue).field3.options
      : productDetails.billerCode === "GOTV1"
      ? JSON.parse(productDetails.detail.productvalue).field4.options
      : "";

  const fieldsOption = [];
  for (const key in Options) {
    if (Options.hasOwnProperty(key)) {
      var value = Options[key];
      // console.log(value);
      fieldsOption.push(value);
    }
  }

  const verifyNumber = JSON.parse(productDetails.detail.productvalue).field0;

  useEffect(() => {
    if (verifiedUser.verifySuccess === true) {
      setLoading(false);
      // setVerifiedProducts(verifiedUser.result.product);
      // setVerifiedAccount(verifiedUser.result.account);
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
                                        value={data.ItemName}
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
                      ""
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
          {productDetails.billerCode === "STARTIMES" ? (
            <Startimes
              disabledCard={disabledCard}
              disabledUssd={disabledUssd}
              handleSubmit={handleSubmit}
              setLoading={setLoading}
            />
          ) : (
            ""
          )}

          {productDetails.billerCode === "GOTV" ? (
            <>
              <p className="text-center mb-2" style={{ color: "red" }}>
                N.B. Please select your current bouquet plan
              </p>
              <Gotv
                disabledCard={disabledCard}
                disabledUssd={disabledUssd}
                handleSubmit={handleSubmit}
                setLoading={setLoading}
              />
            </>
          ) : (
            ""
          )}

          {/* {verifyUserdetails.onclick === true &&
          verifyUserdetails.name === "Cable" ? (
            <div> */}
          {productDetails.billerCode === "DSTV" ? (
            <>
              <p className="text-center mb-2" style={{ color: "red" }}>
                N.B. Please select your current bouquet plan
              </p>
              <Dstv
                disabledCard={disabledCard}
                disabledUssd={disabledUssd}
                dataPay={props.dataPay}
                setLoading={setLoading}
                handleSubmit={handleSubmit}
                amount={selectDetails === null ? "" : selectDetails.Amount}
                packageType={
                  selectDetails === null ? "" : selectDetails.ItemType
                }
              />
            </>
          ) : (
            ""
          )}
          {/* </div>
          ) : (
            ""
          )} */}
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
