import React, { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { verify } from "../../../_action/verify";
// import InputAdornment from "@material-ui/core/InputAdornment";
import {
  verifySmartcardNumber,
  // clearVerified,
} from "../../../_action/verifyNumber";
import { withRouter } from "react-router-dom";
import VerifyDetails from "../PaymentProcess/verifyDetails";
import { USSD_KEY, FLUTTERWAVE_KEY } from "../PaymentProcess/hooks";

function Smile(props) {
  const verifiedUser = useSelector((state) => state.verify);
  const productDetails = useSelector((state) => state.someData.detail);
  const verifyUserdetails = useSelector((state) => state.verifyUserdetails);
  const [verifiedAccount, setVerifiedAccount] = useState(null);
  const [verifiedProducts, setVerifiedProducts] = useState(null);
  const [smileNumber, setSmileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [smartCard, setSmartCard] = useState({
    Email: "",
  });
  const [selectDetails, setSelectDetails] = useState({
    id: "",
    amount: "",
    name: "",
  });
  const [detailValues, setDetailValues] = useState({
    values: {},
    mainValues: {
      description: "",
      amount: "",
      price: 0,
    },
  });

  const { values, mainValues } = detailValues;

  const handleSmartCard = (e) => {
    setSmileNumber(e.target.value);
  };

  // console.log(selectDetails);

  const handleSelect = (e) => {
    console.log(e.target.value);
    setSelectDetails({
      ...selectDetails,
      amount: e.target.value,
    });
  };

  const handleOthers = (e, name) => {
    const newValues = { ...smartCard };
    newValues[name] = e.target.value;
    setSmartCard(newValues);
  };

  const verifyMeterNumber = async () => {
    const details = {
      product: productDetails.productId,
      accountNumber: smileNumber,
      extras: {
        billerCode: productDetails.billerCode,
        field1: null,
        field2: null,
      },
    };

    props.verifySmartcardNumber(details);
  };

  const handleSubmit = (value) => {
    const newValuesObj = {
      amount: `${selectDetails.amount}`,
      channelRef: "web",
      description: "Data",
      // paymentMethod: "billpayflutter",
      paymentMethod:
        value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
      productId: `${productDetails.productId}`,
      referenceValues: {
        accountNumber: smileNumber,
        Email: `${smartCard["Email"]}`,
        Product: `${selectDetails.id}`,
      },
      references: ["accountNumber", "Email", "Product"],
    };

    // console.log(newValuesObj);

    props.handleSubmit(value, newValuesObj);
  };

  const SmartNumber = async (e) => {
    e.preventDefault();
    setLoading(true);
    let result = verifyMeterNumber();
  };

  useEffect(() => {
    if (verifiedUser.verifySuccess === true) {
      setLoading(false);
      setVerifiedProducts(verifiedUser.result.product);
      setVerifiedAccount(verifiedUser.result.account);
      props.verify("SPECTRANET", true);
    }
  }, [verifiedUser.verifySuccess]);

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  // console.log(item);

  const fieldsOptions = [];

  if (item.field3) {
    if (item.field3.select === true) {
      const data = item.field3.options;
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          var value = data[key];
          fieldsOptions.push(value);
        }
      }
    }
  }
  if (item.field2) {
    if (item.field2.select === true) {
      const data = item.field2.options;
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          var value = data[key];
          fieldsOptions.push(value);
        }
      }
    }
  }

  return (
    <div>
      <div>
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
              <VerifyDetails
                billerCode="SPECTRANET"
                productName="SPECTRANET"
                billerSlug="SPECTRANET"
                productType="Data"
                setLoading={props.setLoading}
              />
              {/* {verifyUserdetails.onclick === false &&
              verifyUserdetails.name === "" ? (
                <>
                  <div className="d-flex align-item-center justify-content-center">
                    <TextField
                      required
                      className="inputSize"
                      label="Customer Id"
                      name="smileNumber"
                      onChange={handleSmartCard}
                      placeholder={`Enter Customer Id`}
                      type="number"
                      variant="outlined"
                      value={smileNumber}
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
              )} */}
            </div>
            {verifyUserdetails.onclick === true &&
            verifyUserdetails.name === "SPECTRANET" ? (
              <div className="d-flex align-item-center justify-content-center">
                <div className="inputSize text-right allnew">
                  <p>Account Name</p>
                  <p
                    style={{
                      display: "flex",
                      right: 0,
                      marginLeft: "20px",
                    }}
                  >
                    {verifiedUser
                      ? JSON.parse(verifiedUser.result.account.accountName)
                          .firstname +
                        "  " +
                        JSON.parse(verifiedUser.result.account.accountName)
                          .lastname
                      : ""}
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
            {verifyUserdetails.onclick === true &&
            verifyUserdetails.name === "SPECTRANET" ? (
              <div>
                <div className="d-flex align-item-center justify-content-center pt-3">
                  <TextField
                    className="inputSize"
                    required
                    label="Email"
                    name="Email"
                    onChange={(e) => handleOthers(e, "Email")}
                    placeholder={`Enter Email`}
                    type="email"
                    value={smartCard["Email"]}
                    variant="outlined"
                  />
                </div>
                <div className="d-flex align-item-center justify-content-center pt-3">
                  <TextField
                    className="inputSize"
                    required
                    label="Amount"
                    name="amount"
                    onChange={(e) => handleSelect(e, "amount")}
                    placeholder={`Enter Amount`}
                    type="number"
                    value={selectDetails["amount"]}
                    variant="outlined"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            {verifyUserdetails.onclick === true &&
            verifyUserdetails.name === "SPECTRANET" &&
            productDetails.billerCode === "SPECTRANET" ? (
              <div className="ButtonSide">
                <div>
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
                          props.disabledUssd === true
                            ? "not-allowed"
                            : "pointer",
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
                <div>
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
                        // className="btn"
                        value={USSD_KEY}
                        onClick={(e) => {
                          // e.preventDefault();
                          handleSubmit(USSD_KEY);
                        }}
                        style={{
                          backgroundColor: "#fda94f",
                          cursor:
                            props.disabledCard === true
                              ? "not-allowed"
                              : "pointer",
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
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default withRouter(
  connect(null, { verifySmartcardNumber, verify })(Smile)
);
