import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../_action/loading";
import {
  verifySmartcardNumber,
  clearVerified,
} from "../../../_action/verifyNumber";
import {
  MenuItem,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { PaymentIntent, clearPayment } from "../../../_action/Payment/index";
import { pay } from "../../../_action/Payment/paymentButtons";
import { clearErrors } from "../../../_action/errorAction";
import { verify } from "../../../_action/verify";
import "../../../css/input.css";
import Slide from "@material-ui/core/Slide";
import { FLUTTERWAVE_KEY } from "../PaymentProcess/hooks";
import axios from "axios";

function Cable(props) {
  const error = useSelector((state) => state.error);
  const verifiedUser = useSelector((state) => state.verify);
  const verifyUserdetails = useSelector((state) => state.verifyUserdetails);
  const [disabledCard, setDisabledCard] = useState(false);
  const [disabledUssd, setDisabledUssd] = useState(false);
  const [buttonValue, setButtonValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [smartCard, setSmartCard] = useState("");
  const [selectDetails, setSelectDetails] = useState(null);
  const productDetails = useSelector((state) => state.someData.detail);
  const [verifiedAccount, setVerifiedAccount] = useState(null);
  const [verifiedProducts, setVerifiedProducts] = useState(null);
  const [bouquet, setBouquet] = useState(null);
  const [selectName, setSelectName] = useState(null);

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

  useEffect(() => {
    const username = "reloadng";
    const password = "R3l0@dnG@2021";
    const config = {
      headers: {
        Authorization: "Basic " + btoa(`${username}:${password}`),
      },
    };
    axios
      .get(
        "http://204.8.207.124:8080/packages/biller/slug/GOTV",
        config
      )
      .then((res) => setBouquet(res.data.responseData))
      .catch((err) => console.log(err));
  }, []);

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

  const handleOthers = (e, name) => {
    const newValues = { ...smartCard };
    newValues[name] = e.target.value;
    setSmartCard(newValues);
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
      description: "Cable",
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

  const verifyMeterNumber = async () => {
    const details = {
      product: productDetails.productId,
      billerCode: "STARTIMES",
      accountNumber: smartCard.customerId,
      extras: {
        billerSlug: "STARTIMES",
        customerId: smartCard.customerId,
        productName: "STARTIMES_BASIC",
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
      <div>
        {verifyUserdetails.onclick === false &&
        verifyUserdetails.name === "" ? (
          <div>
            <div>
              <div>
                {fieldsArray.map((allFields, i) =>
                  allFields.text === "customerId" &&
                  allFields.lookup === true ? (
                    <div
                      key={i}
                      className="d-flex align-item-center justify-content-center pt-3"
                    >
                      <TextField
                        className="inputSize"
                        required
                        label={
                          allFields.text === "customerId"
                            ? "SmartCard Number"
                            : ""
                        }
                        onChange={(e) => handleOthers(e, allFields.text)}
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
                            ),
                        }}
                      />
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
                color="primary"
                className="p-3"
              >
                Verify
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}

        {verifyUserdetails.onclick === true &&
        verifyUserdetails.name === "Cable" ? (
          <div>
            <div className="d-flex align-item-center justify-content-center pt-3">
              <p className="mr-5">Customer Name:</p>
              <p>
                {verifiedUser.result === null
                  ? ""
                  : verifiedUser.result.account.accountName}
              </p>
            </div>
            <div className="d-flex align-item-center justify-content-center pt-3">
              <p className="mr-5">SmartCard Number:</p>
              <p>
                {verifiedUser.result === null
                  ? ""
                  : verifiedUser.result.account.accountNumber}
              </p>
            </div>
            {/* <div className="d-flex align-item-center justify-content-center pt-3">
              <p className="mr-5">Amount: </p>
              <p>
                {verifiedUser.result === null ? "" : verifiedUser.result.amount}
              </p>
            </div> */}

            {/* bouquet */}
            <div className="">
              <div className="pt-3">
                <div className="d-flex align-item-center justify-content-center">
                  <select
                    value={
                      selectDetails === null ? "" : selectDetails["amount"]
                    }
                    onChange={handleSelect}
                    className="p-3"
                    id="inputSize"
                    style={{ borderRadius: "3px" }}
                  >
                    <option>Select bouquet</option>
                    {bouquet === null
                      ? ""
                      : bouquet.map((allData, i) => (
                          <option value={allData.amount} key={i}>
                            {allData.name}
                          </option>
                        ))}
                  </select>
                </div>
              </div>
            </div>

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
                        allFields.text === "amount" ? (
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
          </div>
        ) : (
          ""
        )}

        {verifyUserdetails.onclick === true &&
        verifyUserdetails.name === "Cable" ? (
          // <div className="ButtonSide">
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
        ) : (
          ""
        )}
      </div>
      {/* </>
      )} */}
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
