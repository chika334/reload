import React, { useRef, useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { LoginUser } from "../../_action/userAction";
import { connect, useSelector, useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../_action/loading";
import { Form, TextField, SubmitButton } from "../Form/FormElements";
import * as Yup from "yup";
import Alert from "@material-ui/lab/Alert";
import { loginRedirect } from "../../_action/UserRedirect";
import { clearErrors } from "../../_action/errorAction";
import "../../css/input.css";

const formSchema = {
  email: {
    type: "email",
    label: "Email",
    placeholder: "Enter Email Address",
    required: true,
  },
  password: {
    type: "password",
    label: "Password",
    placeholder: "Enter Password",
    required: true,
  },
};

function Login(props) {
  const user = useSelector((state) => state.authUser);
  const error = useSelector((state) => state.error);
  const loginSuccRed = useSelector((state) => state.login_success_red);
  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});
  const [errMessage, setErrMessage] = useState("");
  let dispatch = useDispatch();

  useEffect(() => {
    if (error.id === "LOGIN_FAILED") {
      props.hideLoader();
      setErrMessage(error.message);
    } else {
      if (user.isLogin === true && localStorage.token) {
        props.clearErrors();
        // if (loginSuccRed.login === true && loginSuccRed.value !== "") {
        //   props.history.push(loginSuccRed.value);
        // } else {
        //   props.history.push("/");
        // }
        window.location.href = "/";
        // props.loginRedirect();
      } else {
        props.hideLoader();
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
      } else if (formSchema[key].type === "password") {
        _validationSchema[key] = Yup.string();
      }

      if (formSchema[key].required) {
        _validationSchema[key] = _validationSchema[key].required("Required");
      }
    }

    setFormData(_formData);
    setValidationSchema(Yup.object().shape({ ..._validationSchema }));
  };

  const handlechange = (name) => (e) => {
    setFormData({ ...formData, [name]: e.target.value });
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
          <TextField
            value={formData.password || ""}
            onChange={handlechange("password")}
            id="passwords"
            // style={{ width: "100%" }}
            className="inputSize"
            {...props}
          />
          <div />
        </div>
      );
    } else if (elementSchema.type === "email") {
      return (
        <div>
          <TextField
            value={formData.email || ""}
            onChange={handlechange("email")}
            id="emails"
            // style={{ width: "100%" }}
            className="inputSize"
            {...props}
          />
          <div />
        </div>
      );
    }
  };

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    props.showLoader();
    setSubmitting(false);

    console.log(values);
    props.LoginUser(values);
  };

  return (
    <div className="col-xl-4 col-lg-5 col-md-6 mb-5 mb-md-0">
      <div className="contact-form-wrap contact-form-bg">
        <Form
          enableReinitialize
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <h4>Login</h4>
          <p>
            {props.data.message && (
              <Alert severity="error">{props.data.message}</Alert>
            )}
          </p>
          {Object.keys(formSchema).map((key, ind) => (
            <div className="rld-single-input" key={key}>
              {getFormElement(key, formSchema[key])}
            </div>
          ))}
          <div
            style={{
              position: "absolute",
              right: 30,
              padding: "15px",
            }}
          >
            <a href="/forgotpassword">Forgot Password</a>
          </div>
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
              title="Sign In"
            />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default withRouter(
  connect(null, {
    LoginUser,
    showLoader,
    hideLoader,
    loginRedirect,
    clearErrors,
  })(Login)
);
