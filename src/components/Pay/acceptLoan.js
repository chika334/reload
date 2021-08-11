import React, { useState, useEffect } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import { Link, useHistory, withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { Button, Modal, TextField, MenuItem } from "@material-ui/core";
import { showLoader, hideLoader } from "../../_action/loading";
import { someData } from "../../_action/passingData";
import { makeStyles } from "@material-ui/core/styles";
import { BankCodes } from "../jsonData/BankCodes";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.Token);
  const getLoanDetails = useSelector((state) => state.getLoanData);
  const getOfferResult = useSelector((state) => state.getOffers);
  const [offerData, setOfferData] = useState(null);
  const Providers = useSelector((state) => state.Providers);
  const someData = useSelector((state) => state.someLoanData);
  const acceptLoanOffer = useSelector((state) => state.acceptOffers);
  const [providersDetails, setProvidersDetails] = useState(null);
  const [message, setMessage] = useState(null);
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

  const handleChange = (e, data) => {
    const newValues = { ...getData };
    newValues[data] = e.target.value;

    setGetData(newValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let acceptLoan = {};

    acceptLoan.customerId = getLoanDetails.data.phone;
    acceptLoan.providerCode = getLoanDetails.data.providerCode;
    acceptLoan.channelCode = process.env.REACT_APP_CHANNELCODE;
    acceptLoan.debitMethod = {
      useCreditMethod: true,
    };

    acceptLoan.creditMethod = {
      accountNumber: getData["accountNumber"],
      bankCode: getData["bankDetails"],
    };

    const secondValue = {
      offerId: someData.data.offerId,
    };

    setLoading(true);
    console.log(acceptLoan);
    dispatch(acceptOffer(acceptLoan, secondValue));
    // dispatch(getOffer(getData));
  };

  useEffect(() => {
    if (acceptLoanOffer.success === true) {
      setMessage(acceptLoanOffer.data.responseMessage);
    }
  }, [acceptLoanOffer.success]);

  useEffect(() => {
    if (getOfferResult.data === null) {
      history.push("/reloadng/loan");
    }
  }, [getOfferResult.data]);

  // const handleOffer = () => {
  //   history.push("/reloadng/loan/accept-loan-offer");
  //   console.log("offer selected");
  // };

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
                {/* <div className="row custom-gutter"> */}
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
                                marginTop: "50px"
                              }}
                            >
                              <Link to="/reloadng/products">Proceed with USSD</Link>
                            </button>
                          </div>
                        </>
                      ) : (
                        <form onSubmit={handleSubmit} className="pb-5">
                          <div className="mt-5">
                            <TextField
                              label="Enter Account Number"
                              value={getData["accountNumber"] || ""}
                              onChange={(e) => handleChange(e, "accountNumber")}
                              className={classes.textField}
                            />
                          </div>
                          <div className="mt-5">
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
                          <div className="mt-5">
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
                {/* </div> */}
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