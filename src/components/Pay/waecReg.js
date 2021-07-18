import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { PaymentIntent } from "../../_action/Payment";
import { connect } from "react-redux";
import { TextField, MenuItem, InputAdornment, Button } from "@material-ui/core";

function waecReg(props) {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState({
    "Amount Per Candidate": "",
  });
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    Email: "",
    "Number of Candidates": "",
    "Phone Number": "",
    Amount: "",
  });

  const handleSelect = (name, value) => {
    const newValues = { ...select };
    newValues[name] = value.ItemName;
    setSelect(newValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      props.location.state.data.productId.productname ===
        "Waec Exams Registration" &&
      localStorage.token !== undefined
    ) {
      if (values["Phone Number"].length < 11) {
        setError("Phone number must be 11 digits");
      } else {
        const total =
          select["Amount Per Candidate"] * values["Number of Candidates"];
        const newValuesObj = {
          amount: `${total}`,
          channelRef: "web",
          description: "Exams",
          paymentMethod: "billpayflutter",
          productId: `${props.location.state.data.productId.id}`,
          referenceValues: {
            Email: `${values["Email"]}`,
            "Phone Number": `${values["Phone Number"]}`,
          },
          references: ["Email", "Phone Number"],
        };

        props.PaymentIntent(newValuesObj);
        props.data(true, "Exams");
      }
    } else {
      props.history.push("/reloadng/registration");
    }
  };

  const handleSmartCard = (e, name) => {
    // console.log("daniel");
    const newValues = { ...values };
    newValues[name] = e.target.value;
    setValues(newValues);
  };

  const item = JSON.parse(props.location.state.data.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  const packages = JSON.parse(props.location.state.data.productvalue).field1
    .options;

  const fieldsOptions = [];
  for (const key in packages) {
    if (packages.hasOwnProperty(key)) {
      var value = packages[key];
      fieldsOptions.push(value);
    }
  }

  console.log(props);
  // console.log(fieldsArray);
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
        <form onSubmit={handleSubmit}>
          {fieldsArray.slice(1).map((allField, i) =>
            allField.select === true ? (
              <div
                key={i}
                className="d-flex align-item-center justify-content-center pt-3"
              >
                <TextField
                  // style={{ width: "50%" }}
                  className="inputSize"
                  required
                  label={allField.text}
                  name={allField.text}
                  placeholder={`Enter ${allField.text}`}
                  select
                  type="text"
                  // value={values[allField.text]}
                  // value={select[`${allField.text}`]}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₦</InputAdornment>
                    ),
                  }}
                >
                  <MenuItem>Select Data Type</MenuItem>
                  {fieldsOptions.map((option, index) => {
                    const detail = JSON.parse(option);
                    return (
                      <MenuItem
                        key={index}
                        value={detail.ItemName}
                        // value={select["Amount Per Candidate"]}
                        onClick={(e) => handleSelect(allField.text, detail)}
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
          {fieldsArray.slice(2, 5).map((allField, i) => (
            <div
              key={i}
              className="d-flex align-item-center justify-content-center pt-3"
            >
              <TextField
                required
                // style={{ width: "50%" }}
                className="inputSize"
                label={`${allField.text}`}
                name={`${allField.text}`}
                onChange={(e) => handleSmartCard(e, allField.text)}
                placeholder={`Enter ${allField.text}`}
                type={allField.text === "Email" ? "email" : "number"}
                variant="outlined"
                value={values[allField.text]}
              />
            </div>
          ))}
          {fieldsArray.slice(0, 1).map((allField, i) => (
            <div
              key={i}
              className="d-flex align-item-center justify-content-center pt-3"
            >
              <TextField
                required
                // style={{ width: "50%" }}
                className="inputSize"
                label={`${allField.text}`}
                name={`${allField.text}`}
                // onChange={(e) => handleSmartCard(e, allField.text)}
                placeholder={`Enter ${allField.text}`}
                type="number"
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₦</InputAdornment>
                  ),
                }}
                variant="outlined"
                value={
                  select["Amount Per Candidate"] *
                  values["Number of Candidates"]
                }
              />
            </div>
          ))}
          <div className="d-flex align-item-center justify-content-center pt-3">
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
              Submit
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default withRouter(connect(null, { PaymentIntent })(waecReg));
