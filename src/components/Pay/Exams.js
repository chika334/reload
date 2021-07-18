import React, { useState, useEffect } from "react";
import { Form, TextField, SubmitButton } from "../Form/FormElements";
import * as Yup from "yup";
import FormPay from "../reg/Pay/FormPay";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import WaecReg from "./waecReg";

function Exams(props) {
  return (
    <div>
      {props.productData.productId.productname ===
        "Waec Exams Registration" && <WaecReg data={props.pay} />}
      {/* {props.productData.productId.productname === "Jamb Exams" && (
        <div className="property-details-area">
          <Form
            enableReinitialize
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {Object.keys(formSchema).map((key, ind) => (
              <div
                className="d-flex align-item-center justify-content-center"
                key={key}
              >
                {getFormElement(key, formSchema[key])}
              </div>
            ))}
            <div className="d-flex align-item-center justify-content-center">
              <SubmitButton
                style={{
                  backgroundColor: "#fda94f",
                  color: "#000",
                  fontSize: "12px",
                  padding: "11px",
                }}
                title="Proceed to payment"
              />
            </div>
          </Form>
        </div>
      )} */}
    </div>
  );
}

export default withRouter(connect(null, null)(Exams));
