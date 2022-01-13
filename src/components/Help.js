import React from "react";
// import Navbar from "./global-components/navbar";
import PageHeader from "./global-components/page-header";
import Help from "./section-components/Help";
// import Footer from "./global-components/footer";

const HelpDesk = () => {
  return (
    <div>
      <PageHeader headertitle="Help Desk" />
      <Help />
    </div>
  );
};

export default HelpDesk;
