import React, { useRef, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { ChangeuserPassword } from "../../_action/userAction";
import { connect, useSelector, useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../_action/loading";
import { Form, TextField, SubmitButton } from "../Form/FormElements";
import * as Yup from "yup";
import Alert from "@material-ui/lab/Alert";
// import { loginRedirect } from "../../_action/UserRedirect";
import { clearErrors } from "../../_action/errorAction";

const formSchema = {
  oldPassword: {
    type: "password",
    label: "Old Password",
    placeholder: "Enter Old Password",
    required: true,
  },
  NewPassword: {
    type: "password",
    label: "New Password",
    placeholder: "Enter New Password",
    required: true,
  },
};

function ChangeUserPassword(props) {
  const user = useSelector((state) => state.authUser);
  const passwordChanged = useSelector((state) => state.changePassword);
  const error = useSelector((state) => state.error);
  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});
  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  let dispatch = useDispatch();

  useEffect(() => {
    if (error.id === "PASSWORD_CHANGE_FAILED") {
      props.hideLoader();
      setErrMessage(error.message);
    } else {
      if (passwordChanged.passwordChanged === true) {
        setSuccessMessage(passwordChanged.msg.message);
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

    if (elementSchema.type === "password") {
      return (
        <div>
          <TextField id="passwords" style={{ width: "100%" }} {...props} />
          <div />
        </div>
      );
    }
  };

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    // props.showLoader();
    setSubmitting(false);

    const userID = user.user === null ? "" : user.user.user.id;
    const newDetails = Object.assign(values, { customerId: userID });
    console.log(newDetails);
    props.ChangeuserPassword(newDetails);
  };

  return (
    // <div className="col-xl-4 col-lg-5 col-md-6 mb-5 mb-md-0">
    <div className="d-flex align-items-center justify-content-center">
      <div className="contact-form-wrap contact-form-bg">
        <Form
          enableReinitialize
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <h4>Change Password</h4>
          <p>{errMessage && <Alert severity="error">{errMessage}</Alert>}</p>
          <p>
            {successMessage && (
              <Alert severity="success">{successMessage}</Alert>
            )}
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
  );
}

export default withRouter(
  connect(null, {
    ChangeuserPassword,
    showLoader,
    hideLoader,
    // loginRedirect,
    clearErrors,
  })(ChangeUserPassword)
);
