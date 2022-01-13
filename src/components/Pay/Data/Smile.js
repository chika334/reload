import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../../_action/loading";
import {
  verifySmartcardNumber,
  clearVerified,
} from "../../../_action/verifyNumber";
// import { TextField, Button } from "@material-ui/core";
// import InputAdornment from "@material-ui/core/InputAdornment";
import { PaymentIntent, clearPayment } from "../../../_action/Payment/index";
// import Alert from "@material-ui/lab/Alert";
import { pay } from "../../../_action/Payment/paymentButtons";
import { clearErrors } from "../../../_action/errorAction";
import { verify } from "../../../_action/verify";
import "../../../css/input.css";
// import { USSD_KEY, FLUTTERWAVE_KEY } from "./PaymentProcess/hooks";
// import axios from "axios";
import NewFormData from "../../Form/NewFormData";
import smile from "../Data/jsonData/smile.json";

function Smile(props) {
  const [loading, setLoading] = useState(false)
  const verifiedUser = useSelector((state) => state.verify);
  const verifyUserdetails = useSelector((state) => state.verifyUserdetails);
  const [disabledCard, setDisabledCard] = useState(false);
  const productDetails = useSelector((state) => state.someData.detail);

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  useEffect(() => {
    if (verifiedUser.verifySuccess === true) {
      setLoading(false);
      props.verify("Data", true);
    }
  }, [verifiedUser.verifySuccess]);

  return (
    <div className="property-details-area">
      {verifyUserdetails.onclick === false && verifyUserdetails.name === "" ? (
        <NewFormData
          // product="Airt"
          disabledCard={props.disabledCard}
          setDisabledCard={setDisabledCard}
          slug="SMILE"
          productData={smile}
        />
      ) : (
        ""
      )}

      {verifyUserdetails.onclick === true &&
      verifyUserdetails.name === "Data" ? (
        <>
          {/* <div className="d-flex align-item-center justify-content-center pt-3">
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
          </div> */}
          <NewFormData
            product="Data"
            disabledCard={props.disabledCard}
            setDisabledCard={setDisabledCard}
            slug="SMILE"
            productData="null"
          />
        </>
      ) : (
        ""
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
  })(Smile)
);
