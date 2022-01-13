import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../_action/loading";
import { Form, TextField, SubmitButton } from "../Form/FormElements";
import * as Yup from "yup";
import { RegUser } from "../../_action/userAction";
import Alert from "@material-ui/lab/Alert";
import { regRedirect } from "../../_action/UserRedirect";
import { clearErrors } from "../../_action/errorAction";

const formSchema = {
  fullname: {
    type: "text",
    name: "fullname",
    label: "Full Name",
    placeholder: "Enter Full Name",
    required: true,
  },
  email: {
    type: "email",
    name: "email",
    label: "Email",
    placeholder: "Enter Email Address",
    required: true,
  },
  phone: {
    type: "number",
    name: "phone",
    label: "Phone",
    placeholder: "Enter Phone Number",
    required: true,
  },
  password: {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Enter Password",
    required: true,
  },
  address: {
    type: "text",
    name: "address",
    label: "Address",
    placeholder: "Enter Address",
    required: true,
  },
};

function Register(props) {
  const user = useSelector((state) => state.authUser);
  const error = useSelector((state) => state.error);
  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});

  // console.log(props);

  useEffect(() => {
    if (error.id === "REGISTER_FAIL") {
      props.hideLoader();
    } else {
      if (user.isRegister === true && localStorage.token) {
        props.clearErrors();
        props.regRedirect();
        // props.history.push("/registration");
        window.location.href = `/${process.env.REACT_APP_RELOADNG}`;
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

      if (formSchema[key].type === "text") {
        _validationSchema[key] = Yup.string();
      } else if (formSchema[key].type === "email") {
        _validationSchema[key] = Yup.string();
      } else if (formSchema[key].type === "password") {
        _validationSchema[key] = Yup.string();
      } else if (formSchema[key].type === "number") {
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

    if (elementSchema.name === "password") {
      return (
        <div>
          <TextField
            value={formData.password || ""}
            onChange={handlechange("password")}
            style={{ width: "100%" }}
            {...props}
          />
          <div />
        </div>
      );
    } else if (elementSchema.name === "email") {
      return (
        <div>
          <TextField
            value={formData.email || ""}
            onChange={handlechange("email")}
            style={{ width: "100%" }}
            {...props}
          />
          <div />
        </div>
      );
    } else if (elementSchema.name === "fullname") {
      return (
        <div>
          <TextField
            value={formData.fullname || ""}
            onChange={handlechange("fullname")}
            style={{ width: "100%" }}
            {...props}
          />
          <div />
        </div>
      );
    } else if (elementSchema.name === "address") {
      return (
        <div>
          <TextField
            value={formData.address || ""}
            onChange={handlechange("address")}
            style={{ width: "100%" }}
            {...props}
          />
          <div />
        </div>
      );
    } else if (elementSchema.name === "phone") {
      return (
        <div>
          <TextField
            value={formData.phone || ""}
            onChange={handlechange("phone")}
            style={{ width: "100%" }}
            {...props}
          />
          <div />
        </div>
      );
    }
  };

  const onSubmit = (values, { setSubmitting }) => {
    props.showLoader();
    // console.log(values);
    setSubmitting(false);

    props.clearErrors();
    // console.log(values);
    setTimeout(() => {
      props.RegUser(values);
    }, 500);
  };

  return (
    <div className="col-xl-4 col-lg-5 col-md-6">
      <div className="contact-form-wrap contact-form-bg">
        <Form
          enableReinitialize
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <h4>Register</h4>
          <div>
            {props.data.message && (
              <Alert severity="error">{props.data.message}</Alert>
            )}
          </div>
          {Object.keys(formSchema).map((key) => (
            <div className="rld-single-input" key={key}>
              {getFormElement(key, formSchema[key])}
            </div>
          ))}
          <div className="d-flex align-item-center justify-content-center">
            <SubmitButton
              onSubmit={onSubmit}
              style={{
                backgroundColor: "#fda94f",
                color: "#000",
                padding: "15px",
              }}
              title="Register"
            />
          </div>
          <ul className="social-icon">
            <li className="ml-0">
              <a href="#" target="_blank">
                <i className="fa fa-facebook  " />
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                <i className="fa fa-twitter  " />
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                <i className="fa fa-linkedin" />
              </a>
            </li>
          </ul>
        </Form>
      </div>
    </div>
  );
}

export default withRouter(
  connect(null, { regRedirect, RegUser, showLoader, hideLoader, clearErrors })(
    Register
  )
);
