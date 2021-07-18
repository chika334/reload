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
  const [smartCard, setSmartCard] = useState({
    email: "",
    phone: "",
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

  const handleOthers = (e) => {
    setSmartCard({
      ...smartCard,
      email: e.target.value,
      phone: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      props.location.state.productName === "Data" &&
      localStorage.token !== undefined
    ) {
      const newValuesObj = {
        amount: `${selectDetails.amount}`,
        channelRef: "web",
        description: "Cable",
        paymentMethod: "billpayflutter",
        productId: `${props.location.state.data.productId.id}`,
        referenceValues: {
          "E-mail": `${smartCard.email}`,
          "Product type": `${selectDetails.name}`,
          phone: phone,
        },
        references: ["E-mail", "Product type", "Phone Number"],
      };
      props.PaymentIntent(newValuesObj);
      props.pay(true, "Data");
    } else {
      props.history.push("/reloadng/registration");
    }
  };

  const item = JSON.parse(props.location.state.data.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

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

  const labels = JSON.parse(props.location.state.data.productvalue).field2
    .options;

  // console.log(labels);

  const fieldsOptions = [];
  for (const key in labels) {
    if (labels.hasOwnProperty(key)) {
      var value = labels[key];
      fieldsOptions.push(value);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {fieldsArray.map((allFields, i) =>
          allFields.select === true ? (
            <div
              key={i}
              className="d-flex align-item-center justify-content-center pt-3"
            >
              <TextField
                style={{ width: "50%" }}
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
                      onClick={(event) => handleSelect(allFields.text, detail)}
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
                style={{ width: "50%" }}
                required
                label={allFields.text}
                name={allFields.text}
                onChange={handleOthers}
                placeholder={`Enter ${allFields.text}`}
                type={allFields.text === "E-mail" ? "email" : "number"}
                // value={values[allFields.text]}
                disabled={allFields.text === "Amount" && disabled}
                value={
                  selectDetails.amount === undefined
                    ? ""
                    : allFields.text === "Amount"
                    ? selectDetails.amount
                    : values[allFields.text]
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
  );
}

export default withRouter(connect(null, { PaymentIntent })(NewForm));
