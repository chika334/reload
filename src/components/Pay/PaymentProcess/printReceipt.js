import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import Recipt from "./receipt";
import { Button } from "@material-ui/core";

export default function printReceipt() {
  // const componentRef = useRef();

  return (
    <div>
      <Recipt  />
    </div>
  );
}
