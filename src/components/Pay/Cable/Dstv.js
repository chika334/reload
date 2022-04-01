import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../../_action/loading";
import {
  verifySmartcardNumber,
  clearVerified,
} from "../../../_action/verifyNumber";
import { TextField, Button } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { PaymentIntent, clearPayment } from "../../../_action/Payment/index";
import { pay } from "../../../_action/Payment/paymentButtons";
import { clearErrors } from "../../../_action/errorAction";
import { verify } from "../../../_action/verify";
import "../../../css/input.css";
import dstv from "./jsonData/dstv.json";
import NewFormData from "../../Form/NewFormData";

function Dstv(props) {
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

  const verifyMeterNumber = async () => {
    const details = {
      product: productDetails.productId,
      billerCode: "DSTV",
      accountNumber: smartCard.customerId,
      extras: {
        billerSlug: "DSTV",
        customerId: smartCard.customerId,
        productName: "DSTV",
      },
    };

    props.verifySmartcardNumber(details);
  };

  const SmartNumber = async (e) => {
    e.preventDefault();
    props.setLoading(true);
    let result = verifyMeterNumber();
  };

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  useEffect(() => {
    if (verifiedUser.verifySuccess === true) {
      // alert("intent")
      setLoading(false);
      // setVerifiedProducts(verifiedUser.result.product);
      // setVerifiedAccount(verifiedUser.result.account);
      props.verify("Cable", true);
    }
  }, [verifiedUser.verifySuccess]);

  return (
    <div className="property-details-area">
      <div>
        {verifyUserdetails.onclick === false &&
        verifyUserdetails.name === "" ? (
          <div>
            <p className="text-center mb-2" style={{ color: "red" }}>
              N.B. Please select your Dstv smart card number
            </p>
            <div>
              <div>
                {fieldsArray.map((allFields, i) =>
                  allFields.text === "customerId" &&
                  allFields.lookup === true ? (
                    <div
                      key={i}
                      className="d-flex align-item-center justify-content-center pt-3"
                    >
                      <TextField
                        className="inputSize"
                        required
                        label={
                          allFields.text === "customerId"
                            ? "SmartCard Number"
                            : ""
                        }
                        onChange={(e) => handleOthers(e, allFields.text)}
                        type={allFields.text === "email" ? "email" : "number"}
                        variant="outlined"
                        InputProps={{
                          startAdornment:
                            allFields.text === "Amount" ? (
                              <InputAdornment position="start">
                                ₦
                              </InputAdornment>
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
            </div>

            <div className="d-flex align-item-center justify-content-center">
              <Button
                onClick={SmartNumber}
                variant="contained"
                className="p-3"
                style={{
                  backgroundColor: "#fda94f",
                  cursor:
                    props.disabledUssd === true ? "not-allowed" : "pointer",
                  color: "#000",
                  fontSize: "12px",
                  padding: "11px",
                }}
              >
                Verify
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}

        {verifyUserdetails.onclick === true &&
        verifyUserdetails.name === "Cable" ? (
          <>
            <p className="text-center mb-2" style={{ color: "red" }}>
              N.B. Please select your current bouquet plan
            </p>
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
            <NewFormData
              product="Cable"
              disabledCard={props.disabledCard}
              setDisabledCard={setDisabledCard}
              slug="GLO_VTU"
              productData={dstv}
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
  })(Dstv)
);
