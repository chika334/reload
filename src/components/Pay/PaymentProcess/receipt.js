import React, { useState, useEffect } from "react";
import "../../../css/receipt.css";
import { Prompt } from "react-router";
import logo from "../../../images/logo.png";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import { Button } from "@material-ui/core";

function Receipt(props) {
  const [blocking, setBlocking] = useState(false);
  const [name, setName] = useState("");
  const finalPaymentSuccess = useSelector((state) => state.FinalPayment);
  const paymentButton = useSelector((state) => state.paymentButton);
  const pay = useSelector((state) =>
    state.paymentDone.payment === true ? state.paymentDone.detail : ""
  );
  // console.log(props.location.state.data.state.data.productId.productname);
  // console.log(pay);

  useEffect(() => {
    block();
  }, []);

  const block = () => {
    window.onbeforeunload = function () {
      setBlocking({ isBlocking: true });
      return "";
    }.bind(this);

    if (finalPaymentSuccess.finalPayment === false) {
      window.location.href = `/reloadng/products`;
    }
  };

  var formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  const handleBack = () => {
    window.location.href = "/reloadng/products";
  };

  return (
    <div className="property-area pd-top-100">
      <Prompt
        when={blocking}
        message={() => `On reload all transaction history will b lost`}
      />
      <div className="pt-3 pl-5 pb-2">
        <Button onClick={handleBack} variant="contained" color="primary">
          Back
        </Button>
      </div>
      <div className="invoice-box">
        <table cellPadding="0" cellSpacing="0">
          <tbody>
            <tr className="top">
              <td colSpan="2">
                <table>
                  <tbody>
                    <tr>
                      <td className="title">
                        <img
                          src={logo}
                          style={{ width: "50%", maxWidth: "150px" }}
                        />
                      </td>

                      <td>
                        Invoice #: 123
                        <br />
                        Printed date:{" "}
                        <Moment format="D MMM YYYY" withTitle>
                          {Date.now()}
                        </Moment>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr className="information">
              <td colSpan="2">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        RELOAD BLUEPRINT,
                        <br />
                        42 Old aba road, Rumuomasi, Port Harcourt,
                        <br />
                        Rivers State
                      </td>

                      <td>
                        {props.location.state.pay.customerName}
                        <br />
                        {props.location.state.pay.email}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr className="heading">
              <td>Payment Method</td>

              <td>Check #</td>
            </tr>

            <tr className="details">
              <td>Check</td>

              <td>{paymentButton.name}</td>
            </tr>

            <tr className="heading">
              <td>Product</td>

              <td>Price</td>
            </tr>

            <tr className="item">
              <td>
                {props.location.state.data.state.data.productId.productname}
              </td>

              <td>{formatter.format(pay.amount)}</td>
            </tr>

            <tr className="item">
              <td>VAT</td>

              <td>{formatter.format(0)}</td>
            </tr>

            <tr className="total">
              <td></td>

              <td>Total: {formatter.format(pay.amount)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Button></Button>
    </div>
  );
}

export default withRouter(Receipt);
