import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

class Navbar extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imgattr = "logo";
    let anchor = "#";
    return (
      <div>
        <div className="navbar-area">
          <nav className="navbar navbar-area navbar-expand-lg">
            <div className="container nav-container">
              <div className="responsive-mobile-menu">
                <button
                  className="menu toggle-btn d-block d-lg-none"
                  data-toggle="collapse"
                  data-target="#realdeal_main_menu"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="icon-left" />
                  <span className="icon-right" />
                </button>
              </div>
              <div className="logo readeal-top">
                <Link to="/">
                  <img src={logo} width="150px" alt="logo" />
                </Link>
              </div>
              <div className="nav-right-part nav-right-part-mobile">
                {/* <Link className="btn btn-yellow" to="/add-property">
                  {" "}
                  <span className="right">
                    <i className="la la-plus" />
                  </span>
                </Link> */}
                <Link className="btn btn-yellow" to="/registration">
                  Login/Register{" "}
                  <span className="right">
                    <i className="la la-plus" />
                  </span>
                </Link>
              </div>
              <div className="collapse navbar-collapse" id="realdeal_main_menu">
                <ul className="navbar-nav menu-open readeal-top">
                  <li className="current-menu-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/products">Our Products</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/faq">FAQ</Link>
                  </li>
                </ul>
              </div>
              <div className="nav-right-part nav-right-part-desktop readeal-top">
                <Link className="btn btn-yellow" to="/registration">
                  Login/Register{" "}
                  <span className="right">
                    <i className="la la-plus" />
                  </span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Navbar;
