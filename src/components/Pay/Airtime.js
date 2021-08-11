import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { PaymentIntent } from "../../_action/Payment";
import { DataOptionSelect } from "../../components/jsonData/DataSelectOption";
import Alert from "@material-ui/lab/Alert";
import { pay } from "../../_action/Payment/paymentButtons";
import "../../css/input.css";
import { loginRediectSuccess } from "../../_action/LoginRedirect";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NewForm(props) {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const verifyDetails = useSelector((state) => state.verify);
  const [verifyEnabled, setVerifiedEnabled] = useState(false);
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
  const [detailValues, setDetailValues] = useState({
    values: {},
    mainValues: {
      description: "",
      amount: "",
      price: 0,
    },
  });

  const { phone, email, Amount } = smartCard;
  const { values, mainValues } = detailValues;

  const handleOthers = (e, name) => {
    const newValues = { ...smartCard };
    newValues[name] = e.target.value;
    setSmartCard(newValues);
  };

  const handleSelect = (name, value) => {
    setSelectDetails(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    const value = e.target.value;
    setLoading(true);
    if (
      productDetails.productname === "Airtime"
    ) {
      if (value === "card") {
        setDisabled(true);
      } else if (value === "ussd") {
        setDisabled(true);
      }

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
              value === "card" ? "billpayflutter" : "billpaycoralpay",
            productId: `${productDetails.productId}`,
            referenceValues: {
              Email: `${smartCard["Email"]}`,
              // Email: user.user.email,
              "Product Type": selectDetails.ItemName,
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
              value === "card" ? "billpayflutter" : "billpaycoralpay",
            productId: `${productDetails.productId}`,
            referenceValues: {
              Email: `${smartCard["Email"]}`,
              // Email: user.user.email,
              Product: selectDetails.ItemName,
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
              value === "card" ? "billpayflutter" : "billpaycoralpay",
            productId: `${productDetails.productId}`,
            referenceValues: {
              Email: `${smartCard["Email"]}`,
              // Email: user.user.email,
              Product: selectDetails.ItemName,
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
              value === "card" ? "billpayflutter" : "billpaycoralpay",
            productId: `${productDetails.productId}`,
            referenceValues: {
              Email: `${smartCard["Email"]}`,
              // Email: user.user.email,
              Product: selectDetails.ItemName,
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
        // email: user.user.email,
        transRef: paymentIntent.detail.transRef,
        customerName: `${smartCard["Phone Number"]}`,
      };

      // console.log(detail);
      dispatch(pay(detail));
      props.dataPay(true, "Airtime");
    }
  }, [paymentIntent.success]);

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  const packages = JSON.parse(productDetails.detail.productvalue).field3
    .options;

  const fieldsOptions = [];
  for (const key in packages) {
    if (packages.hasOwnProperty(key)) {
      var value = packages[key];
      fieldsOptions.push(value);
    }
  }

  console.log(paymentMethod);

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
                  // allFields.text === "Email" ? (
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
                      type={allFields.text === "Email" ? "email" : "number"}
                      // type="number"
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
                  // )
                  ""
                )
              )}
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
                      select
                      onChange={(e) => handleOthers(e, allFields.text)}
                      placeholder={`Enter ${allFields.text}`}
                      // type={allFields.text === "Email" ? "email" : "number"}
                      value={smartCard[allFields.text]}
                      variant="outlined"
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
            </div>
            <div className="ButtonSide">
              <div>
                <button
                  disabled={disabled}
                  onClick={(e) => handleSubmit(e)}
                  type="submit"
                  value="card"
                  style={{
                    backgroundColor: "#fda94f",
                    color: "#000",
                    fontSize: "12px",
                    padding: "9px",
                  }}
                >
                  Proceed with Card
                </button>
              </div>
              <div>
                <button
                  disabled={disabled}
                  onClick={(e) => handleSubmit(e)}
                  value="ussd"
                  type="submit"
                  style={{
                    backgroundColor: "#fda94f",
                    color: "#000",
                    fontSize: "12px",
                    padding: "9px",
                  }}
                >
                  Proceed with USSD
                </button>
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
