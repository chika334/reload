import React, { useState, useEffect, useRef } from "react";
import { Form, TextField, SubmitButton } from "../../Form/FormElements";
import * as Yup from "yup";
import { useSelector, connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { paymentButton } from "../../../_action/paymentAction";
import md5 from "md5";
import axios from "axios";
// import PaymentProcess from "../../Pay/PaymentProcess";
import { Button } from "@material-ui/core";

const formSchema = {
  email: {
    type: "email",
    label: "Email",
    placeholder: "Enter Email Address",
    required: true,
  },
  meterNumber: {
    type: "number",
    label: "Meter Number",
    placeholder: "Enter Meter Number",
    required: true,
  },
  phone: {
    type: "number",
    label: "Phone Number",
    placeholder: "Enter Phone Number",
    required: true,
  },
  amount: {
    type: "number",
    label: "Amount",
    placeholder: "Enter Amount",
    required: true,
  },
};

export function ExamsPay(props) {
  const user = useSelector((state) => state.authUser);
  const payButtonClick = useSelector((state) => state.paymentReducer);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});
  const [body, setBody] = useState({});
  const [pay, setPay] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [electricRadio, setElectricRadio] = useState("");
  const [otherData, setOtherData] = useState({
    phone: "",
    email: "",
    amount: "",
    metarNumber: "",
  });

  // const { metaNumber, metaName } = values;
  const { phone, email, amount, metarNumber } = otherData;

  const handlechange = (name) => (e) => {
    setOtherData({ ...otherData, [name]: e.target.value });
  };

  useEffect(() => {
    initForm(formSchema);
  }, []);

  const initForm = (formSchema) => {
    let _formData = {};
    let _validationSchema = {};

    for (var key of Object.keys(formSchema)) {
      _formData[key] = "";

      console.log(formSchema);
      if (formSchema[key].type === "email") {
        _validationSchema[key] = Yup.string();
      } else if (formSchema[key].type === "number") {
        _validationSchema[key] = Yup.string();
      } else if (formSchema[key].type === "number") {
        _validationSchema[key] = Yup.string();
      }

      console.log(formSchema[key].required);
      if (formSchema[key].required) {
        _validationSchema[key] = _validationSchema[key]
          .required("Required")
          .min(0, "Minimum of 11 charcters required");
      }
    }

    setFormData(_formData);
    setValidationSchema(Yup.object().shape({ ..._validationSchema }));
  };

  const getFormElement = (elementName, elementSchema) => {
    const props = {
      name: elementName,
      label: elementSchema.label,
      options: elementSchema.options,
      placeholder: elementSchema.placeholder,
    };

    if (elementSchema.type === "number") {
      return (
        <div>
          <TextField style={{ width: "100%" }} {...props} />
          <div />
        </div>
      );
    } else if (elementSchema.type === "email") {
      return (
        <div>
          <TextField style={{ width: "100%" }} {...props} />
          <div />
        </div>
      );
    }
  };
  const transactionId = Math.random() + 877298;
  const hashCode = md5(`${process.env.REACT_APP_HASHKEY}`);
  // console.log(hashCode);

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    // e.preventDefault();

    console.log(values);
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    const body = {
      publicKey: `${process.env.REACT_APP_PUBLIC_KEY}`,
      logoURL:
        "https://api.elasticemail.com/userfile/5d028e25-bd86-4559-b7c2-31e5870bbbf9/accessnew.jpg",
      transactionId: transactionId,
      amount: values.amount,
      currency: "NGN",
      country: "NG",
      email: values.email,
      phoneNumber: values.phone,
      firstName: user.user.firstName,
      lastName: user.user.lastName,
      hash: hashCode,
      meta: [
        {
          metaName: props.dataTitle,
          metaValue: values.meterNumber,
        },
      ],
      // callbackUrl: "https://www.sample.xpresspayments.com/resp",
      callbackUrl: process.env.REACT_APP_CALLBACKURL,
    };

    axios
      .post(
        `https://xpresspayonlinesandbox.xpresspayments.com:8000/payments/form`,
        body,
        config
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleSelected = (e) => {
    console.log(e.target.value);
    setElectricRadio(e.target.value);
  };

  // console.log(props);

  return (
    // <div className="contact-form-wrap contact-form-bg h-100">
    //   <div className="p-3">
    //     <h4 className="text-center p-3">Payment process</h4>
    //     <div className="pt-3 d-flex align-item-center justify-content-center">
    //       <h6 className="pr-2">Email: </h6>
    //       <h6>{user === null ? "" : user.user.user.email}</h6>
    //     </div>
    //     <div className="pt-3 d-flex align-item-center justify-content-center">
    //       <h6 className="pr-2">User Phone Number: </h6>
    //       <h6>{user === null ? "" : user.user.user.phone}</h6>
    //     </div>
    //     <div className="pt-3 d-flex align-item-center justify-content-center">
    //       <h6 className="pr-2">Amount: </h6>
    //       <h6>{props.amount}</h6>
    //     </div>
    //   </div>
    //   <div className="d-flex align-item-center justify-content-center">
    //     <button
    //       // className="btn btn-yellow mt-5 js-btn"
    //       style={{
    //         backgroundColor: "#FDC902",
    //         fontSize: "12px",
    //         padding: "10px",
    //       }}
    //     >
    //       Pay
    //     </button>
    //   </div>
    // </div>
    <div className="contact-form-wrap contact-form-bg h-100">
      <div className="p-3">
        <h4 className="text-center p-3">Select Payment Method</h4>
        <hr />
        {/* <PaymentProcess /> */}
      </div>
    </div>
  );
}

export default withRouter(connect(null, { paymentButton })(ExamsPay));
