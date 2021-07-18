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
import '../../css/input.css'

function NewForm(props) {
  // const dispatch1 = useDispatch();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const verifyDetails = useSelector((state) => state.verify);
  const [verifyEnabled, setVerifiedEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [valuesDetails, setValuesDetails] = useState([]);
  const paymentIntent = useSelector((state) => state.paymentIntent);
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

  console.log(props.location.state.data.billerCode);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      props.location.state.productName === "Data" &&
      localStorage.token !== undefined
    ) {
      // console.log(smartCard["Phone Number"].length);
      if (props.location.state.data.billerCode === "airtel-data") {
        if (smartCard["Phone Number"].length < 11) {
          setError("Phone number must be 11 digits");
          // return
        } else {
          const newValuesObj = {
            amount: `${selectDetails.amount}`,
            channelRef: "web",
            description: "Data",
            paymentMethod: "billpayflutter",
            productId: `${props.location.state.data.productId.id}`,
            referenceValues: {
              "E-mail": `${smartCard["E-mail"]}`,
              "Product Type": `${selectDetails.id}`,
              "Phone Number": `${smartCard["Phone Number"]}`,
            },
            references: ["E-mail", "Product Type", "Phone Number"],
          };

          // console.log(newValuesObj);
          props.PaymentIntent(newValuesObj);
          // props.pay(true, "Data");
        }
      } else if (props.location.state.data.billerCode === "glo-data") {
        if (smartCard["Phone Number"].length < 11) {
          setError("Phone number must be 11 digits");
          // return
        } else {
          const newValuesObj = {
            amount: `${selectDetails.amount}`,
            channelRef: "web",
            description: "Data",
            paymentMethod: "billpayflutter",
            productId: `${props.location.state.data.productId.id}`,
            referenceValues: {
              "E-mail": `${smartCard["E-mail"]}`,
              "Product Type": `${selectDetails.id}`,
              "Phone Number": `${smartCard["Phone Number"]}`,
            },
            references: ["E-mail", "Product Type", "Phone Number"],
          };

          // console.log(newValuesObj);
          props.PaymentIntent(newValuesObj);
        }
      } else if (props.location.state.data.billerCode === "data") {
        if (smartCard["Phone Number"].length < 11) {
          setError("Phone number must be 11 digits");
          // return
        } else {
          const newValuesObj = {
            amount: `${selectDetails.amount}`,
            channelRef: "web",
            description: "Data",
            paymentMethod: "billpayflutter",
            productId: `${props.location.state.data.productId.id}`,
            referenceValues: {
              "Email": `${smartCard["Email"]}`,
              "Product type": `${selectDetails.id}`,
              "Phone Number": `${smartCard["Phone Number"]}`,
            },
            references: ["Email", "Product type", "Phone Number"],
          };

          // console.log(newValuesObj);
          props.PaymentIntent(newValuesObj);
        }
      } else if(props.location.state.data.billerCode === "9mobiledata1") {
        if (smartCard["Phone Number"].length < 11) {
          setError("Phone number must be 11 digits");
          // return
        } else {
          const newValuesObj = {
            amount: `${selectDetails.amount}`,
            channelRef: "web",
            description: "Data",
            paymentMethod: "billpayflutter",
            productId: `${props.location.state.data.productId.id}`,
            referenceValues: {
              Email: `${smartCard["Email"]}`,
              "Product": `${selectDetails.id}`,
              "Phone Number": `${smartCard["Phone Number"]}`,
            },
            references: ["Email", "Product", "Phone Number"],
          };

          // console.log(newValuesObj);
          props.PaymentIntent(newValuesObj);
        }
      }
    } else {
      props.history.push("/reloadng/registration");
    }
  };

  useEffect(() => {
    if (paymentIntent.success === true) {
      // pro
      setLoading(false);
      const amount = selectDetails.amount;
      const detail = {
        amount: amount,
        email: `${
          props.location.state.data.billerCode === "data"
            ? smartCard["Email"]
            : props.location.state.data.billerCode === "glo-data"
            ? smartCard["E-mail"]
            : props.location.state.data.billerCode === "airtel-data"
            ? smartCard["E-mail"]
            : props.location.state.data.billerCode === "9mobiledata1"
            ? smartCard["Email"]
            : ""
        }`,
        transRef: paymentIntent.detail.transRef,
        customerName: `${smartCard["Phone Number"]}`,
      };

      console.log(detail);
      dispatch(pay(detail));
      props.dataPay(true, "Data");
    }
  }, [paymentIntent.success]);

  const item = JSON.parse(props.location.state.data.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  const fieldsOptions = [];
  if (item.field3.select === true) {
    const data = item.field3.options;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        var value = data[key];
        fieldsOptions.push(value);
        // setValuesDetails(...valuesDetails, value);
      }
    }
  } else if (item.field2.select === true) {
    const data = item.field2.options;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        var value = data[key];
        fieldsOptions.push(value);
        // setValuesDetails(...valuesDetails, value);
      }
    }
  }

  console.log(item);

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

  return (
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
          <form onSubmit={handleSubmit}>
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
                  ""
                )
              )}
            </div>
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
          </form>
        </>
      )}
    </div>
  );
}

export default withRouter(connect(null, { PaymentIntent })(NewForm));
