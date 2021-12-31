import React, { useState, useEffect } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import ForgotPasswords from "../reg/ForgotPassword";
import { useSelector, connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { hideLoader } from "../../_action/loading";

function ForgotPassword(props) {
  let history = useHistory();
  const userRedirect = useSelector((state) => state.redirectUser);
  const [errMessage, setErrMessage] = useState("");
  const error = useSelector((state) => state.error);
  let data = sectiondata.whychooseus;

  useEffect(() => {
    if (userRedirect.login === true) {
      window.location.href = "/";
    } else if (userRedirect.register === true) {
      let path = `/welcome`;
      history.push(path);
    }
  }, [userRedirect]);

  useEffect(() => {
    if (error.id === "LOGIN_FAILED") {
      props.hideLoader();
      setErrMessage(error.message);
    } else if (error.id === "REGISTER_FAIL") {
      props.hideLoader();
      setErrMessage(error.message);
    }
  }, [error]);

  return (
    <div className="register-page-area pd-bottom-100">
      <div className="container">
        <div className="row justify-content-center">
          {/* forgot password */}
          <ForgotPasswords
            data={error.id === "REGISTER_FAIL" ? error.message : ""}
          />
        </div>
      </div>
    </div>
  );
}

export default withRouter(connect(null, { hideLoader })(ForgotPassword));
