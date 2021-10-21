import React from "react";
import { useSelector } from "react-redux";
import { FLUTTERWAVE_KEY, USSD_KEY } from "../Pay/PaymentProcess/hooks";

export default function index(props) {
  const productDetails = useSelector((state) => state.someData.detail);
  return (
    <div>
      {productDetails.billerCode !== "SMILE" &&
      productDetails.billerCode !== "NTELBundle" &&
      productDetails.billerCode !== "SPECTRANET" ? (
        <div className="ButtonSide">
          <div>
            {props.disabledCard === true ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `/${process.env.REACT_APP_RELOADNG}/product-details`;
                }}
              >
                Go Back
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(FLUTTERWAVE_KEY);
                }}
                type="submit"
                style={{
                  backgroundColor: "#fda94f",
                  cursor:
                    props.disabledUssd === true ? "not-allowed" : "pointer",
                  color: "#000",
                  fontSize: "12px",
                  padding: "11px",
                }}
                disabled={props.disabledUssd}
              >
                Proceed to Card
              </button>
            )}
          </div>
          <div>
            {props.disabledUssd === true ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `/${process.env.REACT_APP_RELOADNG}/product-details`;
                }}
              >
                Go Back
              </button>
            ) : (
              <div>
                <button
                  // className="btn"
                  value={USSD_KEY}
                  onClick={(e) => {
                    // e.preventDefault();
                    handleSubmit(USSD_KEY);
                  }}
                  style={{
                    backgroundColor: "#fda94f",
                    cursor:
                      props.disabledCard === true ? "not-allowed" : "pointer",
                    color: "#000",
                    fontSize: "12px",
                    padding: "11px",
                  }}
                  disabled={props.disabledCard}
                >
                  Pay with Ussd
                </button>{" "}
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
