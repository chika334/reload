import React, { Component } from "react";
import { logout } from "../../_action/userAction";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { showLoader, hideLoader } from "../../_action/loading";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

export class Logout extends Component {
  static propType = {
    logout: PropTypes.func.isRequired,
  };

  LogoutUser = (e) => {
    // this.props.showLoader();
    // e.preventDefault();
    // if (localStorage.token) {
    //   this.props.logout();
    //   window.location.href = `/`;
    // }
  };

  componentDidMount() {
    return (e) => this.LogoutUser(e);
  }

  render() {
    return (
      <Button
        // style={{ backgroundColor: "#fda94f", color: "#fff", padding: "10px" }}
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
        onClick={(e) => this.LogoutUser(e)}
      >
        Signout
      </Button>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.authUser.isAuthenticated,
});

export default withRouter(
  connect(mapStateToProps, { logout, showLoader, hideLoader })(Logout)
);
