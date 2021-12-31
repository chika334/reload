import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../../_action/loading";
import {
  verifySmartcardNumber,
  clearVerified,
} from "../../../_action/verifyNumber";
import { PaymentIntent, clearPayment } from "../../../_action/Payment/index";
import { pay } from "../../../_action/Payment/paymentButtons";
import { clearErrors } from "../../../_action/errorAction";
import { verify } from "../../../_action/verify";
import "../../../css/input.css";
// import { FLUTTERWAVE_KEY } from "../PaymentProcess/hooks";
import NewFormData from "../../Form/NewFormData";

function Dstv(props) {
  const [setDisabledCard] = useState(false);
  const productDetails = useSelector((state) => state.someData.detail);

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  return (
    <div className="property-details-area">
      <NewFormData
        product="Airtime"
        disabledCard={props.disabledCard}
        setDisabledCard={setDisabledCard}
        slug="AIRTEL_VTU" 
        // dataPay={props.dataPay}
      />
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
  })(Dstv)
);
