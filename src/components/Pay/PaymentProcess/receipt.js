import React, { useState, useEffect } from "react";
import "../../../css/receipt.css";
import { Prompt } from "react-router";
import logo from "../../../images/logo.png";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import { Button } from "@material-ui/core";
import ReactToPrint from "react-to-print";

function Receipt(props) {
  const componentRef = React.useRef();
  const [blocking, setBlocking] = useState(false);
  // const [name, setName] = useState("");
  const finalPaymentSuccess = useSelector((state) => state.FinalPayment);
  const paymentButton = useSelector((state) => state.paymentButton);
  const verify = useSelector((state) => state.verify);
  const productDetails = useSelector((state) => state.someData.detail);
  const pay = useSelector((state) =>
    state.paymentDone.payment === true ? state.paymentDone.detail : ""
  );
  const paymentIntent = useSelector((state) =>
    state.paymentIntent.success === true
      ? state.paymentIntent.detail.result
      : ""
  );
  const paymentIntentStatus = useSelector((state) =>
    state.paymentIntent.success === true ? state.paymentIntent.detail : ""
  );

  // console.log(paymentIntentStatus);
  // const Conveniencefee =
  //   productDetails.detail.productId.productcategoryId.categoryname ===
  //   "Electricity"
  //     ? paymentIntent.fee
  //     : paymentIntent.fee;
  // const total = JSON.parse(pay.amount) + Conveniencefee;

  useEffect(() => {
    block();
  }, [!paymentIntentStatus.status]);

  const splitString =
    productDetails.detail.productId.productcategoryId.categoryname ===
    "Electricity"
      ? JSON.parse(verify.result.account.extras)
      : "";

  const customerSplit =
    productDetails.detail.productId.productcategoryId.categoryname ===
    "Electricity"
      ? splitString.extra.split(" |")
      : "";

  const tokenSplit =
    productDetails.detail.productId.productcategoryId.categoryname ===
    "Electricity"
      ? finalPaymentSuccess.result.productResult.split(" | ")
      : "";

  // console.log(tokenSplit[1]);

  const block = () => {
    window.onbeforeunload = function () {
      setBlocking({ isBlocking: true });
      return "";
    }.bind(this);

    if (finalPaymentSuccess.finalPayment === false) {
      window.location.href = `/products`;
    }
  };

  var formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  const handleBack = () => {
    window.location.href = "/products";
  };

  return (
    <div className="property-area pd-top-100">
      <Prompt
        when={blocking}
        message={() => `On reload all transaction history will b lost`}
      />
      <div className="allnew container">
        <div className="pt-3 pb-2">
          <Button onClick={handleBack} variant="contained" color="primary">
            Back
          </Button>
        </div>
        <div>
          <ReactToPrint
            trigger={() => <button>Download Receipt</button>}
            content={() => componentRef.current}
          />
        </div>
      </div>
      <div ref={componentRef} className="invoice-box">
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
                        Invoice #: {pay.transRef}
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
                        {/* reload.ng */}
                        <br />
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

            {productDetails.detail.productId.productcategoryId.categoryname ===
            "Electricity" ? (
              <>
                <tr className="total">
                  <td></td>
                  <td>{customerSplit[0]}</td>
                </tr>
                <tr className="total">
                  <td></td>
                  <td>{finalPaymentSuccess.result.productResult}</td>
                </tr>
                <hr />
                <tr>
                  <td>Meter Number: </td>
                  <td>{verify.result.account.accountNumber}</td>
                </tr>
              </>
            ) : (
              ""
            )}
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
              <td>{productDetails.detail.productId.productname}</td>

              <td>{formatter.format(pay.amount)}</td>
            </tr>

            <tr className="item">
              <td>Convenience fee</td>

              <td>{formatter.format(paymentIntent.fee)}</td>
            </tr>

            <tr className="total">
              <td></td>

              <td>Total: {formatter.format(paymentIntent.totalAmount)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default withRouter(Receipt);
