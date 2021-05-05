import React, { Component } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import { withRouter } from "react-router-dom";

class Registration extends Component {
  handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("logged in");
    this.props.history.push("/");
  };

  handleRegSubmit = (e) => {
    e.preventDefault();
    console.log("reg in");
    this.props.history.push("/");
  };

  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imagealt = "image";
    let data = sectiondata.whychooseus;

    return (
      <div className="register-page-area pd-bottom-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-5 col-md-6 mb-5 mb-md-0">
              <form
                onSubmit={(e) => this.handleLoginSubmit(e)}
                className="contact-form-wrap contact-form-bg"
              >
                <h4>Login</h4>
                <div className="rld-single-input">
                  <input type="text" placeholder="Entry Login" />
                </div>
                <div className="rld-single-input">
                  <input type="password" placeholder="Entry Password" />
                </div>
                <div className="btn-wrap">
                  <button
                    onSubmit={(e) => this.handleLoginSubmit(e)}
                    className="btn btn-yellow"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
            <div className="col-xl-4 col-lg-5 col-md-6">
              <form
                onSubmit={(e) => this.handleRegSubmit(e)}
                className="contact-form-wrap contact-form-bg"
              >
                <h4>Registration</h4>
                <div className="rld-single-input">
                  <input type="text" placeholder="First Name" />
                </div>
                <div className="rld-single-input">
                  <input type="text" placeholder="Last Name" />
                </div>
                <div className="rld-single-input">
                  <input type="email" placeholder="Email" />
                </div>
                <div className="rld-single-input">
                  <input type="text" placeholder="Phone Number" />
                </div>
                <div className="rld-single-input">
                  <input type="password" placeholder="Password" />
                </div>
                <div className="rld-single-input">
                  <input type="password" placeholder="Re-enter password" />
                </div>
                <div className="btn-wrap">
                  <button
                    onSubmit={(e) => this.handleRegSubmit(e)}
                    className="btn btn-yellow"
                  >
                    Register
                  </button>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Registration);
