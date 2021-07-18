import React, { Component } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";

class Transactions extends Component {
  render() {
    return (
      <div className="user-list-area pd-top-100 pd-bottom-70">
        <div className="container">
          <div className="row">
            <h4>Transaction History</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Transactions;
