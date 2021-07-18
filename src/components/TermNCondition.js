import React from "react";
import Navbar from "./global-components/navbar";
import PageHeader from "./global-components/page-header";
import TermNCondition from "./section-components/TermNCondition";
import Footer from "./global-components/footer";

const Transactions = () => {
  return (
    <div>
      <PageHeader headertitle="Term of Service" />
      <TermNCondition />
    </div>
  );
};

export default Transactions;
