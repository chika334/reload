// import React, { useState, useEffect, useRef } from "react";
// import { Form, TextField, SubmitButton } from "../../Form/FormElements";
// import * as Yup from "yup";
// import { useSelector, connect, useDispatch } from "react-redux";
// import { withRouter } from "react-router-dom";
// import { paymentButton } from "../../../_action/paymentAction";
// import md5 from "md5";
// import axios from "axios";
// import { Button } from "@material-ui/core";
// // import PaymentProcess from "../../Pay/PaymentProcess";

// const formSchema = {
//   email: {
//     type: "email",
//     label: "Email",
//     placeholder: "Enter Email Address",
//     required: true,
//   },
//   meterNumber: {
//     type: "number",
//     label: "Meter Number",
//     placeholder: "Enter Meter Number",
//     required: true,
//   },
//   phone: {
//     type: "number",
//     label: "Phone Number",
//     placeholder: "Enter Phone Number",
//     required: true,
//   },
//   amount: {
//     type: "number",
//     label: "Amount",
//     placeholder: "Enter Amount",
//     required: true,
//   },
// };

// export function AirtimePay(props) {
//   const user = useSelector((state) => state.authUser);
//   const payButtonClick = useSelector((state) => state.paymentReducer);
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({});
//   const [validationSchema, setValidationSchema] = useState({});
//   const [body, setBody] = useState({});
//   const [pay, setPay] = useState(false);
//   const [open, setOpen] = React.useState(false);
//   // const [electricRadio, setElectricRadio] = useState("");
//   const [buttonValue, setButtonValue] = useState({});
//   const [otherData, setOtherData] = useState({
//     phone: "",
//     email: "",
//     amount: "",
//     metarNumber: "",
//   });

//   // const { metaNumber, metaName } = values;
//   const { phone, email, amount, metarNumber } = otherData;

//   const handlechange = (name) => (e) => {
//     setOtherData({ ...otherData, [name]: e.target.value });
//   };

//   const transactionId = Math.random() + 877298;
//   const hashCode = md5(`${process.env.REACT_APP_HASHKEY}`);
//   // console.log(hashCode);

//   const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
//     const config = {
//       headers: {
//         Accept: "application/json",
//       },
//     };

//     const body = {
//       publicKey: `${process.env.REACT_APP_PUBLIC_KEY}`,
//       logoURL:
//         "https://api.elasticemail.com/userfile/5d028e25-bd86-4559-b7c2-31e5870bbbf9/accessnew.jpg",
//       transactionId: transactionId,
//       amount: values.amount,
//       currency: "NGN",
//       country: "NG",
//       email: values.email,
//       phoneNumber: values.phone,
//       firstName: user.user.firstName,
//       lastName: user.user.lastName,
//       hash: hashCode,
//       meta: [
//         {
//           metaName: props.dataTitle,
//           metaValue: values.meterNumber,
//         },
//       ],
//       // callbackUrl: "https://www.sample.xpresspayments.com/resp",
//       callbackUrl: process.env.REACT_APP_CALLBACKURL,
//     };

//     axios
//       .post(
//         `https://xpresspayonlinesandbox.xpresspayments.com:8000/payments/form`,
//         body,
//         config
//       )
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err));
//   };

//   // const handlePayment = (data) => {
//   //   // console.log(data);
//   //   setButtonValue(data);
//   // };

//   // console.log(props);

//   return (
//     <div className="contact-form-wrap contact-form-bg h-100">
//       <div className="p-3">
//         <h4 className="text-center p-3">Select Payment Method</h4>
//         <hr />
//         {/* <PaymentProcess /> */}
//       </div>
//     </div>
//   );
// }

// export default withRouter(connect(null, { paymentButton })(AirtimePay));
