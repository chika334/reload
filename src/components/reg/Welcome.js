import React from "react";
import Navbar from "../global-components/navbar";
import PageHeader from "../global-components/page-header";
import { Card, Container } from "@material-ui/core";

export default function Welcome() {
  return (
    <div>
      {/* <div className="thumb">
        <img
          width="2000vh"
          height="400vh"
          // style={{ backgroundSize: "cover" }}
          src="https://blacksiliconimages.s3-us-west-2.amazonaws.com/Reload.ng/back.jpg"
          alt="..."
        />
      </div> */}
      <Navbar />
      <PageHeader headertitle="Welcome to reload.ng" />
      <Container className="d-flex justify-content-center ">
        <Card>
          <h3>check mail to activate account</h3>
        </Card>
      </Container>
    </div>
  );
}
