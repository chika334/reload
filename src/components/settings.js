import React from "react";
import Navbar from "./global-components/navbar";
import PageHeader from "./global-components/page-header";
import Settings from "./reg/Settings";
import Footer from "./global-components/footer";

const UserList = () => {
  return (
    <div>
      <PageHeader headertitle="Settings" />
      <Settings />
    </div>
  );
};

export default UserList;
