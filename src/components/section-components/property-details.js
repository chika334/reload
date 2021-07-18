import React, { useState, useEffect } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import { withRouter, Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { hideLoader } from "../../_action/loading";
import { Button } from "@material-ui/core";
import ProductTable from "./productDetails/productTable";
import { products } from "../../data/products";
import { Form, TextField, SubmitButton } from "../Form/FormElements";
import * as Yup from "yup";
import FormPay from "../reg/Pay/FormPay";
import AirtimePay from "../reg/Pay/Airtime";
import DataPay from "../reg/Pay/DataPay";
import CablePay from "../reg/Pay/Cable";
import ExamPay from "../reg/Pay/Exams";
import Electricity from "../Pay/Electricity";
import Cable from "../Pay/Cable";
import Airtime from "../Pay/Airtime";
import Data from "../Pay/Data";
import Exams from "../Pay/Exams";

const formSchema = {
  meter: {
    type: "number",
    label: "Meter Number",
    placeholder: "Enter Meter Number",
    required: true,
  },
};

function PropertyDetails(props) {
  const exploreProducts = useSelector((state) => state.exploreProducts);
  const dispatch = useDispatch();
  const [pay, setPay] = useState(false);
  const [productData, setProductData] = useState();
  const [type, setType] = useState("");
  const [buttonPayment, setButtonPayment] = useState(false);
  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});
  const [amount, setAmount] = useState("");

  useEffect(() => {
    initForm(formSchema);
  }, []);

  const initForm = (formSchema) => {
    let _formData = {};
    let _validationSchema = {};

    for (var key of Object.keys(formSchema)) {
      _formData[key] = "";

      if (formSchema[key].type === "number") {
        _validationSchema[key] = Yup.string();
      }

      // console.log(formSchema[key].required);
      if (formSchema[key].required) {
        _validationSchema[key] = _validationSchema[key]
          .required("Required")
          .min(11, "Minimum of 11 charcters required");
      }
    }

    setFormData(_formData);
    setValidationSchema(Yup.object().shape({ ..._validationSchema }));
  };

  const onPay = (val, type) => {
    setPay(val);
    setType(type);
  };

  const onpaymentProcess = (data) => {
    // console.log(data);
    setButtonPayment(data);
  };

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const productKey = params.get("product");
    setProductData(products[productKey]);
  }, [props.location]);

  return (
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
                      src={`${props.location.state.data.productId.logourl}`}
                      alt="image"
                    />
                  </div>
                </div>
                <div className="d-flex align-item-center justify-content-center">
                  <h4>{props.location.state.data.title}</h4>
                </div>
                <div className="property-details-slider-info">
                  <div className="">
                    <div className="mt-5">
                      <div>
                        {props.location.state.data.productId.description ===
                          "Electricity Prepaid" && (
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
                      <div>
                        {props.location.state.data.productId.description ===
                          "Cable" && (
                          <Cable
                            dataCable={props.location.state}
                            dataPay={onPay}
                            onpaymentProcess={onpaymentProcess}
                          />
                        )}
                      </div>
                      <div>
                        {props.location.state.data.productId.description ===
                          "Airtime" && <Airtime dataPay={onPay} />}
                      </div>
                      <div>
                        {props.location.state.data.productId.description ===
                          "Data" && <Data dataPay={onPay} />}
                      </div>
                      <div>
                        {props.location.state.data.productId.description ===
                          "Exams" && (
                          <Exams
                            productData={props.location.state.data}
                            dataPay={onPay}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {pay === true && type === "Electricity" && (
              <div className="col-lg-4">
                <FormPay dataTitle={props.location.state.data.title} />
              </div>
            )}
            {type === "Airtime" && pay === true && (
              <div className="col-lg-4">
                <AirtimePay
                  // amount={amount}
                  dataTitle={props.location.state.data.title}
                />
              </div>
            )}
            {type === "Data" && pay === true && (
              <div className="col-lg-4">
                <DataPay
                  // amount={amount}
                  dataTitle={props.location.state.data.title}
                />
              </div>
            )}
            {type === "Cable" && pay === true && (
              <div className="col-lg-4">
                <CablePay
                  // amount={amount}
                  dataTitle={props.location.state.data.title}
                />
              </div>
            )}
            {type === "Exams" && pay === true ? (
              <div className="col-lg-4">
                <ExamPay
                  TypeOfProduct={type}
                  // amount={amount}
                  dataTitle={props.location.state.data.title}
                />
              </div>
            ) : type === "Exams" && pay === true ? (
              <div className="col-lg-4">
                <ExamPay
                  TypeOfProduct={type}
                  // amount={amount}
                  dataTitle={props.location.state.data.title}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  exploreProducts: state.exploreProducts,
});

export default withRouter(
  connect(mapStateToProps, { hideLoader })(PropertyDetails)
);
