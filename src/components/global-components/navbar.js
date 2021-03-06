import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
import { useSelector } from "react-redux";
import { Button, Popover, Collapse } from "@material-ui/core";
import { withRouter, useHistory, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { logout } from "../../_action/userAction";
import { connect } from "react-redux";
import { showLoader, hideLoader } from "../../_action/loading";
import { resetRedux } from "../../_action/ResetRedux";
import { clearDetails } from "../../_action/verify";
import { clearProducts } from "../../_action/products";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 30,
  },
}));

function Navbar(props) {
  const user = useSelector((state) => state.authUser);
  let anchor = "#";
  const history = useHistory();
  const classes = useStyles();
  const [collapse, setCollapse] = useState(false);
  const [account, setAccount] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleReg = () => {
    history.push(`/${process.env.REACT_APP_RELOADNG}/registration`);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const toggle = () => {
    setCollapse(!collapse);
  };

  const closeMobileMenu = (e) => {
    setCollapse(false);
    window.location.reload(false);
    props.resetRedux();
    props.clearDetails();
    props.clearProducts();
  };

  const handleChange = (e, name) => {
    e.preventDefault();
    // alert("working")
    if (name === "profile") {
      history.push(`/${process.env.REACT_APP_RELOADNG}/profile`);
    } else if (name === "settings") {
      history.push(`/${process.env.REACT_APP_RELOADNG}/settings`);
    } else if (name === "logout") {
      if (localStorage.token) {
        window.location.href = `/${process.env.REACT_APP_RELOADNG}/registration`;
        props.logout();
      }
    }
  };

  return (
    <div>
      <div className="navbar-area">
        <nav className="navbar navbar-area navbar-expand-lg">
          <div className="container nav-container">
            <div className="responsive-mobile-menu">
              <button
                className="menu toggle-btn d-block d-lg-none"
                onClick={toggle}
                // data-toggle="collapse"
                // data-target="#realdeal_main_menu"
                // aria-expanded="false"
                // aria-label="Toggle navigation"
              >
                <span className="icon-left" />
                <span className="icon-right" />
              </button>
            </div>
            <div className="logo readeal-top">
              <NavLink to={`/${process.env.REACT_APP_RELOADNG}`}>
                <img src={logo} width="120px" alt="logo" />
              </NavLink>
            </div>
            <div className="nav-right-part nav-right-part-mobile">
              {user.isAuthenticated ? (
                <Button
                  onClick={(e) => handleChange(e, "logout")}
                  // className={classes.typography}
                  style={{
                    backgroundColor: "#fda94f",
                    color: "#000",
                    fontSize: "11px",
                    padding: "10px",
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  style={{
                    backgroundColor: "#fda94f",
                    color: "#000",
                    fontSize: "11px",
                    padding: "10px",
                  }}
                  onClick={handleReg}
                >
                  Login/Register{" "}
                  <span className="right">
                    <i className="la la-plus" />
                  </span>
                </Button>
              )}
            </div>
            <div className="collapse navbar-collapse" id="realdeal_main_menu">
              {/* <div className="header-nav-menu d-none navbar-collapse"> */}
              <ul className="navbar-nav menu-open readeal-top">
                <li className="current-menu-item">
                  <NavLink to={`/${process.env.REACT_APP_RELOADNG}`}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/${process.env.REACT_APP_RELOADNG}/about`}>
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/${process.env.REACT_APP_RELOADNG}/products`}>
                    Our Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/${process.env.REACT_APP_RELOADNG}/contact`}>
                    Contact Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/${process.env.REACT_APP_RELOADNG}/faq`}>
                    FAQ
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="nav-right-part nav-right-part-desktop readeal-top">
              {user.isAuthenticated ? (
                <Button
                  onClick={(e) => handleChange(e, "logout")}
                  // className={classes.typography}
                  style={{
                    backgroundColor: "#fda94f",
                    color: "#000",
                    fontSize: "11px",
                    padding: "10px",
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  style={{
                    backgroundColor: "#fda94f",
                    color: "#000",
                    fontSize: "11px",
                    padding: "10px",
                  }}
                  onClick={handleReg}
                >
                  Login/Register{" "}
                  <span className="right">
                    <i className="la la-plus" />
                  </span>
                </Button>
              )}
            </div>
            <div className="d-lg-none navbarMobile" style={{ width: "100%" }}>
              <div className="navbar-collapse">
                <Collapse in={collapse}>
                  {/* <div className="header-nav-menu"> */}
                  <ul className="navbar-nav menu-open readeal-top">
                    <li
                      onClick={(e) => closeMobileMenu(e)}
                      className="current-menu-item"
                    >
                      <NavLink to="/">Home</NavLink>
                    </li>
                    <li onClick={(e) => closeMobileMenu(e)}>
                      <NavLink to={`/${process.env.REACT_APP_RELOADNG}/about`}>
                        About
                      </NavLink>
                    </li>
                    <li onClick={(e) => closeMobileMenu(e)}>
                      <NavLink
                        to={`/${process.env.REACT_APP_RELOADNG}/products`}
                      >
                        Our Products
                      </NavLink>
                    </li>
                    <li onClick={(e) => closeMobileMenu(e)}>
                      <NavLink
                        to={`/${process.env.REACT_APP_RELOADNG}/contact`}
                      >
                        Contact Us
                      </NavLink>
                    </li>
                    <li onClick={(e) => closeMobileMenu(e)}>
                      <NavLink to={`/${process.env.REACT_APP_RELOADNG}/faq`}>
                        FAQ
                      </NavLink>
                    </li>
                  </ul>
                  {/* </div> */}
                </Collapse>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default withRouter(
  connect(null, { logout, showLoader, hideLoader, resetRedux, clearDetails, clearProducts })(
    Navbar
  )
);
