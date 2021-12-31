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
import Slide from "@material-ui/core/Slide";
// import gotv from "./jsonData/gotv.json";
import NewFormData from "../../Form/NewFormData";
import VerifyDetails from "../PaymentProcess/verifyDetails";

function Cable(props) {
  const verifiedUser = useSelector((state) => state.verify);
  const verifyUserdetails = useSelector((state) => state.verifyUserdetails);
  const [disabledCard, setDisabledCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [smartCard, setSmartCard] = useState("");
  const productDetails = useSelector((state) => state.someData.detail);

  const handleOthers = (e, name) => {
    const newValues = { ...smartCard };
    newValues[name] = e.target.value;
    setSmartCard(newValues);
  };

  const item = JSON.parse(productDetails.detail.productvalue).field4.options
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  // console.log(fieldsArray);

  useEffect(() => {
    if (verifiedUser.verifySuccess === true) {
      setLoading(false);
      props.verify("Electricity", true);
    }
  }, [verifiedUser.verifySuccess]);

  return (
    <div className="property-details-area">
      <div>
        {verifyUserdetails.onclick === false &&
        verifyUserdetails.name === "" ? (
          <div>
            <VerifyDetails
              billerCode="ENUGU_DISCO"
              productName={fieldsArray}
              billerSlug="ENUGU_DISCO"
              productType="Electricity"
              setLoading={props.setLoading}
            />
          </div>
        ) : (
          ""
        )}

        {verifyUserdetails.onclick === true &&
        verifyUserdetails.name === "Cable" ? (
          <>
            <div className="d-flex align-item-center justify-content-center pt-3">
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
            </div>
            {/* <NewFormData
              product="Cable"
              disabledCard={props.disabledCard}
              setDisabledCard={setDisabledCard}
              slug="GOTV"
              productData={gotv}
            /> */}
          </>
        ) : (
          ""
        )}
      </div>
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
  })(Cable)
);
