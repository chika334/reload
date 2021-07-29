// import React from "react";
// import AdSense from "react-adsense";

// export default function Layout() {
//   return (
//     <div>
//       <div>
//         {/* <AdSense.Google client="ca-pub-6832232473224626" slot="5153321367" /> */}
//         <AdSense.Google
//           client="ca-pub-6832232473224626"
//           slot="5153321367"
//           style={{ width: 500, height: 300, float: "left" }}
//           format=""
//         />
//       </div>
//     </div>
//   );
// }

import React, { Component } from "react";
import PropTypes from "prop-types";

const googleAdId = "ca-pub-yourGoogleAdId";

class GoogleAd extends Component {
  googleInit = null;

  componentDidMount() {
    const { timeout } = this.props;
    this.googleInit = setTimeout(() => {
      if (typeof window !== "undefined")
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, timeout);
  }

  componentWillUnmount() {
    if (this.googleInit) clearTimeout(this.googleInit);
  }

  render() {
    const { classNames, slot } = this.props;
    return (
      <div className={classNames}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-6832232473224626"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-adtest="on"
          data-full-width-responsive="true"
        ></ins>
      </div>
    );
  }
}

GoogleAd.propTypes = {
  classNames: PropTypes.string,
  slot: PropTypes.string,
  timeout: PropTypes.number,
};

GoogleAd.defaultProps = {
  classNames: "",
  timeout: 200,
};

export default GoogleAd;
