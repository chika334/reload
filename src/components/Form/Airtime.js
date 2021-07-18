import React, { useState, useEffect } from "react";
import { MenuItem, TextField, Button } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { PaymentIntent } from "../../_action/Payment";
import { DataOptionSelect } from "../../components/jsonData/DataSelectOption";

function NewForm(props) {
  const [disabled, setDisabled] = useState(false);
  const verifyDetails = useSelector((state) => state.verify);
  const [verifyEnabled, setVerifiedEnabled] = useState(false);
  const [error, setError] = useState("");
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

  // console.log(smartCard);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      props.location.state.productName === "Airtime" &&
      localStorage.token !== undefined
    ) {
      if (smartCard["Phone Number"] < 11) {
        // setError("Phone number must be 11 digits");
        // return
        console.log("bad");
      } else {
        const newValuesObj = {
          amount: `${Amount}`,
          channelRef: "web",
          description: "Airtime",
          paymentMethod: "billpayflutter",
          productId: `${props.location.state.data.productId.id}`,
          referenceValues: {
            Email: `${email}`,
            "Phone Number": `${smartCard["Phone Number"]}`,
          },
          references: ["Email", "Phone Number"],
        };
        // console.log(newValuesObj);
        props.PaymentIntent(newValuesObj);
        props.pay(true, "Airtime");
      }
    } else {
      props.history.push("/reloadng/registration");
    }
  };

  const item = JSON.parse(props.location.state.data.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>{error && <Alert severity="error">{error}</Alert>}</p>
      <div>
        {fieldsArray.map((allFields, i) =>
          allFields.select !== true ? (
            <div
              key={i}
              className="d-flex align-item-center justify-content-center pt-3"
            >
              <TextField
                style={{ width: "50%" }}
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
  );
}

export default withRouter(connect(null, { PaymentIntent })(NewForm));
