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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
// import { showLoader, hideLoader } from "../../../_action/loading";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Index(props) {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const paymentButton = useSelector((state) => state.paymentButton);
  const pay = useSelector((state) =>
    state.paymentDone.payment === true ? state.paymentDone.detail : ""
  );
  const paymentIntent = useSelector((state) =>
    state.paymentIntent.success === true
      ? state.paymentIntent.detail.result
      : ""
  );
  const productDetails = useSelector((state) =>
    state.someData.detail === null ? "" : state.someData.detail
  );
  const error = useSelector((state) => state.error);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState("");
  const Conveniencefee =
    productDetails.detail.productId.productcategoryId.categoryname ===
    "Electricity"
      ? 100
      : 0;

  const totalAmount = Conveniencefee + JSON.parse(pay.amount);
  const finalPaymentSuccess = useSelector((state) => state.FinalPayment);

  const toggle = () => {
    setVisible(!visible);
    dispatch(paymentButtons("Ussd", true));
  };

  const config = {
    public_key: `${process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY}`,
    tx_ref: Date.now(),
    amount: paymentIntent.totalAmount,
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
      if (JSON.parse(pay.amount) < 50) {
        setOpen(true);
      } else {
        setLoading(true);
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
          onClose: () => {
            setLoading(false);
          },
        });
      }
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
    amount: `${paymentIntent.totalAmount}`,
    merchantId: "4058RNG10000001",
    channel: "USSD",
    terminalId: "4058RNG1",
    subMerchantName: "Reload.ng",
  };

  if (loading === true) {
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

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      window.location.reload(false);
    }, 300);
  };

  // const handleXpressPay = () => {
  //   dispatch(paymentButtons("xpresspay", true));
  // };

  return (
    <div>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Welcome to reload.ng"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Amount too low.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="d-flex align-item-center justify-content-center">
        {<CoralUssd body={body} onSuccess={(res) => console.log(res)} />}
        <div className="interior">
          {" "}
          <a className="btn" href="#open-modal">
            {" "}
            Pay with USSD
          </a>{" "}
        </div>
      </div>
      <div>
        <Button onClick={handleClick}>
          <img src={Flutterwave} alt="Flutterwave" />
        </Button>
      </div>
      {/* <div>
        <Button onClick={handleXpressPay}>
          <img src={Xpresspay} alt="Xpresspay" />
        </Button>
      </div> */}
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
