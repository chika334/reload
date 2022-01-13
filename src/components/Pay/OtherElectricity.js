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
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import Enugu from "./Electric/Enugu";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

function Electricity(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [disabledCard, setDisabledCard] = useState(false);
  const [disabledUssd, setDisabledUssd] = useState(false);
  const [buttonValue, setButtonValue] = useState(null);
  const [valueData, setValueData] = useState(null);
  const error = useSelector((state) => state.error);
  const [errors, setErrors] = useState("");
  const [intentData, setIntentData] = useState("");
  const verifiedUser = useSelector((state) => state.verify);
  const productDetails = useSelector((state) => state.someData.detail);
  const paymentIntent = useSelector((state) => state.paymentIntent);
  const [failure, setFailure] = useState("");

  const handleSubmit = (value, data) => {
    setLoading(true);
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
    if (paymentIntent.success === true) {
      setLoading(false);
      const amounts = valueData === null ? "" : valueData.amount;
      const iedc =
        valueData === null ? "" : valueData.referenceValues["Email Address"];
      const detail = {
        amount: amounts,
        email: `${
          productDetails.billerCode === "iedc"
            ? iedc
            : productDetails.billerCode === "PHEDDIR2"
            ? iedc
            : productDetails.billerCode === "PHCNEKO"
            ? iedc
            : productDetails.billerCode === "JOS_PREPAID"
            ? iedc
            : productDetails.billerCode === "KADUNA_PREPAID"
            ? iedc
            : productDetails.billerCode === "PHCNKAN"
            ? iedc
            : productDetails.billerCode === "ABJ_PREPAID"
            ? iedc
            : ""
        }`,
        product: productDetails.productname,
        customerId:
          verifiedUser.result === null
            ? ""
            : verifiedUser.result.account.accountNumber,
        buttonClick: buttonValue,
        transRef: paymentIntent.detail.transRef,
        customerName:
          verifiedUser.result === null
            ? ""
            : verifiedUser.result.account.accountName,
      };

      console.log(detail, valueData);

      dispatch(pay(detail));
      props.dataPay(true, "Electric");
    }
  }, [paymentIntent.success]);

  useEffect(() => {
    if (verifiedUser.verifySuccess === true) {
      setLoading(false);
      dispatch(verify("Electricity", true));
    }
  }, [verifiedUser.verifySuccess]);

  const getData = (data) => {
    setIntentData(data);
  };

  // console.log(productDetails.billerCode);

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
                handleSubmit={handleSubmit}
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
    finalPayment,
  })(Electricity)
);
