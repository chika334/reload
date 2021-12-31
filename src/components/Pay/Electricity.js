import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { verifySmartcardNumber } from "../../_action/verifyNumber";
import { verify } from "../../_action/verify";
import { pay } from "../../_action/Payment/paymentButtons";
import { finalPayment } from "../../_action/Payment/finalPayment";
import { clearErrors } from "../../_action/errorAction";
import { PaymentIntent } from "../../_action/Payment";
import Alert from "@material-ui/lab/Alert";
import { Button, TextField, MenuItem } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import IkejaPrepaid from "./Electric/ikejaPrepaid";
import PhedprePaid from "./Electric/phedprePaid";
import PhedpostPaid from "./Electric/phedpostPaid";
import EkoPrepaid from "./Electric/EkoPrepaid";
import JosPrepaid from "./Electric/JosPrepaid";
import KadunaPrepaid from "./Electric/KadunaPrepaid";
import KanoPrepaid from "./Electric/KanoPrepaid";
import AbujaPrepaid from "./Electric/AbujaPrepaid";
import Ibadan from "./Electric/Ibadan";
import Enugu from "./Electric/Enugu";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

function Electricity(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [disabledCard, setDisabledCard] = useState(false);
  const [disabledUssd, setDisabledUssd] = useState(false);
  const [buttonValue, setButtonValue] = useState(null);
  const [valueData, setValueData] = useState(null);
  const error = useSelector((state) => state.error);
  const [errors, setErrors] = useState("");
  // const [loading, setLoading] = useState(false);
  const [smartCard, setSmartCard] = useState("");
  const verifiedUser = useSelector((state) => state.verify);
  const verifySuccess = useSelector((state) => state.verify);
  const productDetails = useSelector((state) => state.someData.detail);
  const verifyUserdetails = useSelector((state) => state.verifyUserdetails);
  const paymentIntent = useSelector((state) => state.paymentIntent);
  const [meterType, setMeterType] = useState("");
  const [failure, setFailure] = useState("");

  const handleSelectMeterType = (event) => {
    setMeterType(event.target.value);
  };

  const handleSmartCard = (e) => {
    setSmartCard(e.target.value);
  };

  const handleSubmit = (value, data) => {
    // console.log(data);
    setLoading(true);
    setButtonValue(value);
    setValueData(data);
    if (value === "FLUTTERWAVE") {
      setDisabledCard(true);
    } else if (value === "USSD") {
      setDisabledUssd(true);
    }
    props.PaymentIntent(data);
  };

  useEffect(() => {
    if (error.id === "VERIFY_FAILED") {
      setLoading(false);
      setErrors(error.message.message);
      setTimeout(() => {
        props.clearErrors();
        setErrors("");
      }, 5000);
    } else if (error.id === "FINAL_PAYMENT_ERROR") {
      setLoading(false);
      setFailure(error.message.data.message);
      setTimeout(() => {
        props.clearErrors();
        setErrors("");
      }, 6000);
    }
  }, [error.error === true]);

  // const verifyMeterNumber = async () => {
  //   if (productDetails.billerCode === "KANO_PREPAID") {
  //     const details = {
  //       product: productDetails.productId,
  //       billerCode: productDetails.billerCode,
  //       accountNumber: smartCard,
  //       extras: {
  //         customerAccountType: meterType === "PREPAID" ? "KANO_PREPAID" : "",
  //         field1: null,
  //         field2: meterType === "PREPAID" ? "KANO_PREPAID" : "",
  //         field3: null,
  //       },
  //     };

  //     dispatch(verifySmartcardNumber(details));
  //   }
  //   if (productDetails.billerCode === "JOS_PREPAID") {
  //     const details = {
  //       product: productDetails.productId,
  //       billerCode: productDetails.billerCode,
  //       accountNumber: smartCard,
  //       extras: {
  //         customerAccountType: meterType === "PREPAID" ? "Jos_Disco" : "",
  //         field1: "1111111111",
  //         field2: "v.law149@gmail.com",
  //         field3: "2000",
  //       },
  //     };

  //     dispatch(verifySmartcardNumber(details));
  //   } else if (productDetails.billerCode === "KADUNA_PREPAID") {
  //     const details = {
  //       product: productDetails.productId,
  //       billerCode: productDetails.billerCode,
  //       accountNumber: smartCard,
  //       extras: {
  //         customerAccountType:
  //           meterType === "PREPAID" ? "Kaduna_Electricity_Disco" : "",
  //         field1: "1111111111",
  //         field2: "v.law149@gmail.com",
  //         field3: "2000",
  //       },
  //     };

  //     dispatch(verifySmartcardNumber(details));
  //   } else {
  //     const details = {
  //       product: productDetails.productId,
  //       accountNumber: smartCard,
  //       extras: {
  //         field1: null,
  //         billerCode: productDetails.billerCode,
  //         field2: meterType,
  //         field3: "",
  //         field4: "",
  //         customerAccountType: null,
  //       },
  //     };

  //     dispatch(verifySmartcardNumber(details));
  //   }
  // };

  // const SmartNumber = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   let result = verifyMeterNumber();
  // };

  // const verifyNumber = JSON.parse(productDetails.detail.productvalue).field0;

  useEffect(() => {
    if (paymentIntent.success === true) {
      // pro
      setLoading(false);
      const amounts = valueData === null ? "" : valueData.amount;
      const iedc =
        valueData === null ? "" : valueData.referenceValues["Email Address"];
      const detail = {
        amount: amounts,
        email: `${
          productDetails.billerCode === "iedc"
            ? iedc
            : productDetails.billerCode === "PHEDDIR2"
            ? iedc
            : productDetails.billerCode === "PHCNEKO"
            ? iedc
            : productDetails.billerCode === "JOS_PREPAID"
            ? iedc
            : productDetails.billerCode === "KADUNA_PREPAID"
            ? iedc
            : productDetails.billerCode === "PHCNKAN"
            ? iedc
            : productDetails.billerCode === "ABJ_PREPAID"
            ? iedc
            : ""
        }`,
        product: productDetails.productname,
        customerId:
          verifiedUser.result === null
            ? ""
            : verifiedUser.result.account.accountNumber,
        buttonClick: buttonValue,
        transRef: paymentIntent.detail.transRef,
        customerName:
          verifiedUser.result === null
            ? ""
            : verifiedUser.result.account.accountName,
      };

      console.log(detail, valueData);

      dispatch(pay(detail));
      props.dataPay(true, "Electric");
    }
  }, [paymentIntent.success]);

  useEffect(() => {
    if (verifiedUser.verifySuccess === true) {
      setLoading(false);
      dispatch(verify("Electricity", true));
    }
  }, [verifiedUser.verifySuccess]);

  // useEffect(() => {
  //   setOpen(false);
  //   if (error.id === "FINAL_PAYMENT_ERROR") {
  //     setLoading(false);
  //     setErrorModal(true);
  //   } else if (error.id === "REQUERY_FAILED") {
  //     setLoading(false);
  //     setErrorMessage(error.message.result.productResult);
  //   }
  // }, [error.error]);

  const getData = (data) => {
    setIntentData(data);
  };

  console.log(productDetails.billerCode);

  return (
    <div className="property-details-area">
      {/* {verifySuccess.result === null ? (
        ""
      ) : (
        <Dialog
          open={errorModal}
          TransitionComponent={Transition}
          keepMounted
          // onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Transaction Error
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <b>Sorry please an error occurred please requery transaction</b>
              <table class="center">
                <tr>
                  <td>Name: </td>
                  <td>{verifySuccess.result.account.accountName}</td>
                </tr>
                <tr>
                  <td>Product: </td>
                  <td>{productDetails.detail.productId.productname}</td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td>{paymentAmount}</td>
                </tr>
              </table>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleQuery} color="primary">
              Requery
            </Button>
          </DialogActions>
        </Dialog>
      )} */}
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
        <div>
          <div className="d-flex align-item-center justify-content-center">
            {errors && <Alert severity="error">{errors}</Alert>}
          </div>
          <div>
            {verifyUserdetails.onclick === false &&
            verifyUserdetails.name === "" ? (
              verifyNumber.text === "Meter Number" ||
              "METER NUMBER" ||
              "Account Number" ||
              "Meter or Account Number" ? (
                <>
                  <div className="d-flex align-item-center justify-content-center">
                    <TextField
                      required
                      className="inputSize"
                      label={verifyNumber.text}
                      name="smartCard"
                      onChange={handleSmartCard}
                      placeholder={`Enter ${verifyNumber.text}`}
                      type="number"
                      variant="outlined"
                      value={smartCard}
                    />
                  </div>
                  <div className="d-flex align-item-center justify-content-center pt-3">
                    <FormControl className="inputSize">
                      <InputLabel id="demo-customized-select-label">
                        Meter Type
                      </InputLabel>
                      <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={meterType}
                        onChange={handleSelectMeterType}
                        placeholder="Select Meter Type"
                        input={<BootstrapInput />}
                      >
                        <MenuItem value="Select Meter Type">
                          <em>Select Meter Type</em>
                        </MenuItem>
                        <MenuItem value="PREPAID">PREPAID</MenuItem>
                        {productDetails.billerCode === "PHEDDIR2" ||
                        productDetails.billerCode === "IBEDC_F" ? (
                          <MenuItem value="POSTPAID">POSTPAID</MenuItem>
                        ) : (
                          ""
                        )}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="d-flex align-item-center justify-content-center">
                    <Button
                      onClick={SmartNumber}
                      type="button"
                      style={{
                        backgroundColor: "#fda94f",
                        color: "#000",
                        fontSize: "12px",
                        padding: "11px",
                      }}
                    >
                      Verify
                    </Button>
                  </div>
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            {/* {productDetails.billerCode === "ENUGU_DISCO" ? (
              <Enugu
              // getData={getData}
              setLoading={setLoading}
              // handleSubmit={handleSubmit}
              // disabledCard={props.disabledCard}
              // disabledUssd={props.disabledUssd}
              />
            ) : (
              ""
            )} */}
            {verifiedUser.verifySuccess === true && meterType === "PREPAID" && (
              <>
                {productDetails.billerCode === "iedc" ? (
                  <IkejaPrepaid
                    getData={getData}
                    handleSubmit={handleSubmit}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                ) : (
                  ""
                )}
                {productDetails.billerCode === "PHEDDIR2" ? (
                  <PhedprePaid
                    meterType={meterType}
                    getData={getData}
                    handleSubmit={handleSubmit}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                ) : (
                  ""
                )}
                {productDetails.billerCode === "PHCNEKO" ? (
                  <EkoPrepaid
                    meterType={meterType}
                    getData={getData}
                    handleSubmit={handleSubmit}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                ) : (
                  ""
                )}
                {productDetails.billerCode === "JOS_PREPAID" ? (
                  <JosPrepaid
                    meterType={meterType}
                    getData={getData}
                    handleSubmit={handleSubmit}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                ) : (
                  ""
                )}
                {productDetails.billerCode === "KADUNA_PREPAID" ? (
                  <KadunaPrepaid
                    meterType={meterType}
                    getData={getData}
                    handleSubmit={handleSubmit}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                ) : (
                  ""
                )}
                {productDetails.billerCode === "PHCNKAN" ? (
                  <KanoPrepaid
                    meterType={meterType}
                    getData={getData}
                    handleSubmit={handleSubmit}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                ) : (
                  ""
                )}
                {productDetails.billerCode === "ABJ_PREPAID" ? (
                  <AbujaPrepaid
                    meterType={meterType}
                    getData={getData}
                    handleSubmit={handleSubmit}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                ) : (
                  ""
                )}
              </>
            )}
            {verifiedUser.verifySuccess === true && meterType === "POSTPAID" ? (
              <>
                {productDetails.billerCode === "PHEDDIR2" ? (
                  <PhedpostPaid
                    meterType={meterType}
                    getData={getData}
                    handleSubmit={handleSubmit}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
            {verifiedUser.verifySuccess === true ? (
              <>
                {productDetails.billerCode === "IBEDC_F" ? (
                  <Ibadan
                    meterType={meterType}
                    getData={getData}
                    handleSubmit={handleSubmit}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}

            {/* {verifiedUser.verifySuccess === true && meterType === "POSTPAID" && (
              <>
                {productDetails.billerCode === "iedc" ? (
                  <IkejaPostpaid
                    meterType={meterType}
                    getData={getData}
                    handleSubmit={handleSubmit}
                    disabledCard={props.disabledCard}
                    disabledUssd={props.disabledUssd}
                  />
                ) : (
                  ""
                )}
                {productDetails.billerCode === "PHEDDIR2"
                  ? 
                  <PhedpostPaid
                      meterType={meterType}
                      getData={getData}
                      handleSubmit={handleSubmit}
                      disabledCard={props.disabledCard}
                      disabledUssd={props.disabledUssd}
                    />
                  : ""}
              </>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(
  connect(null, {
    verifySmartcardNumber,
    verify,
    PaymentIntent,
    pay,
    // showLoader,
    clearErrors,
    // hideLoader,
    finalPayment,
  })(Electricity)
);
