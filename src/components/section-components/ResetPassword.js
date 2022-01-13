import React, { useState, useEffect } from "react";
import sectiondata from "../../data/sections.json";
import Alert from "@material-ui/lab/Alert";
import { Button } from "@material-ui/core";
import ResetPassword from "../reg/ResetPassword";
import { useSelector, connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { hideLoader } from "../../_action/loading";

function ForgotPassword(props) {
  let history = useHistory();
  const forgotPassword = useSelector((state) => state.forgotReducer);
  const userRedirect = useSelector((state) => state.redirectUser);
  const [errMessage, setErrMessage] = useState("");
  const [message, setMessage] = useState(null);
  const [forgotP, setForgotP] = useState(false);
  const error = useSelector((state) => state.error);
  // let data = sectiondata.whychooseus;

  useEffect(() => {
    if (error.id === "RESET_PASSWORD_FAIL") {
      props.hideLoader();
      setErrMessage(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (forgotPassword.resetPassword === true) {
      setMessage(forgotPassword.msg.message);
      localStorage.setItem("reset", true);
      setForgotP(true);
    } else {
      setMessage("Something went wrong...");
    }
  }, [forgotPassword.resetPassword === true]);

  const handleClick = () => {
    window.location.href = `/${process.env.REACT_APP_RELOADNG}/registration`;
  };

  return (
    <div className="register-page-area pd-bottom-100">
      <div className="container">
        <div className="row pd-top-100 justify-content-center">
          {/* reset password */}
          {forgotP === false ? (
            <ResetPassword
              data={error.id === "RESET_PASSWORD_FAIL" ? errMessage : ""}
            />
          ) : (
            <div className="register-page-area pd-top-100 mt-2">
              <Alert severity="success">{message + " Please Login."}</Alert>
              <div className="d-flex mt-3 justify-content-center">
                <Button
                  style={{
                    backgroundColor: "#fda94f",
                    color: "#000",
                    padding: "15px",
                  }}
                  onClick={handleClick}
                >
                  Login
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(connect(null, { hideLoader })(ForgotPassword));
