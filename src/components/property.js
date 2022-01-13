import React from "react";
import PageHeader from "./global-components/page-header";
import PropertySection from "./section-components/property";

const Property = () => {
  return (
    <div>
      <PageHeader headertitle="Products" />
      <PropertySection />
    </div>
  );
};

export default Property;
