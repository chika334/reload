import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { products } from "../../data/products";
import Electricity from "../Pay/Electricity";
import Cable from "../Pay/Cable";
import Airtime from "../Pay/Airtime";
import Data from "../Pay/Data";
import { usePaymentGateway } from "../Pay/PaymentProcess/hooks";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import { requery } from "../../_action/requery";
import { PaymentIntent } from "../../_action/Payment/index";
import { verify } from "../../_action/verify";
import OtherElectricity from "../Pay/OtherElectricity";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PropertyDetails(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.someData.detail);
  const [pay, setPay] = useState(false);
  const intentTransRef = useSelector((state) =>
    state.paymentIntent.success === true
      ? state.paymentIntent.detail.transRef
      : ""
  );
  const verifySuccess = useSelector((state) => state.verify);
  const [productData, setProductData] = useState();
  const finalPaymentSuccess = useSelector((state) => state.FinalPayment);
  const [type, setType] = useState("");
  const requeryData = useSelector((state) => state.reloadReducer);
  const [disabledUssd, setDisabledUssd] = useState(false);
  const [disabledCard, setDisabledCard] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dataValue = useSelector((state) => state.dataValue);
  const payment = useSelector((state) =>
    state.paymentDone.payment === true ? state.paymentDone : state.paymentDone
  );
  const {
    startPayment,
    setLoading,
    loading: secondaryLoading,
    errorMessage,
    setErrorMessage,
    open,
    setOpen,
    setErrorModal,
    errorModal,
    message,
  } = usePaymentGateway();

  const onPay = (val, type) => {
    setPay(val);
    setType(type);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.href = `/${process.env.REACT_APP_RELOADNG}/product-details`;
  };

  const handleErrorClose = () => {
    setErrorModal(false);
  };

  const handleQuery = (e) => {
    e.preventDefault();
    const value = {
      transRef: intentTransRef,
    };

    setLoading(true);

    dispatch(requery(value));
  };

  useEffect(() => {
    if (requeryData.requerySuccess === true) {
      setLoading(false);
      history.push({
        pathname: `/${process.env.REACT_APP_RELOADNG}/requery/receipt`,
        state: { data: props.location, pay },
      });
    }
  }, [requeryData.requerySuccess === true]);

  useEffect(() => {
    if (dataValue.name === "finalPayment" && dataValue.booleanValue === true) {
      setLoading(false);
      setErrorModal(true);
    } else if (
      dataValue.name === "requery" &&
      dataValue.booleanValue === true
    ) {
      setLoading(false);
      setErrorModal(false);
      setOpenModal(true);
      setErrorMessage(
        "We appologies for this, issues from our service providers, Please contact our customer care or chat us via our live chat system, Thank you."
      );
    }
  }, [dataValue.booleanValue === true]);

  const makePayment = () => {
    if (payment.detail.buttonClick !== null) {
      startPayment(payment.detail.buttonClick);
      if (payment.detail.buttonClick === "USSD") {
        // toggleIt();
        setDisabledUssd(true);
      } else if (payment.detail.buttonClick === "FLUTTERWAVE") {
        setDisabledCard(true);
      }
    }
  };

  useEffect(() => {
    if (finalPaymentSuccess.finalPayment === true) {
      console.log("working with final payment");
      history.push({
        pathname: `/${process.env.REACT_APP_RELOADNG}/receipt`,
        state: { data: props.location, pay },
      });
    } else {
      console.log("bad request from final payment");
    }
  }, [finalPaymentSuccess.finalPayment]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const productKey = params.get("product");
    setProductData(products[productKey]);
  }, [props.location]);

  useEffect(() => {
    if (payment.detail !== null) {
      makePayment();
    }
  }, [payment]);

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Amount Input Error
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ok
          </Button>
        </DialogActions>
      </Dialog>
      {secondaryLoading === true ? (
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
          <div className="property-details-area">
            <div className="bg-gray pd-top-100 pd-bottom-90">
              <div className="container">
                <div className="row d-flex align-item-center justify-content-center">
                  <div className="col-lg-8 pb-4">
                    <div className="contact-form-wrap">
                      <div className="item">
                        <div className="d-flex align-item-center justify-content-center">
                          <img
                            width="200"
                            src={`${productDetails.detail.productId.logourl}`}
                            alt="image"
                          />
                        </div>
                      </div>
                      <div className="d-flex align-item-center justify-content-center">
                      </div>
                      <div className="property-details-slider-info">
                        <div className="">
                          {errorMessage && (
                            <Alert severity="error">{errorMessage}</Alert>
                          )}
                          <div className="mt-5">
                            <div>
                              {productDetails.detail.productId.description ===
                                "Electricity Prepaid (IKEDC)" && (
                                <Electricity
                                  disabledUssd={disabledUssd}
                                  disabledCard={disabledCard}
                                  dataPay={onPay}
                                />
                              )}
                              {productDetails.detail.productId.description ===
                                "Electricity (IBEDC)" && (
                                <Electricity
                                  disabledUssd={disabledUssd}
                                  disabledCard={disabledCard}
                                  dataPay={onPay}
                                />
                              )}
                              {productDetails.detail.productId.description ===
                                "Electricity (EEDC)" && (
                                <OtherElectricity
                                  disabledUssd={disabledUssd}
                                  disabledCard={disabledCard}
                                  dataPay={onPay}
                                />
                              )}
                              {productDetails.detail.productId.description ===
                                "Electricity Prepaid (EKEDC)" && (
                                <Electricity
                                  disabledUssd={disabledUssd}
                                  disabledCard={disabledCard}
                                  dataPay={onPay}
                                />
                              )}
                              {productDetails.detail.productId.description ===
                                "Electricity Prepaid (AEDC)" && (
                                <Electricity
                                  disabledUssd={disabledUssd}
                                  disabledCard={disabledCard}
                                  dataPay={onPay}
                                />
                              )}
                              {productDetails.detail.productId.description ===
                                "Electricity Prepaid (KAEDCO)" && (
                                <Electricity
                                  disabledUssd={disabledUssd}
                                  disabledCard={disabledCard}
                                  dataPay={onPay}
                                />
                              )}
                              {productDetails.detail.productId.description ===
                                "Electricity (KEDCO)" && (
                                <OtherElectricity
                                  disabledUssd={disabledUssd}
                                  disabledCard={disabledCard}
                                  dataPay={onPay}
                                />
                              )}
                              {productDetails.detail.productId.description ===
                                "Electricity Prepaid (phed)" && (
                                <Electricity
                                  disabledUssd={disabledUssd}
                                  disabledCard={disabledCard}
                                  dataPay={onPay}
                                />
                              )}
                              {productDetails.detail.productId.description ===
                                "Electricity Prepaid (JED)" && (
                                <Electricity
                                  disabledUssd={disabledUssd}
                                  disabledCard={disabledCard}
                                  dataPay={onPay}
                                />
                              )}
                            </div>
                            {/* {
                              <CoralUssd
                                data={ussdPayload}
                                isModalOpen={isModalOpen}
                                toggleIt={toggleIt}
                                // useUSSD={App}
                                onSuccess={grabUssdResponse}
                              />
                            } */}
                            <div>
                              {productDetails.detail.productId.description ===
                                "Cable" && (
                                <Cable
                                  loading={secondaryLoading}
                                  disabledUssd={disabledUssd}
                                  disabledCard={disabledCard}
                                  dataCable={props.location.state}
                                  dataPay={onPay}
                                />
                              )}
                            </div>
                            <div>
                              {productDetails.detail.productId.description ===
                                "Airtime" && (
                                <Airtime
                                  disabledUssd={disabledUssd}
                                  disabledCard={disabledCard}
                                  dataPay={onPay}
                                />
                              )}
                            </div>
                            <div>
                              {productDetails.detail.productId.description ===
                                "Data" && (
                                <Data
                                  disabledUssd={disabledUssd}
                                  disabledCard={disabledCard}
                                  dataPay={onPay}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  exploreProducts: state.exploreProducts,
});

export default withRouter(
  connect(mapStateToProps, { PaymentIntent, verify })(
    PropertyDetails
  )
);
