import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { finalPayment } from "../../../_action/Payment/finalPayment";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { paymentButtons } from "../../../_action/Payment/paymentButtons";

const flutterConfig = (pay, paymentIntent) => ({
  public_key: `${process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY}`,
  tx_ref: Date.now(),
  amount: paymentIntent.totalAmount,
  currency: "NGN",
  payment_options: "card",
  trackingNo: pay.transRef,
  customer: {
    email: pay.email,
    name: pay.customerName,
  },
  customizations: {
    title: "Reload.ng",
    description: "Make all Bill Payments",
    logo:
      "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
  },
});

export const FLUTTERWAVE_KEY = "FLUTTERWAVE";
export const USSD_KEY = "USSD";

export const usePaymentGateway = (props) => {
  const finalPaymentSuccess = useSelector((state) => state.FinalPayment);
  const verifyUserdetails = useSelector((state) => state.verifyUserdetails);
  const paymentGatewayRef = React.useRef();
  const error = useSelector((state) => state.error);
  // const paymentButtons = useSelector(state => state.paymentButton)
  const [paymentType, setPaymentType] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [ussdPayload, setUssdPayload] = React.useState(null);
  const [ussdResponse, setUssdResponse] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  React.useEffect(() => {
    paymentGatewayRef.current = true;
    return () => {
      paymentGatewayRef.current = false;
    };
  }, []);

  const paymentIntent = useSelector((state) =>
    state.paymentIntent.success === true
      ? state.paymentIntent.detail.result
      : ""
  );

  const startPayment = (payType) => {
    // console.log("something", payType);
    setPaymentType(payType);
    setLoading(true);
  };

  const grabUssdResponse = (responseData) => {
    // setUssdPayload(responseData);
    // console.log(responseData);
    setUssdResponse(responseData);
  };

  const pay = useSelector((state) =>
    state.paymentDone.payment === true ? state.paymentDone.detail : ""
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (ussdResponse) {
      setLoading(true);
      const ref = {
        transRef: pay.transRef,
        paymentRef: ussdResponse.TransactionID,
        accountNumber: pay.product === "Cable" ? pay.accountNumber : null,
      };

      if (
        ussdResponse.responseCode === "09" &&
        ussdResponse.customer_mobile === ""
      ) {
        setLoading(false);
        setOpen(true);
      }

      if (ussdResponse.responsemessage === "Success") {
        dispatch(finalPayment(ref));
      } else if (
        ussdResponse.responseCode === "09" &&
        ussdResponse.customer_mobile !== ""
      ) {
        setTimeout(() => {
          dispatch(finalPayment(ref));
        }, 60000);
      }
    }
  }, [ussdResponse]);

  const handleFlutterPayment = useFlutterwave(
    flutterConfig(pay, paymentIntent)
  );

  useEffect(() => {
    if (error.id === "FINAL_PAYMENT_ERROR") {
      setLoading(false);
      setErrorMessage(error.message.message);
    }
  }, [error.error === true]);

  useEffect(() => {
    if (pay.amount < 50 || pay.amount > 100000) {
      setLoading(false);
      setOpen(true);
    } else {
      switch (paymentType) {
        case FLUTTERWAVE_KEY:
          dispatch(paymentButtons("flutterwave", true));
          handleFlutterPayment({
            callback: (response) => {
              const ref = {
                transRef: pay.transRef,
                paymentRef: response.transaction_id,
                accountNumber:
                  pay.product === "Cable" ||
                  verifyUserdetails.name === "SPECTRANET" ||
                  verifyUserdetails.name === "SMILE" ||
                  verifyUserdetails.name === "Electricity"
                    ? pay.accountNumber
                    : null,
              };

              dispatch(finalPayment(ref));
              setTimeout(() => {
                closePaymentModal();
              }, 2000);
            },
            onClose: () => {
              setLoading(false);
            },
          });
          break;

        case USSD_KEY:
          dispatch(paymentButtons("Ussd", true));
          // history.push("#open-modal");
          setUssdPayload({
            traceId: pay.transRef,
            transactionType: "0",
            amount: `${paymentIntent.totalAmount}`,
            merchantId: "4058RNG10000001",
            channel: "USSD",
            terminalId: "4058RNG1",
            subMerchantName: "Reload.ng",
          });
          setLoading(false);
          break;
        default:
          break;
      }
    }
  }, [paymentType]);

  return {
    startPayment,
    grabUssdResponse,
    ussdPayload,
    loading,
    open,
    errorMessage,
    setOpen,
  };
};
