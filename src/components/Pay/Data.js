import React, { useState, useEffect, useLayoutEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { PaymentIntent } from "../../_action/Payment";
import { pay } from "../../_action/Payment/paymentButtons";
import "../../css/input.css";
import { verifySmartcardNumber } from "../../_action/verifyNumber";
import { verify } from "../../_action/verify";
import Smile from "./Data/Smile";
import Ntel from "./Ntel";
import Spectranet from "./Data/Spectranet";
import Etisalat from "./Data/etisalat";
import Glo from "./Data/glo";
import Mtn from "./Data/mtn";
import Airtel from "./Data/Airtel";
import { getProductList } from "../../_action/products";
import { useHistory } from "react-router-dom";

function NewForm(props) {
  const dispatch = useDispatch();
  const [disabledCard, setDisabledCard] = useState(false);
  const [disabledUssd, setDisabledUssd] = useState(false);
  const [buttonValue, setButtonValue] = useState(null);
  const paymentIntent = useSelector((state) => state.paymentIntent);
  const productDetails = useSelector((state) => state.someData.detail);
  const [loading, setLoading] = useState(false);
  const [valueData, setValueData] = useState(null);
  const [locationKeys, setLocationKeys] = useState([]);
  const history = useHistory();

  const handleSubmit = (value, data) => {
    setButtonValue(value);
    setValueData(data);
    if (value === "FLUTTERWAVE") {
      setDisabledCard(true);
    } else if (value === "USSD") {
      setDisabledUssd(true);
    }

    props.PaymentIntent(data);
  };

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  useLayoutEffect(() => {
    const dataValue = {
      productId: productDetails.productId,
    };
    dispatch(getProductList(dataValue));
  }, []);

  useEffect(() => {
    return () => {
      if (history.action === "POP") {
        window.location.reload(true);
        // alert("back")
      }
    };
  }, [history])

  return (
    <div>
      {loading ? (
        <div className="preloader" id="preloader">
          <div className="preloader-inner">
            <div className="spinner">
              <div className="dot1"></div>
              <div className="dot2"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>
            <div>
              {productDetails.billerCode === "Smile-Data_BLACKSILICON" ? (
                <div>
                  <Smile
                    // getData={getData}
                    handleSubmit={handleSubmit}
                    setLoading={setLoading}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            {/* <div>
              {productDetails.billerCode === "NTELBundle" ? (
                <div>
                  <Ntel
                    // getData={getData}
                    handleSubmit={handleSubmit}
                    setLoading={setLoading}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                </div>
              ) : (
                ""
              )}
            </div> */}

            <div>
              {productDetails.billerCode === "SPECTRANET" ? (
                <Spectranet
                  // getData={getData}
                  handleSubmit={handleSubmit}
                  setLoading={setLoading}
                  disabledCard={props.disabledCard}
                  disabledUssd={props.disabledUssd}
                />
              ) : (
                ""
              )}
            </div>

            <>
              {productDetails.billerCode === "AIRTEL_NIGERIA" ? (
                <Airtel
                  disabledCard={disabledCard}
                  setLoading={setLoading}
                  disabledUssd={disabledUssd}
                  handleSubmit={handleSubmit}
                />
              ) : (
                ""
              )}
              {productDetails.billerCode === "MTN_NIGERIA" ? (
                <Mtn
                  disabledCard={disabledCard}
                  setLoading={setLoading}
                  disabledUssd={disabledUssd}
                  handleSubmit={handleSubmit}
                />
              ) : (
                ""
              )}
              {productDetails.billerCode === "9MOBILE_NIGERIA" ? (
                <Etisalat
                  disabledCard={disabledCard}
                  setLoading={setLoading}
                  disabledUssd={disabledUssd}
                  handleSubmit={handleSubmit}
                />
              ) : (
                ""
              )}
              {productDetails.billerCode === "GLO_NIGERIA" ? (
                <Glo
                  disabledCard={disabledCard}
                  setLoading={setLoading}
                  disabledUssd={disabledUssd}
                  handleSubmit={handleSubmit}
                />
              ) : (
                ""
              )}
            </>
          </div>
        </>
      )}
    </div>
  );
}

export default withRouter(
  connect(null, { PaymentIntent, verifySmartcardNumber, verify })(NewForm)
);
