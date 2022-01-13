import React, { useState, useEffect } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import Alert from "@material-ui/lab/Alert";
import ForgotPasswords from "../reg/ForgotPassword";
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
  let data = sectiondata.whychooseus;

  useEffect(() => {
    if (error.id === "FORGOT_PASSWORD_FAIL") {
      props.hideLoader();
      setErrMessage(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (forgotPassword.forgotPassword === true) {
      setMessage(forgotPassword.msg.message);
      setForgotP(true);
    } else {
      setMessage("Something went wrong...")
    }
  }, [forgotPassword.forgotPassword === true]);

  return (
    <div className="register-page-area pd-bottom-100">
      <div className="container">
        <div className="row justify-content-center">
          {/* forgot password */}
          {forgotP === false ? (
            <ForgotPasswords
              data={error.id === "FORGOT_PASSWORD_FAIL" ? errMessage : ""}
            />
          ) : (
            <div className="register-page-area pd-top-100 mt-2">
              <Alert severity="success">{message+" Thank you."}</Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(connect(null, { hideLoader })(ForgotPassword));
