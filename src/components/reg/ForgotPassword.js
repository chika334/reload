import React, { useRef, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../_action/loading";
import { Form, TextField, SubmitButton } from "../Form/FormElements";
import * as Yup from "yup";
import Alert from "@material-ui/lab/Alert";
import { loginRedirect } from "../../_action/UserRedirect";
import { clearErrors } from "../../_action/errorAction";
import { forgotPassword } from "../../_action/userAction";

const formSchema = {
  email: {
    type: "email",
    label: "Email",
    placeholder: "Enter Email Address",
    required: true,
  },
};

function ForgotPassword(props) {
  const user = useSelector((state) => state.authUser);
  const error = useSelector((state) => state.error);
  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});
  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  let dispatch = useDispatch();

  console.log(user);

  useEffect(() => {
    if (error.id === "FORGOT_PASSWORD_FAIL") {
      props.hideLoader();
      setErrMessage(error.message);
    } else {
      if (user.forgotPassword === true) {
        setSuccessMessage(user.msg.message);
      }
    }
  }, [user.isAuthenticated]);

  useEffect(() => {
    initForm(formSchema);
  }, []);

  const initForm = (formSchema) => {
    let _formData = {};
    let _validationSchema = {};

    for (var key of Object.keys(formSchema)) {
      _formData[key] = "";

      if (formSchema[key].type === "email") {
        _validationSchema[key] = Yup.string();
      }

      if (formSchema[key].required) {
        _validationSchema[key] = _validationSchema[key].required("Required");
      }
    }

    setFormData(_formData);
    setValidationSchema(Yup.object().shape({ ..._validationSchema }));
  };

  const getFormElement = (elementName, elementSchema) => {
    const props = {
      name: elementName,
      type: elementSchema.type,
      label: elementSchema.label,
      options: elementSchema.options,
      placeholder: elementSchema.placeholder,
    };

    if (elementSchema.type === "email") {
      return (
        <div>
          <TextField id="emails" style={{ width: "100%" }} {...props} />
          <div />
        </div>
      );
    }
  };

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    props.showLoader();
    setSubmitting(false);

    props.forgotPassword(values);
  };

  return (
    // <div className="d-flex align-items-center justify-content-center">
    <div className="col-xl-4 col-lg-5 col-md-6 mb-5 mb-md-0">
      <div className="mt-5 contact-form-wrap contact-form-bg">
        <Form
          enableReinitialize
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <h4 style={{ textAlign: "center" }}>Forgot Password</h4>
          <p>{errMessage && <Alert severity="error">{errMessage}</Alert>}</p>
          <p>
            {successMessage && <Alert severity="error">{successMessage}</Alert>}
          </p>
          {Object.keys(formSchema).map((key, ind) => (
            <div className="rld-single-input" key={key}>
              {getFormElement(key, formSchema[key])}
            </div>
          ))}
          <div className="d-flex align-items-center justify-content-center mt-3">
            <SubmitButton
              // style={{
              //   backgroundColor: "#FDC902",
              //   fontSize: "12px",
              //   padding: "10px",
              // }}
              style={{
                backgroundColor: "#fda94f",
                color: "#000",
                padding: "15px",
              }}
              title="Submit"
            />
          </div>
        </Form>
      </div>
    </div>
    // </div>
  );
}

export default withRouter(
  connect(null, {
    showLoader,
    hideLoader,
    loginRedirect,
    clearErrors,
    forgotPassword,
  })(ForgotPassword)
);
