import React from "react";
import Navbar from "./global-components/navbar";
import PageHeader from "./global-components/page-header";
import RegistraionSection from "./section-components/registration";
import Footer from "./global-components/footer";

const Registration = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <PageHeader headertitle="Registration" />
      <RegistraionSection />
      {/* <Footer /> */}
    </div>
  );
};

export default Registration;
