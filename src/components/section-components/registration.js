import React, { useState, useEffect } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import Register from "../reg/Register";
import Login from "../reg/Login";
import { useSelector, connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { hideLoader } from "../../_action/loading";
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Registration(props) {
  const classes = useStyles();
  let history = useHistory();
  const userRedirect = useSelector((state) => state.redirectUser);
  const [errMessage, setErrMessage] = useState("");
  const error = useSelector((state) => state.error);
  // const [modal, setModal] = useState(false);
  // let publicUrl = process.env.PUBLIC_URL + "/";
  // let imagealt = "image";
  let data = sectiondata.whychooseus;

  useEffect(() => {
    if (userRedirect.login === true) {
      // let path = `/`;
      // history.push(path);
      // window.location.reload(false);
      window.location.href = "/";
    } else if (userRedirect.register === true) {
      let path = `/registration`;
      history.push(path);
      // let path = `/welcome`;
      // history.push(path);
      // window.location.href = "/welcome";
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
          {/* Login */}
          <Login data={error.id === "LOGIN_FAILED" ? error.message : ""} />
          <Register
            // modal={showModal}
            data={error.id === "REGISTER_FAIL" ? error.message : ""}
          />
          {/* registration */}
        </div>
      </div>
    </div>
  );
}

export default withRouter(connect(null, { hideLoader })(Registration));
