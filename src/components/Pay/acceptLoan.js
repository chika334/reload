import React, { useState, useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { Button, Modal, TextField, MenuItem } from "@material-ui/core";
import { showLoader, hideLoader } from "../../_action/loading";
import { someData } from "../../_action/passingData";
import { makeStyles } from "@material-ui/core/styles";
import { BankCodes } from "../jsonData/BankCodes";
import Slide from "@material-ui/core/Slide";
import { acceptOffer } from "../../_action/Loan/acceptLoan";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "40ch",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Property(props, { breakOn = "medium" }) {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.Token);
  const getOfferResult = useSelector((state) => state.getOffers);
  const someData = useSelector((state) => state.someLoanData);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const errors = useSelector((state) => state.error);
  const [offerDetails, setOfferDetails] = useState(null);
  const [getData, setGetData] = useState({
    accountNumber: "",
    bankDetails: "",
  });

  let tableClass = "table-container__table";

  if (breakOn === "small") {
    tableClass += " table-container__table--break-sm";
  } else if (breakOn === "medium") {
    tableClass += " table-container__table--break-md";
  } else if (breakOn === "large") {
    tableClass += " table-container__table--break-lg";
  }

  useEffect(() => {
    if (errors.id === "INTERSWITCH_PTOVIDERS_FAILED") {
      setLoading(false);
      setError(errors.message.data.responseMessage);
    }
  }, [errors.id === "INTERSWITCH_PTOVIDERS_FAILED"]);

  const handleChange = (e, data) => {
    const newValues = { ...getData };
    newValues[data] = e.target.value;

    setGetData(newValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    window.location.href = `https://loan-81698gqua-chika334.vercel.app?customerId=${
      someData.data === null ? "" : someData.data.initalData.phone
    }&offerId=${
      someData.data === null ? "" : someData.data.offerId
    }&providerCode=${
      someData.data === null ? "" : someData.data.providerCode
    }&accountNumber=${getData.accountNumber}&bankDetails=${
      getData.bankDetails
      // }&token=${localStorage.access_token}`;
    }&token=${token.tokenInterSwitch}`;
  };

  useEffect(() => {
    if (getOfferResult.data != null && someData.data !== null) {
      // let text = "";
      for (let i = 0; i < getOfferResult.data.offers.length; i++) {
        // text += getOfferResult.data.offers[i] + "<br>";
        // console.log();
        if (getOfferResult.data.offers[i].offerId === someData.data.offerId) {
          // console.log("daniel");
          setOfferDetails(getOfferResult.data.offers[i]);
          // console.log("data", someData.data.offerId);
        } else {
          console.log("offerid doesn't exist");
        }
      }
      // console.log(text);
    } else {
      console.log("bad");
    }
  }, []);

  console.log(offerDetails);

  useEffect(() => {
    if (getOfferResult.data === null) {
      history.push(`/${process.env.REACT_APP_RELOADNG}/loan`);
    }
  }, [getOfferResult.data]);

  return (
    <div>
      <div className="property-details-area">
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
            <div className="bg-gray pd-top-70 pd-bottom-30">
              <div className="container d-flex justify-content-center">
                <div className="col-lg-6">
                  <div className="property-filter-area custom-gutter">
                    <div className="single-feature bg-light">
                      {message !== null ? (
                        <>
                          <Alert severity="success">{message}</Alert>
                          <div>
                            <button
                              type="submit"
                              style={{
                                backgroundColor: "#fda94f",
                                color: "#000",
                                fontSize: "12px",
                                padding: "9px",
                                marginTop: "50px",
                              }}
                            >
                              <Link
                                to={`/${process.env.REACT_APP_RELOADNG}/products`}
                              >
                                Go Back
                              </Link>
                            </button>
                          </div>
                        </>
                      ) : (
                        <form onSubmit={handleSubmit} className="pb-5">
                          {error !== null ? (
                            <Alert severity="error">{error}</Alert>
                          ) : (
                            ""
                          )}
                          <div className="mt-5 d-flex justify-content-center">
                            <p className="pr-5">Lender's Name: </p>
                            <p>
                              {offerDetails === null
                                ? ""
                                : offerDetails.provider.name}
                            </p>
                          </div>
                          <div className="mt-2 d-flex justify-content-center">
                            <p className="pr-5">Amount Offered: </p>
                            <p>
                              {offerDetails === null
                                ? ""
                                : offerDetails.amountOffered}
                            </p>
                          </div>
                          <div className="mt-2 d-flex justify-content-center">
                            <p className="pr-5">Amount Payable: </p>
                            <p>
                              {offerDetails === null
                                ? ""
                                : offerDetails.amountPayable}
                            </p>
                          </div>
                          <div className="mt-3 d-flex justify-content-center">
                            <TextField
                              label="Enter Account Number"
                              value={getData["accountNumber"] || ""}
                              onChange={(e) => handleChange(e, "accountNumber")}
                              className={classes.textField}
                            />
                          </div>
                          <div className="mt-5 d-flex justify-content-center">
                            <TextField
                              id="standard-select-currency"
                              select
                              label="Select"
                              value={getData["bankDetails"] || ""}
                              onChange={(e) => handleChange(e, "bankDetails")}
                              className={classes.textField}
                              helperText="Please select your Bank"
                            >
                              {BankCodes.ListBanks.map((option) => (
                                <MenuItem
                                  key={option.bankCode}
                                  value={option.bankCode}
                                >
                                  {option.bankName}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>
                          <div className="mt-5 d-flex justify-content-center">
                            <Button
                              type="submit"
                              style={{
                                backgroundColor: "#fda94f",
                                color: "#000",
                              }}
                              onSubmit={handleSubmit}
                            >
                              Submit
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default withRouter(
  connect(null, { showLoader, hideLoader, someData, acceptOffer })(Property)
);
