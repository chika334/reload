import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../_action/loading";
import {
  verifySmartcardNumber,
  clearVerified,
} from "../../_action/verifyNumber";
import { PaymentIntent, clearPayment } from "../../_action/Payment/index";
import Alert from "@material-ui/lab/Alert";
import { pay } from "../../_action/Payment/paymentButtons";
import { clearErrors } from "../../_action/errorAction";
import { verify } from "../../_action/verify";
import { getProductList } from "../../_action/products";
import "../../css/input.css";
import Dstv from "./Cable/Dstv";
import Gotv from "./Cable/Gotv";
import Startimes from "./Cable/Startimes";

function Cable(props) {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const verifiedUser = useSelector((state) => state.verify);
  const verifyUserdetails = useSelector((state) => state.verifyUserdetails);
  const [disabledCard, setDisabledCard] = useState(false);
  const [disabledUssd, setDisabledUssd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [smartCard, setSmartCard] = useState("");
  const [selectDetails, setSelectDetails] = useState(null);
  const productDetails = useSelector((state) => state.someData.detail);

  useEffect(() => {
    if (error.id === "VERIFY_FAILED") {
      setLoading(false);
      setErrors(error.message.message);
      setTimeout(() => {
        props.clearErrors();
      }, 5000);
    } else if (error.id === "BUY_DATA_FAILURE") {
      setLoading(false);
      setErrors(error.message.message);
      setTimeout(() => {
        props.clearErrors();
        setErrors("");
      }, 5000);
    } else if (error.id === "FINAL_PAYMENT_ERROR") {
      setLoading(false);
      setErrors(error.message.message);
      setTimeout(() => {
        props.clearErrors();
        setErrors("");
      }, 5000);
    }
  }, [error.error === true]);

  const handleSelect = (name, value) => {
    setSelectDetails(name);
  };

  const handleSmartCard = (e) => {
    setSmartCard(e.target.value);
  };

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  const Options =
    productDetails.billerCode === "DSTV1"
      ? JSON.parse(productDetails.detail.productvalue).field3.options
      : productDetails.billerCode === "GOTV1"
      ? JSON.parse(productDetails.detail.productvalue).field4.options
      : "";

  const fieldsOption = [];
  for (const key in Options) {
    if (Options.hasOwnProperty(key)) {
      var value = Options[key];
      fieldsOption.push(value);
    }
  }

  useEffect(() => {
    if (verifiedUser.verifySuccess === true) {
      setLoading(false);
      setLoading(false);
      props.verify("Cable", true);
    }
  }, [verifiedUser.verifySuccess]);

  return (
    <div className="property-details-area">
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
        <>
          <div>
            <div className="d-flex align-item-center justify-content-center">
              {errors && <Alert severity="error">{errors}</Alert>}
            </div>
          </div>
          {productDetails.billerCode === "STARTIMES_BASIC" ? (
            <Startimes
              disabledCard={disabledCard}
              disabledUssd={disabledUssd}
              // handleSubmit={handleSubmit}
              setLoading={setLoading}
            />
          ) : (
            ""
          )}

          {productDetails.billerCode === "GOTV" ? (
            <>
              <Gotv
                disabledCard={disabledCard}
                disabledUssd={disabledUssd}
                // // handleSubmit={handleSubmit}
                setLoading={setLoading}
              />
            </>
          ) : (
            ""
          )}
          {productDetails.billerCode === "DSTV" ? (
            <>
              <Dstv
                disabledCard={disabledCard}
                disabledUssd={disabledUssd}
                dataPay={props.dataPay}
                setLoading={setLoading}
                // data={productList ? productList.loaded === true ? productList.ProductList : "bad" : "badder"}
                // handleSubmit={handleSubmit}
                amount={selectDetails === null ? "" : selectDetails.Amount}
                packageType={
                  selectDetails === null ? "" : selectDetails.ItemType
                }
              />
            </>
          ) : (
            ""
          )}
        </>
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
  })(Cable)
);
