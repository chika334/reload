import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../_action/loading";
import {
  verifySmartcardNumber,
  clearVerified,
} from "../../../_action/verifyNumber";
import { TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { PaymentIntent, clearPayment } from "../../../_action/Payment/index";
import Alert from "@material-ui/lab/Alert";
import { pay } from "../../../_action/Payment/paymentButtons";
import { clearErrors } from "../../../_action/errorAction";
import { verify } from "../../../_action/verify";
import "../../../css/input.css";
// import Slide from "@material-ui/core/Slide";
import { USSD_KEY, FLUTTERWAVE_KEY } from "../PaymentProcess/hooks";
import NewFormData from "../../Form/NewFormData";

function Dstv(props) {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const verifiedUser = useSelector((state) => state.verify);
  const verifyUserdetails = useSelector((state) => state.verifyUserdetails);
  // const paymentButton = useSelector((state) => state.paymentButton);
  const [disabledCard, setDisabledCard] = useState(false);
  const [disabledUssd, setDisabledUssd] = useState(false);
  const [buttonValue, setButtonValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [open, setOpen] = React.useState(false);
  const [smartCard, setSmartCard] = useState("");
  const [selectDetails, setSelectDetails] = useState(null);
  const [email, setEmail] = useState("");
  const productDetails = useSelector((state) => state.someData.detail);
  const paymentIntent = useSelector((state) => state.paymentIntent);
  const [verifiedAccount, setVerifiedAccount] = useState(null);
  const [verifiedProducts, setVerifiedProducts] = useState(null);

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
        // setDisabledCard={setDisabledCard}
        slug="9mobile_VTU"
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
