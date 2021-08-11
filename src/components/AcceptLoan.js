import React from "react";
import Accept from "./Pay/acceptLoan";
import PageHeader from "./global-components/page-header";

const AcceptLoan = () => {
  return (
    <div>
      <PageHeader headertitle="Accept Loan Offer" />
      <Accept />
    </div>
  );
};

export default AcceptLoan;
