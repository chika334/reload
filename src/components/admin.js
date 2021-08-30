import React from "react";
// import Navbar from "./global-components/navbar";
import PageHeader from "./global-components/page-header";
import Transaction from "./section-components/transactions";
// import Footer from "./global-components/footer";

const Transactions = () => {
  return (
    <div>
      <PageHeader headertitle="Transactions" />
      <Transaction />
    </div>
  );
};

export default Transactions;
