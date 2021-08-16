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
// import { Form, TextField, SubmitButton } from "../Form/FormElements";
// import * as Yup from "yup";
// import FormPay from "../reg/Pay/FormPay";
// import AirtimePay from "../reg/Pay/Airtime";
// import DataPay from "../reg/Pay/DataPay";
// import CablePay from "../reg/Pay/Cable";
// import ExamPay from "../reg/Pay/Exams";
import Electricity from "../Pay/Electricity";
import Cable from "../Pay/Cable";
import Airtime from "../Pay/Airtime";
import Data from "../Pay/Data";
import Exams from "../Pay/Exams";
import { usePaymentGateway } from "../Pay/PaymentProcess/hooks";
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
  const [buttonPayment, setButtonPayment] = useState(false);
  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});
  const [amount, setAmount] = useState("");
  const payment = useSelector((state) =>
    state.paymentDone.payment === true ? state.paymentDone : state.paymentDone
  );

  const {
    ussdPayload,
    grabUssdResponse,
    startPayment,
    loading: secondaryLoading,
    open,
    setOpen,
  } = usePaymentGateway();

  const onPay = (val, type) => {
    setPay(val);
    setType(type);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.href = "/product-details";
  };

  const makePayment = () => {
    if (payment.detail.buttonClick !== null) {
      console.log("daniel", payment);
      startPayment(payment.detail.buttonClick);
      if (payment.detail.buttonClick === "USSD") {
        setTimeout(() => {
          // setLoading(secondaryLoading);
        }, 500);
      }
    }
  };

  useEffect(() => {
    if (finalPaymentSuccess.finalPayment === true) {
      history.push({
        pathname: `/receipt`,
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
      // setLoading(secondaryLoading);
      makePayment();
    }
  }, [payment]);

  console.log(payment);

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
          UnSuccessful USSD Transaction
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please call the USSD code on your phone to pay with ussd. Thank you
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
                            // src={`${props.location.state.data.productId.logourl}`}
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
                          <div className="mt-5">
                            <div>
                              {productDetails.detail.productId.description ===
                                "Electricity Prepaid (IKEDC)" && (
                                <Electricity dataPay={onPay} />
                              )}
                              {productDetails.detail.productId.description ===
                                "Electricity Prepaid (EKEDC)" && (
                                <Electricity dataPay={onPay} />
                              )}
                              {productDetails.detail.productId.description ===
                                "Electricity Prepaid (AEDC)" && (
                                <Electricity dataPay={onPay} />
                              )}
                              {productDetails.detail.productId.description ===
                                "Electricity Prepaid (KAEDCO)" && (
                                <Electricity dataPay={onPay} />
                              )}
                              {productDetails.detail.productId.description ===
                                "Electricity Prepaid (KEDCO)" && (
                                <Electricity dataPay={onPay} />
                              )}
                              {productDetails.detail.productId.description ===
                                "Electricity Prepaid (phed)" && (
                                <Electricity dataPay={onPay} />
                              )}
                              {productDetails.detail.productId.description ===
                                "Electricity Prepaid (JED)" && (
                                <Electricity dataPay={onPay} />
                              )}
                            </div>
                            {/* <div>
                        {props.location.state.data.productId.description ===
                          "Electricity Prepaid" &&
                        props.location.state.data.productId.productname ===
                          "Eko Electricity Prepaid" ? (
                          <Electricity dataPay={onPay} />
                        ) : (
                          ""
                        )}
                      </div> */}
                            {
                              <CoralUssd
                                body={ussdPayload}
                                onSuccess={grabUssdResponse}
                              />
                            }
                            <div>
                              {productDetails.detail.productId.description ===
                                "Cable" && (
                                <Cable
                                  loading={secondaryLoading}
                                  dataCable={props.location.state}
                                  dataPay={onPay}
                                />
                              )}
                            </div>
                            <div>
                              {productDetails.detail.productId.description ===
                                "Airtime" && <Airtime dataPay={onPay} />}
                            </div>
                            <div>
                              {productDetails.detail.productId.description ===
                                "Data" && <Data dataPay={onPay} />}
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
