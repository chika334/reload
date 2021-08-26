import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import Recipt from "./receipt";
import { Button } from "@material-ui/core";

export default function printReceipt() {
  const componentRef = useRef();

  const handleBack = () => {
    window.location.href = `/${process.env.REACT_APP_RELOADNG}/products`;
  };
  return (
    <div>
      <Recipt  />
    </div>
  );
}
