import React from "react";
import Loans from "./Pay/Loan";
import PageHeader from "./global-components/page-header";

const Loan = () => {
  return (
    <div>
      <PageHeader headertitle="Request Loan" />
      <Loans />
    </div>
  );
};

export default Loan;
