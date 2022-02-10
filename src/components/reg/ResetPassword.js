import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../_action/loading";
import { TextField, Button } from "@material-ui/core";
import { loginRedirect } from "../../_action/UserRedirect";
import { clearErrors } from "../../_action/errorAction";
import { resetPassword } from "../../_action/userAction";
import { Prompt } from "react-router";
import Alert from "@material-ui/lab/Alert";

function ForgotPassword(props) {
  const forgotPassword = useSelector((state) => state.forgotReducer);
  const [errMessage, setErrMessage] = React.useState("")
  const [getData, setGetData] = useState("");
  const [blocking, setBlocking] = useState(false);
  const error = useSelector((state) => state.error);
  const [uid, setUid] = useState();

  useEffect(() => {
    if (error.id === "RESET_PASSWORD_FAIL") {
      props.hideLoader();
      setErrMessage(error.message);
    }
  }, [forgotPassword.resetPassword === false]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const productKey = params.get("token");
    setUid(productKey);
  }, [props.location]);

  const handleChange = (e) => {
    setGetData(e.target.value);
  };

  const handleClick = () => {
    props.showLoader();

    const values = {
      uid: uid,
      password: getData,
    };

    props.resetPassword(values);
  };

  return (
    <div className="col-xl-4 col-lg-5 col-md-6 mb-5 mb-md-0">
      <Prompt
        when={blocking}
        message={() => `On reload all transaction history will b lost`}
      />
      <div className="mt-5 contact-form-wrap contact-form-bg">
        <p>
          {errMessage && (
            <Alert severity="error">{errMessage}</Alert>
          )}
        </p>
        <form>
          <div className="rld-single-input">
            <TextField
              id="emails"
              type="password"
              placeholder="Please Enter New Password"
              style={{ width: "100%" }}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex align-items-center justify-content-center mt-3">
            <Button
              style={{
                backgroundColor: "#fda94f",
                color: "#000",
                padding: "15px",
              }}
              onClick={handleClick}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(
  connect(null, {
    showLoader,
    hideLoader,
    loginRedirect,
    clearErrors,
    resetPassword,
  })(ForgotPassword)
);
