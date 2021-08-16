import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { PaymentIntent } from "../../_action/Payment";
import { connect, useSelector } from "react-redux";
import { TextField, MenuItem, InputAdornment, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function waecReg(props) {
  const [open, setOpen] = useState(false);
  const productDetails = useSelector((state) => state.someData.detail);
  const user = useSelector((state) =>
    state.authUser.user === null ? "" : state.authUser.user
  );
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
      productDetails.productname ===
      "Waec Exams Registration"
      //   &&
      // localStorage.token !== undefined
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
          productId: `${productDetails.productId}`,
          referenceValues: {
            Email: `${values["Email"]}`,
            // Email: user.user.email,
            "Phone Number": `${values["Phone Number"]}`,
          },
          references: ["Email", "Phone Number"],
        };

        props.PaymentIntent(newValuesObj);
        props.data(true, "Exams");
      }
    } else {
      // setLoading(false);
      // // const path = `${props.location.pathname}${props.location.search}`;
      // // props.loginRediectSuccess(path, productDetails.detail);
      // // props.history.push("/registration");
      // setOpen(true);
    }
  };

  const handleSmartCard = (e, name) => {
    // console.log("daniel");
    const newValues = { ...values };
    newValues[name] = e.target.value;
    setValues(newValues);
  };

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  // const packages = JSON.parse(productDetails.detail.productvalue).field1
  //   .options;

  // const fieldsOptions = [];
  // for (const key in packages) {
  //   if (packages.hasOwnProperty(key)) {
  //     var value = packages[key];
  //     fieldsOptions.push(value);
  //   }
  // }

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegRedirect = () => {
    props.history.push("/registration");
  };

  return (
    <div>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Welcome to reload.ng"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Please sign-in to process payment.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              cancel
            </Button>
            <Button onClick={handleRegRedirect} color="primary">
              ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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
          {fieldsArray.slice(2, 5).map(
            (allField, i) => (
              // allField.text === "Email" ? (
              //   ""
              // ) : (
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
            )
            // )
          )}
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
