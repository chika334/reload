import React, { useState, useEffect } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import { withRouter, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { hideLoader } from "../../_action/loading";
import { Button } from "@material-ui/core";
// import ProductTable from "./productDetails/productTable";
import { products } from "../../data/products";
import Ntel from "../Pay/Ntel";
import Electricity from "../Pay/Electricity";
import Cable from "../Pay/Cable";
import Airtime from "../Pay/Airtime";
import Data from "../Pay/Data";
import Exams from "../Pay/Exams";
import { usePaymentGateway } from "../Pay/PaymentProcess/hooks";
import { useUSSD } from "../CoralUssd";
import CoralUssd from "../CoralUssd/App";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const formSchema = {
  meter: {
    type: "number",
    label: "Meter Number",
    placeholder: "Enter Meter Number",
    required: true,
  },
};

function PropertyDetails(props) {
  const history = useHistory();
  const exploreProducts = useSelector((state) => state.exploreProducts);
  const productDetails = useSelector((state) => state.someData.detail);
  const dispatch = useDispatch();
  const [pay, setPay] = useState(false);
  // const []
  const paymentButton = useSelector((state) => state.paymentButton);
  const [productData, setProductData] = useState();
  const finalPaymentSuccess = useSelector((state) => state.FinalPayment);
  const [type, setType] = useState("");
  // const [buttonPayment, setButtonPayment] = useState(false);
  // const [formData, setFormData] = useState({});
  // const [validationSchema, setValidationSchema] = useState({});
  // const [amount, setAmount] = useState("");
  const [disabledUssd, setDisabledUssd] = useState(false);
  const [disabledCard, setDisabledCard] = useState(false);
  const payment = useSelector((state) =>
    state.paymentDone.payment === true ? state.paymentDone : state.paymentDone
  );
  const { isModalOpen, toggleIt } = useUSSD();
  const {
    ussdPayload,
    grabUssdResponse,
    startPayment,
    loading: secondaryLoading,
    errorMessage,
    open,
    setOpen,
  } = usePaymentGateway();

  const onPay = (val, type) => {
    setPay(val);
    setType(type);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.href = `/${process.env.REACT_APP_RELOADNG}/product-details`;
  };

  const makePayment = () => {
    if (payment.detail.buttonClick !== null) {
      // console.log("daniel", payment);
      startPayment(payment.detail.buttonClick);
      if (payment.detail.buttonClick === "USSD") {
        toggleIt();
        setDisabledUssd(true);
      } else if (payment.detail.buttonClick === "FLUTTERWAVE") {
        setDisabledCard(true);
      }
    }
  };

  console.log(finalPaymentSuccess);

  useEffect(() => {
    if (finalPaymentSuccess.finalPayment === true) {
      history.push({
        pathname: `/${process.env.REACT_APP_RELOADNG}/receipt`,
        // search: `?query=abc`,
        state: { data: props.location, pay },
      });
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
            Amount should not be less than 50 Naira or above 100,000 Naira
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
                <div className="row">
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
                        {/* <h4>{props.location.state.data.title}</h4> */}
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
                                "Electricity Prepaid (KEDCO)" && (
                                <Electricity
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
                            {
                              <CoralUssd
                                data={ussdPayload}
                                isModalOpen={isModalOpen}
                                toggleIt={toggleIt}
                                // useUSSD={App}
                                onSuccess={grabUssdResponse}
                              />
                            }
                            {productDetails.detail.productId.desctiption === ""}
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
                            <div>
                              {productDetails.detail.productId.description ===
                                "Exams" && (
                                <Exams
                                  productData={props.location.state}
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
  connect(mapStateToProps, { hideLoader })(PropertyDetails)
);
