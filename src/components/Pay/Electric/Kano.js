import { useState, useEffect } from "react";
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
import VerifyDetails from "../PaymentProcess/verifyDetails";
import NewFormData from "../../Form/NewFormData";

function Kano(props) {
  const verifiedUser = useSelector((state) => state.verify);
  const verifyUserdetails = useSelector((state) => state.verifyUserdetails);
  const selectData = useSelector(state => state.someSelect)
  const [loading, setLoading] = useState(false);
  const [disabledCard, setDisabledCard] = useState(false);
  const [smartCard, setSmartCard] = useState("");
  const productDetails = useSelector((state) => state.someData.detail);

  const item = JSON.parse(productDetails.detail.productvalue).field4.options
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

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
              billerCode="KEDCO"
              productName={fieldsArray}
              billerSlug="KEDCO"
              productType="Electricity"
              setLoading={props.setLoading}
            />
          </div>
        ) : (
          ""
        )}

        {verifyUserdetails.onclick === true &&
        verifyUserdetails.name === "Electricity" ? (
          <>
            <span className="d-flex align-item-center justify-content-center pt-3">
              <p className="mr-5">Customer Name:</p>
              <p>
                {verifiedUser.result === null
                  ? ""
                  : verifiedUser.result.account.accountName}
              </p>
            </span>
            <span className="d-flex align-item-center justify-content-center pt-3">
              <p className="mr-5">SmartCard Number:</p>
              <p>
                {verifiedUser.result === null
                  ? ""
                  : verifiedUser.result.account.accountNumber}
              </p>
            </span>
            <NewFormData
              product="Electricity"
              disabledCard={props.disabledCard}
              setDisabledCard={setDisabledCard}
              slug={selectData.name}
              productData="null"
            />
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
  })(Kano)
);
