import React, { Component } from "react";
import PropTypes from "prop-types";

// const googleAdId = "ca-pub-yourGoogleAdId";

class GoogleAd extends Component {

  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    const { classNames, slot } = this.props;
    return (
      <div className={classNames}>
        {/* <!-- Responsive reload site --> */}
        <ins
          class="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-8278424082299965"
          data-ad-slot="6304551990"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    );
  }
}

export default GoogleAd;
