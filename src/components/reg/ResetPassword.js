import React, { useRef, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../_action/loading";
import { Form, TextField, SubmitButton } from "../Form/FormElements";
import * as Yup from "yup";
import Alert from "@material-ui/lab/Alert";
import { loginRedirect } from "../../_action/UserRedirect";
import { clearErrors } from "../../_action/errorAction";
import { resetPassword } from "../../_action/userAction";

const formSchema = {
  password: {
    type: "password",
    label: "Password",
    placeholder: "Enter Password",
    required: true,
  },
};

function ResetPassword(props) {
  const user = useSelector((state) => state.authUser);
  const error = useSelector((state) => state.error);
  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});
  const [errMessage, setErrMessage] = useState("");
  let dispatch = useDispatch();

  console.log(user);

  useEffect(() => {
    if (error.id === "LOGIN_FAILED") {
      props.hideLoader();
      setErrMessage(error.message);
    } else {
      if (user.isLogin === true && localStorage.token) {
        console.log("good");
      } else {
        props.hideLoader();
        console.log("issues");
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

      if (formSchema[key].type === "password") {
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

    props.ForgotPassword(values);
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
          {/* <p>
            {props.data.message && (
              <Alert severity="error">{props.data.message}</Alert>
            )}
          </p> */}
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
    resetPassword,
  })(ResetPassword)
);
