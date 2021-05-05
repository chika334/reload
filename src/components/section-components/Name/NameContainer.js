import React, { Component } from "react";
import Name from "./Name";

class NamesContainer extends Component {
  render() {
    return (
      <div>
        {this.props.names.map((name, index) => (
          <Name key={index} name={name} />
        ))}
      </div>
    );
  }
}

export default NamesContainer;
