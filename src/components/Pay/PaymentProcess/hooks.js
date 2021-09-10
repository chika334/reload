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
  // const paymentIntent = useSelector((state) =>
  //   state.paymentIntent.detail === null ? "" : state.paymentIntent.detail
  // );
  const productDetails = useSelector((state) => state.someData.detail);
  // const paymentButtons = useSelector(state => state.paymentButton)
  const [paymentType, setPaymentType] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [ussdPayload, setUssdPayload] = React.useState(null);
  const [ussdResponse, setUssdResponse] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  console.log(errorMessage);

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

  console.log(paymentIntent);

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
    setOpen(false);
    if (error.id === "FINAL_PAYMENT_ERROR") {
      setLoading(false);
      if (
        error.message.data.paymentResponse ===
        `Bill Payment Failed, Amount Would Be Reversed Bouquet not found for amount : ${paymentIntent.totalAmount}`
      ) {
        console.log(error.message.data.paymentResponse);
        setErrorMessage(
          `Transaction failed, ${paymentIntent.totalAmount} would be reversed. please select current bouquet plan`
        );
      } else {
        setErrorMessage(error.message.data.message);
      }
    }
  }, [error.error === true]);

  useEffect(() => {
    if (
      productDetails.detail.productId.productcategoryId.categoryname ===
      "Electricity"
    ) {
      if (pay.amount < 1000) {
        setOpen(true);
        setLoading(false);
        setMessage("Minimum payment for all electricity is 1000 Naira");
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
    } else {
      if (pay.amount < 50 || pay.amount > 100000) {
        setLoading(false);
        setOpen(true);
        setMessage(
          "All amount should not be below 50 Naira or above 1000 Naira"
        );
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
    }
  }, [paymentType]);

  return {
    startPayment,
    grabUssdResponse,
    ussdPayload,
    loading,
    open,
    errorMessage,
    message,
    setOpen,
  };
};
