import React, { Component } from "react";
// import sectiondata from "../../data/sections.json";
import { Link } from "react-router-dom";

class Error extends Component {
  // componentDidMount() {
  //   const $ = window.$;
  //   var preLoder = $("#preloader");
  //   preLoder.fadeOut(0);
  // }
  render() {
    return (
      <div>
        <div className="error-page text-center">
          <div className="container">
            <div className="error-page-wrap d-inline-block">
              <Link to={`/${process.env.REACT_APP_RELOADNG}`}>Go Back</Link>
              <br />
              <h4>User has no Internet</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;
