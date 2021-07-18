import React from "react";
import Navbar from "./global-components/navbar";
import PageHeader from "./global-components/page-header";
import ForgotPassword from "./section-components/forgotPassword";
import Footer from "./global-components/footer";

const Registration = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <PageHeader headertitle="Forgot Password" />
      <ForgotPassword />
      {/* <Footer /> */}
    </div>
  );
};

export default Registration;
