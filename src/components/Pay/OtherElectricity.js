import { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { verifySmartcardNumber } from "../../_action/verifyNumber";
import { verify } from "../../_action/verify";
import { pay } from "../../_action/Payment/paymentButtons";
import { finalPayment } from "../../_action/Payment/finalPayment";
import { clearErrors } from "../../_action/errorAction";
import { PaymentIntent } from "../../_action/Payment";
import Alert from "@material-ui/lab/Alert";
import Enugu from "./Electric/Enugu";
import Kano from "./Electric/Kano";

function Electricity(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [disabledCard, setDisabledCard] = useState(false);
  const [disabledUssd, setDisabledUssd] = useState(false);
  const [buttonValue, setButtonValue] = useState(null);
  const [valueData, setValueData] = useState(null);
  const error = useSelector(state => state.error);
  const [errors, setErrors] = useState("");
  const [intentData, setIntentData] = useState("");
  const verifiedUser = useSelector(state => state.verify);
  const productDetails = useSelector(state => state.someData.detail);
  const paymentIntent = useSelector(state => state.paymentIntent);
  const [failure, setFailure] = useState("");

  // const handleSubmit = (value, data) => {
  //   setLoading(true);
  //   setButtonValue(value);
  //   setValueData(data);
  //   if (value === "FLUTTERWAVE") {
  //     setDisabledCard(true);
  //   } else if (value === "USSD") {
  //     setDisabledUssd(true);
  //   }

  //   console.log(data);
  //   // props.PaymentIntent(data);
  // };

  useEffect(() => {
    if (error.id === "VERIFY_FAILED") {
      setLoading(false);
      setErrors(error.message.message);
      setTimeout(() => {
        props.clearErrors();
        setErrors("");
      }, 5000);
    } else if (error.id === "FINAL_PAYMENT_ERROR") {
      setLoading(false);
      setFailure(error.message.data.message);
      setTimeout(() => {
        props.clearErrors();
        setErrors("");
      }, 6000);
    }
  }, [error.error === true]);

  useEffect(() => {
    if (verifiedUser.verifySuccess === true) {
      setLoading(false);
      dispatch(verify("Electricity", true));
    }
  }, [verifiedUser.verifySuccess]);

  const getData = data => {
    setIntentData(data);
  };

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
        <div>
          <div className="d-flex align-item-center justify-content-center">
            {errors && <Alert severity="error">{errors}</Alert>}
          </div>
          <div>
            {productDetails.billerCode === "EEDC" ? (
              <Enugu
                getData={getData}
                setLoading={setLoading}
                // handleSubmit={handleSubmit}
                disabledCard={props.disabledCard}
                disabledUssd={props.disabledUssd}
              />
            ) : (
              ""
            )}
            {productDetails.billerCode === "KEDCO" ? (
              <Kano
                getData={getData}
                setLoading={setLoading}
                // handleSubmit={handleSubmit}
                disabledCard={props.disabledCard}
                disabledUssd={props.disabledUssd}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(
  connect(null, {
    verifySmartcardNumber,
    verify,
    PaymentIntent,
    pay,
    clearErrors,
    finalPayment
  })(Electricity)
);
