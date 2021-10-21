import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { PaymentIntent } from "../../_action/Payment";
// import { DataOptionSelect } from "../../components/jsonData/DataSelectOption";
import Alert from "@material-ui/lab/Alert";
import { pay } from "../../_action/Payment/paymentButtons";
import "../../css/input.css";
import { useUSSD } from "../CoralUssd";
// import CoralUssd from "../CoralUssd/App";
import { USSD_KEY, FLUTTERWAVE_KEY } from "./PaymentProcess/hooks";
import { loginRediectSuccess } from "../../_action/LoginRedirect";
// import Slide from "@material-ui/core/Slide";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

function NewForm(props) {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const [disabledCard, setDisabledCard] = useState(false);
  const [disabledUssd, setDisabledUssd] = useState(false);
  const [buttonValue, setButtonValue] = useState(null);
  // const verifyDetails = useSelector((state) => state.verify);
  // const [verifyEnabled, setVerifiedEnabled] = useState(false);
  const paymentIntent = useSelector((state) => state.paymentIntent);
  const productDetails = useSelector((state) => state.someData.detail);
  const [paymentMethod, setPaymentMethod] = useState("");
  // const [disable, setDisable] = React.useState(false);
  const user = useSelector((state) =>
    state.authUser.user === null ? "" : state.authUser.user
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [selectDetails, setSelectDetails] = useState({});
  const [smartCard, setSmartCard] = useState({
    Email: "",
    "Phone Number": "",
    Amount: "",
  });
  const [amount, setAmount] = useState("");
  const [detailValues, setDetailValues] = useState({
    values: {},
    mainValues: {
      description: "",
      amount: "",
      price: 0,
    },
  });

  const { isModalOpen, toggleIt } = useUSSD();

  const { phone, email, Amount } = smartCard;
  const { values, mainValues } = detailValues;

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

    if (productDetails.productname === "Airtime") {
      if (productDetails.billerCode === "airtel") {
        setPaymentMethod(value);
        if (smartCard["Phone Number"].length < 11) {
          setError("Phone number must be 11 digits");
        } else {
          const newValuesObj = {
            amount: `${Amount}`,
            channelRef: "web",
            description: "Airtime",
            email: `${smartCard["Email"]}`,
            paymentMethod:
              value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
            productId: `${productDetails.productId}`,
            referenceValues: {
              Email: `${smartCard["Email"]}`,
              "Product Type": "AIRTEL-VTU",
              "Phone Number": `${smartCard["Phone Number"]}`,
            },
            references: ["Email", "Phone Number", "Product Type"],
          };

          props.PaymentIntent(newValuesObj);
        }
      } else if (productDetails.billerCode === "mtn") {
        if (smartCard["Phone Number"].length < 11) {
          setError("Phone number must be 11 digits");
        } else {
          const newValuesObj = {
            amount: `${Amount}`,
            channelRef: "web",
            email: `${smartCard["Email"]}`,
            description: "Airtime",
            paymentMethod:
              value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
            productId: `${productDetails.productId}`,
            referenceValues: {
              Email: `${smartCard["Email"]}`,
              // Email: user.user.email,
              Product: "AIRTIME",
              "Phone Number": `${smartCard["Phone Number"]}`,
            },
            references: ["Email", "Phone Number", "Product"],
          };

          props.PaymentIntent(newValuesObj);
        }
      } else if (productDetails.billerCode === "9MOBILEAIRTIME") {
        if (smartCard["Phone Number"].length < 11) {
          setError("Phone number must be 11 digits");
        } else {
          const newValuesObj = {
            amount: `${Amount}`,
            channelRef: "web",
            description: "Airtime",
            email: `${smartCard["Email"]}`,
            paymentMethod:
              value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
            productId: `${productDetails.productId}`,
            referenceValues: {
              Email: `${smartCard["Email"]}`,
              // Email: user.user.email,
              Product: "AIRTIME",
              "Phone Number": `${smartCard["Phone Number"]}`,
            },
            references: ["Email", "Phone Number", "Product"],
          };

          props.PaymentIntent(newValuesObj);
        }
      } else if (productDetails.billerCode === "glo") {
        if (smartCard["Phone Number"].length < 11) {
          setError("Phone number must be 11 digits");
        } else {
          const newValuesObj = {
            amount: `${Amount}`,
            channelRef: "web",
            email: `${smartCard["Email"]}`,
            description: "Airtime",
            paymentMethod:
              value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
            productId: `${productDetails.productId}`,
            referenceValues: {
              Email: `${smartCard["Email"]}`,
              // Email: user.user.email,
              Product: "AIRTIME",
              "Phone Number": `${smartCard["Phone Number"]}`,
            },
            references: ["Email", "Phone Number", "Product"],
          };

          props.PaymentIntent(newValuesObj);
        }
      }
    } else {
      console.log("error");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (paymentIntent.success === true) {
      // pro
      setLoading(false);
      // const amount = selectDetails.amount;
      const detail = {
        amount: Amount,
        email: `${smartCard["Email"]}`,
        product: productDetails.productname,
        buttonClick: buttonValue,
        transRef: paymentIntent.detail.transRef,
        customerName: `${smartCard["Phone Number"]}`,
      };

      dispatch(pay(detail));
      props.dataPay(true, "Airtime");
    }
  }, [paymentIntent.success]);

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  return (
    <div>
      {loading === true ? (
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
                allFields.select !== true ? (
                  <div
                    key={i}
                    className="d-flex align-item-center justify-content-center pt-3"
                  >
                    <TextField
                      className="inputSize"
                      required
                      label={allFields.text}
                      name={allFields.text}
                      onChange={(e) => handleOthers(e, allFields.text)}
                      placeholder={`Enter ${allFields.text}`}
                      type={allFields.text === "Email" ? "email" : "number"}
                      value={smartCard[allFields.text]}
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
            </div>
            <div className="ButtonSide">
              <div>
                {disabledCard === true ? (
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
                      window.location.href = `/${process.env.REACT_APP_RELOADNG}/product-details`;
                    }}
                  >
                    Go Back
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={(e) => {
                        handleSubmit(USSD_KEY);
                        // setDisabledUssd(true);
                      }}
                      value={USSD_KEY}
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
                    </button>{" "}
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

export default withRouter(
  connect(null, { PaymentIntent, loginRediectSuccess })(NewForm)
);
