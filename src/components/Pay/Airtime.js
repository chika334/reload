import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { PaymentIntent } from "../../_action/Payment";
import { pay } from "../../_action/Payment/paymentButtons";
import "../../css/input.css";
import { loginRediectSuccess } from "../../_action/LoginRedirect";
import Airtel from "./Airtime/Airtel";
import Mtn from "./Airtime/mtn";
import Etisalat from "./Airtime/etisalat";
import Glo from "./Airtime/glo";

function NewForm(props) {
  const dispatch = useDispatch();
  const [disabledCard, setDisabledCard] = useState(false);
  const [disabledUssd, setDisabledUssd] = useState(false);
  const [buttonValue, setButtonValue] = useState(null);
  const paymentIntent = useSelector((state) => state.paymentIntent);
  const productDetails = useSelector((state) => state.someData.detail);
  const [loading, setLoading] = useState(false);
  const [valueData, setValueData] = useState(null);

  const handleSubmit = (value, data) => {
    setButtonValue(value);
    setValueData(data);
    if (value === "FLUTTERWAVE") {
      setDisabledCard(true);
    } else if (value === "USSD") {
      setDisabledUssd(true);
    }

    props.PaymentIntent(data);
  };

  useEffect(() => {
    if (paymentIntent.success === true) {
      setLoading(false);
      const amount = valueData === null ? "" : valueData.amount;
      const email = valueData === null ? "" : valueData.referenceValues.email;
      const customerName =
        valueData === null ? "" : valueData.referenceValues.customerName;
      const customerId =
        valueData === null ? "" : valueData.referenceValues.customerId;

      const detail = {
        amount: amount,
        email: email,
        product: productDetails.productname,
        buttonClick: buttonValue,
        transRef: paymentIntent.detail.transRef,
        customerName: customerName,
        customerId: customerId,
      };

      dispatch(pay(detail));
      props.dataPay(true, "Airtime");
    }
  }, [paymentIntent.success]);

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  return (
    <div>
      {loading === true ? (
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
          {productDetails.billerCode === "Airtel-VTU_BLACKSILICON" ? (
            <Airtel
              disabledCard={disabledCard}
              setLoading={setLoading}
              disabledUssd={disabledUssd}
              handleSubmit={handleSubmit}
            />
          ) : (
            ""
          )}
          {productDetails.billerCode === "Mtn-VTU_BLACKSILICON" ? (
            <Mtn
              disabledCard={disabledCard}
              setLoading={setLoading}
              disabledUssd={disabledUssd}
              handleSubmit={handleSubmit}
            />
          ) : (
            ""
          )}
          {productDetails.billerCode === "9mobile-VTU_BLACKSILICON" ? (
            <Etisalat
              disabledCard={disabledCard}
              setLoading={setLoading}
              disabledUssd={disabledUssd}
              handleSubmit={handleSubmit}
            />
          ) : (
            ""
          )}
          {productDetails.billerCode === "Glo-VTU_BLACKSILICON" ? (
            <Glo
              disabledCard={disabledCard}
              setLoading={setLoading}
              disabledUssd={disabledUssd}
              handleSubmit={handleSubmit}
            />
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}

export default withRouter(
  connect(null, { PaymentIntent, loginRediectSuccess })(NewForm)
);
