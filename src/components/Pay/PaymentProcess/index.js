import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { FcCellPhone } from "react-icons/fc";
import Flutterwave from "../../../images/flutterwave.png";
import Xpresspay from "../../../images/xpresspay.png";
import { withRouter, useHistory } from "react-router-dom";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import CoralUssd from "../../CoralUssd/App";
import { connect, useDispatch, useSelector } from "react-redux";
import { paymentButtons } from "../../../_action/Payment/paymentButtons";
import { clearDetails } from "../../../_action/verify";
import { finalPayment } from "../../../_action/Payment/finalPayment";
import { showLoader, hideLoader } from "../../../_action/loading";

function Index(props) {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const paymentButton = useSelector((state) => state.paymentButton);
  const error = useSelector((state) => state.error);
  const [errors, setErrors] = useState("");
  const finalPaymentSuccess = useSelector((state) => state.FinalPayment);
  const pay = useSelector((state) =>
    state.paymentDone.payment === true ? state.paymentDone.detail : ""
  );

  const toggle = () => {
    setVisible(!visible);
    dispatch(paymentButtons("Ussd", true));
  };

  const config = {
    public_key: `${process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY}`,
    tx_ref: Date.now(),
    amount: pay.amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    trackingNo: pay.transRef,
    customer: {
      email: pay.email,
      name: pay.customerName,
      phonenumber: "09077426203",
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo:
        "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleFlutterwave = (e) => {
    // dispatch(showLoader());
    if (paymentButton.name === "Ussd") {
      setLoading(false);
    } else {
      handleFlutterPayment({
        callback: (response) => {
          console.log(response);
          const ref = {
            transRef: pay.transRef,
            paymentRef: response.transaction_id,
          };

          dispatch(finalPayment(ref));
          setTimeout(() => {
            closePaymentModal();
          }, 2000);
        },
        onClose: () => {},
      });
      setLoading(true);
    }
  };

  // console.log(pay);

  useEffect(() => {
    if (finalPaymentSuccess.finalPayment === true) {
      // dispatch(hideLoader());
      setLoading(false);
      history.push({
        pathname: `/reloadng/receipt`,
        search: `?query=abc`,
        state: { data: props.location, pay },
      });
    }
  }, [finalPaymentSuccess.finalPayment]);

  useEffect(() => {
    if (error.id === "FINAL_PAYMENT_ERROR") {
      setLoading(false);
      // setErrors(error.message.message);
      // setTimeout(() => {
      //   props.clearErrors();
      //   setErrors("");
      // }, 5000);
    }
  }, [error.error]);

  useEffect(() => {
    if (paymentButton.onclick === true) {
      handleFlutterwave();
    }
  }, [paymentButton.onclick]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(paymentButtons("flutterwave", true));
  };

  // console.log(pay);

  const body = {
    traceId: "2021070109120612",
    transactionType: "0",
    amount: `${pay.amount}`,
    merchantId: "4058RNG10000001",
    channel: "USSD",
    terminalId: "4058RNG1",
    subMerchantName: "Reload.ng",
  };

  // console.log(body);

  if (loading) {
    return (
      <div className="preloader" id="preloader">
        <div className="preloader-inner">
          <div className="spinner">
            <div className="dot1"></div>
            <div className="dot2"></div>
          </div>
        </div>
      </div>
    );
  }

  // console.log(body);
  // useEffect(() => {
  //   props.clearDetails();
  // }, []);

  const handleXpressPay = () => {
    dispatch(paymentButtons("xpresspay", true));
  };

  return (
    <div>
      <div className="d-flex align-item-center justify-content-center">
        {/* <button onClick> */}
        <CoralUssd
          visible={visible}
          toggle={toggle}
          body={body}
          onSuccess={(res) => console.log(res)}
        />
        {/* </button> */}
      </div>
      <div>
        <Button onClick={handleClick}>
          <img src={Flutterwave} alt="Flutterwave" />
        </Button>
      </div>
      <div>
        <Button onClick={handleXpressPay}>
          <img src={Xpresspay} alt="Xpresspay" />
        </Button>
      </div>
    </div>
  );
}

export default withRouter(
  connect(null, {
    paymentButtons,
    clearDetails,
    finalPayment,
    // showLoader,
    // hideLoader,
  })(Index)
);
