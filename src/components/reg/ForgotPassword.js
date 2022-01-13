import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../_action/loading";
import { TextField, Button } from "@material-ui/core";
import { loginRedirect } from "../../_action/UserRedirect";
import { clearErrors } from "../../_action/errorAction";
import { forgotPassword } from "../../_action/userAction";

function ForgotPassword(props) {
  const user = useSelector((state) => state.authUser);
  const [getData, setGetData] = useState("");
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (error.id === "FORGOT_PASSWORD_FAIL") {
      props.hideLoader();
      setErrMessage(error.message);
    }
  }, [user.isAuthenticated === false]);

  const handleChange = (e) => {
    setGetData(e.target.value);
  };

  const handleClick = () => {
    props.showLoader();

    const values = {
      email: getData,
    };

    props.forgotPassword(values);
  };

  return (
    <div className="col-xl-4 col-lg-5 col-md-6 mb-5 mb-md-0">
      <div className="mt-5 contact-form-wrap contact-form-bg">
        <form>
          <div className="rld-single-input">
            <TextField
              id="emails"
              type="email"
              placeholder="Please enter email address"
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
    forgotPassword,
  })(ForgotPassword)
);
