import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
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
import mtn from "./jsonData/mtn.json";
import NewFormData from "../../Form/NewFormData";

function Mtn(props) {
  const [disabledCard, setDisabledCard] = useState(false);
  const productDetails = useSelector((state) => state.someData.detail);

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  return (
    <div className="property-details-area">
      <NewFormData
        product="Data"
        disabledCard={props.disabledCard}
        setDisabledCard={setDisabledCard}
        slug="GLO_VTU"
        productData={mtn}
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
  })(Mtn)
);
