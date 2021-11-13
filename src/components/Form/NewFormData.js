import React from "react";
import { useSelector, connect, useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";
import { PaymentIntent } from "../../_action/Payment/index";
import { FLUTTERWAVE_KEY } from "../Pay/PaymentProcess/hooks";
import Alert from "@material-ui/lab/Alert";
import { pay } from "../../_action/Payment/paymentButtons";
import RequeryErrorModal from "../Modal/RequeryErrorModal";
import AfterRequeryError from "../Modal/AfterRequeryError";

function NewFormData(props) {
  const { product, slug, productData } = props;
  const dispatch = useDispatch();
  const [values, setValues] = React.useState(null);
  const [buttonValue, setButtonValue] = React.useState(null);
  const paymentIntent = useSelector((state) => state.paymentIntent);
  const [errors, setErrors] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [disabledCard, setDisabledCard] = React.useState(false);
  const productDetails = useSelector((state) => state.someData.detail);
  const verifiedUser = useSelector((state) => state.verify);
  const [bouquet, setBouquet] = React.useState(null);
  const [selectDetails, setSelectDetails] = React.useState(null);
  const dataValue = useSelector((state) => state.dataValue);
  const [requeryErrorModal, setRequeryErrorModal] = React.useState(false);
  const [afterRequeryError, setAfterRequeryError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const finalPayment = useSelector((state) => state.FinalPayment);

  React.useEffect(() => {
    if (dataValue.name === "finalPayment" && dataValue.booleanValue === true) {
      setLoading(false);
      setErrorMessage(
        "Sorry an error occurred while completing this transaction, please requery transaction"
      );
      setRequeryErrorModal(true);
    }
  }, [dataValue.booleanValue === true]);

  React.useEffect(() => {
    if (dataValue.name === "requery" && dataValue.booleanValue === true) {
      // alert("requery");
      setLoading(false);
      setRequeryErrorModal(false);
      setErrorMessage(
        "We appologies for this, issues from our service providers, Please contact our customer care or chat us via our live chat system, Thank you."
      );
      setAfterRequeryError(true);
    }
  }, [finalPayment.requery]);

  const handleSubmit = (value) => {
    setButtonValue(value);
    if (value === "FLUTTERWAVE") {
      setDisabledCard(true);
    }

    setLoading(true);

    if (values === null) {
      setLoading(false);
      setTimeout(() => {
        setErrors("Please input all Fields");
      }, 500);
    } else {
      if (values["phoneNumber"] && values["email"]) {
        setErrors("");
        setLoading(true);
        const newValuesObj = {
          amount:
            slug === "SMILE" ||
            product === "Cable" ||
            product === "Data" ||
            product === "Electricity"
              ? selectDetails === null
                ? ""
                : selectDetails
              : values["amount"],
          channelRef: "web",
          description: "Airtime",
          paymentMethod:
            value === "FLUTTERWAVE" ? "billpayflutter" : "billpaycoralpay",
          productId: `${productDetails.productId}`,
          referenceValues: {
            customerId: `${
              product === "Cable" || product === "Electricity"
                ? verifiedUser.result === null
                  ? ""
                  : verifiedUser.result.account.accountNumber
                : values === null
                ? ""
                : values["phoneNumber"]
            }`,
            customerName: `${values["email"]}`,
            phoneNumber: `${values["phoneNumber"]}`,
            packageSlug:
              product === "Cable" ||
              product === "Data" ||
              product === "Electricity"
                ? bouquet === null
                  ? ""
                  : bouquet
                : slug,
            email: `${values["email"]}`,
          },
          references: [
            "email",
            "packageSlug",
            "phoneNumber",
            "customerName",
            "customerId",
          ],
        };

        console.log(newValuesObj);

        dispatch(PaymentIntent(newValuesObj));
      } else {
        setLoading(false);
        setTimeout(() => {
          setErrors("Please input all Fields");
        }, 500);
      }
    }
  };

  const handleSelect = (e) => {
    setSelectDetails(e.target.value);

    productData.map((allData) => {
      if (allData.amount === parseInt(e.target.value)) {
        setBouquet(allData.slug);
      }
    });
  };

  React.useEffect(() => {
    if (paymentIntent.success === true) {
      let emails = values === null ? "" : values["email"];

      setLoading(false);

      const detail = {
        amount:
          product === "Cable" ||
          product === "Data" ||
          product === "Electricity" ||
          slug === "SMILE"
            ? selectDetails === null
              ? ""
              : parseInt(selectDetails)
            : parseInt(values["amount"]),
        email: emails,
        product: productDetails.productname,
        customerId: `${
          product === "Cable" || product === "Electricity"
            ? verifiedUser.result === null
              ? ""
              : verifiedUser.result.account.accountNumber
            : values === null
            ? ""
            : values["phoneNumber"]
        }`,
        buttonClick: buttonValue,
        transRef: paymentIntent.detail.transRef,
        customerName:
          product === "Cable" || product === "Electricity"
            ? verifiedUser.result === null
              ? ""
              : verifiedUser.result.account.accountName
            : values === null
            ? ""
            : values["email"],
      };

      console.log(detail);

      dispatch(pay(detail));
      // props.dataPay(true, product);
    }
  }, [paymentIntent.success]);

  const item = JSON.parse(productDetails.detail.productvalue);
  const fieldsArray = [];
  for (const data in item) {
    fieldsArray.push(item[data]);
  }

  const handleChange = (e, name) => {
    const newValues = { ...values };
    newValues[name] = e.target.value;
    setValues(newValues);
  };

  return (
    <div>
      <RequeryErrorModal
        open={requeryErrorModal}
        setRequeryErrorModal={setRequeryErrorModal}
        errorMessage={errorMessage}
        setLoading={setLoading}
      />
      <AfterRequeryError
        open={afterRequeryError}
        setAfterRequeryError={setAfterRequeryError}
        errorMessage={errorMessage}
        setLoading={setLoading}
      />
      {loading === true ? (
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
            <div className="d-flex align-item-center justify-content-center">
              {errors && <Alert severity="error">{errors}</Alert>}
            </div>
          </div>
          {fieldsArray.map((allData, i) => (
            <>
              {allData.text === "email" || allData.text === "phoneNumber" ? (
                <div key={i}>
                  <div className="d-flex align-item-center justify-content-center pt-3">
                    <TextField
                      required
                      className="inputSize"
                      placeholder={
                        allData.text === "email"
                          ? "Enter Email"
                          : allData.text === "phoneNumber"
                          ? slug === "SMILE"
                            ? "Enter Smile Number"
                            : "Enter Phone Number"
                          : ""
                      }
                      // name={allData.text}
                      onChange={(e) => handleChange(e, allData.text)}
                      type={
                        allData.text === "email"
                          ? "email"
                          : allData.text === "phoneNumber"
                          ? "number"
                          : ""
                      }
                      variant="outlined"
                      // value={values === null ? "" : values}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          ))}
          {/* bouquet */}
          {product === "Cable" ||
          product === "Electricity" ||
          product === "Data" ||
          slug === "SMILE" ? (
            <div className="">
              <div className="pt-3">
                <div className="d-flex align-item-center justify-content-center">
                  <select
                    value={selectDetails === null ? "" : selectDetails["name"]}
                    onChange={(e) => handleSelect(e)}
                    className="p-3"
                    id="inputSize"
                    style={{ borderRadius: "3px" }}
                  >
                    <option>Select bouquet</option>
                    {productData.map((allData, i) => (
                      <option
                        // onClick={(e) => handleSelectClick(e, allData.name)}
                        value={allData.amount}
                        key={i}
                      >
                        {allData.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {fieldsArray.map((allData, i) =>
            allData.text === "amount" ? (
              <div key={i}>
                <div className="d-flex align-item-center justify-content-center pt-3">
                  <TextField
                    required
                    className="inputSize"
                    placeholder={
                      allData.text === "amount" ? "Enter Amount" : ""
                    }
                    onChange={(e) => handleChange(e, allData.text)}
                    type={allData.text === "amount" ? "number" : ""}
                    variant="outlined"
                    value={
                      product === "Data" ||
                      product === "Cable" ||
                      slug === "SMILE" ||
                      product === "Electricity"
                        ? selectDetails === null
                          ? ""
                          : selectDetails
                        : values === null
                        ? ""
                        : values["amount"]
                    }
                  />
                </div>
              </div>
            ) : (
              ""
            )
          )}
          <div className="d-flex justify-content-center">
            {disabledCard === true ? (
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
        </>
      )}
    </div>
  );
}
// export default withRouter(connect(null, { PaymentIntent }))(NewFormData);
export default connect(null, { PaymentIntent })(NewFormData);
