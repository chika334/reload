import React from "react";
import PageHeader from "./global-components/page-header";
import Mission from "./section-components/mission";
import AboutUs from "./section-components/about-us";
import ServiceTwo from "./section-components/service-two";

const About = () => {
  return (
    <div>
      <PageHeader headertitle="About" />
      <Mission />
      <AboutUs />
      <ServiceTwo />
    </div>
  );
};

export default About;
