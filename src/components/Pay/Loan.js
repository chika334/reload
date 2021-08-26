import React, { useState, useEffect } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import { Link, useHistory, withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { Button, Modal, TextField, MenuItem } from "@material-ui/core";
import { showLoader, hideLoader } from "../../_action/loading";
import { someData } from "../../_action/passingData";
import { interswitchToken } from "../../_action/Loan/token";
import { interswitchProvider } from "../../_action/Loan/providers";
import { makeStyles } from "@material-ui/core/styles";
import { BankCodes } from "../jsonData/BankCodes";
import { getOffer } from "../../_action/Loan/getOffers";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Table from "../Table/index";
import { getLoanData } from "../../_action/Loan/getLoanData";
import { someloanData } from "../../_action/Loan/sendSomeLoanData";
import "../Table/table.scss";
import Alert from "@material-ui/lab/Alert";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Property({ breakOn = "medium" }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.Token);
  const getOfferResult = useSelector((state) => state.getOffers);
  const [offerData, setOfferData] = useState(null);
  const Providers = useSelector((state) => state.Providers);
  const [bankDetails, setBankDetails] = useState();
  const [error, setError] = useState(null);
  const errors = useSelector((state) => state.error);
  const [getData, setGetData] = useState({
    amount: "",
    serviceType: "Money",
    phone: "",
    providerCode: "",
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
    if (errors.id === "GET_LOAN_OFFERS_FAILED") {
      setLoading(false);
      setError(errors.message.data.responseMessage);
    }
  }, [errors.error === true]);

  const handleChange = (e, data) => {
    const newValues = { ...getData };
    newValues[data] = e.target.value;

    setGetData(newValues);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    dispatch(getLoanData(getData));
    dispatch(getOffer(getData));
  };

  useEffect(() => {
    if (getOfferResult.success) {
      setLoading(false);
      setTimeout(() => {
        setOpen(true);
        setOfferData(getOfferResult.data);
      }, 1000);
    }
  }, [getOfferResult.success]);

  // console.log(open);

  const handleOffer = (e, data) => {
    console.log(data);
    setOpen(false);
    setLoading(true);
    const someData = {
      offerId: data,
      initalData: getData,
    };

    dispatch(someloanData(someData));
    // setOfferId(data);
    setTimeout(() => {
      setLoading(false);
      history.push({
        pathname: `/${process.env.REACT_APP_RELOADNG}/loan/accept-loan-offer`,
      });
    }, 500);
  };

  return (
    <div>
      <div>
        {open === true ? (
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            maxWidth="lg"
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Select an offer"}
            </DialogTitle>
            <DialogContent>
              <div className="table-container">
                <table className={tableClass}>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Amount Offered</th>
                      <th>interest</th>
                      <th>Amount Payable</th>
                      <th>Tenure</th>
                      <th>Expiry Date</th>
                      <th>Tax</th>
                      <th>Terms</th>
                      <th>##</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getOfferResult.data.offers.map((allData, index) => {
                      return (
                        <tr key={index}>
                          <td data-heading="Id">{index + 1}</td>
                          <td data-heading="Amount Offered">
                            {allData.amountOffered}
                          </td>
                          <td data-heading="interest">{allData.interest}</td>
                          <td data-heading="Amount Payable">
                            {allData.amountPayable}
                          </td>
                          <td data-heading="Tenure">{allData.tenure}</td>
                          <td data-heading="Expiry Date">
                            {allData.expiryDate === undefined
                              ? "no value"
                              : allData.expiryDate}
                          </td>
                          <td data-heading="Tax">
                            {allData.fees === undefined
                              ? "no value"
                              : allData.fees.map((details) => details.amount)}
                          </td>
                          <td className="terms" data-heading="Terms">
                            {allData.terms === undefined
                              ? "no value"
                              : allData.terms}
                          </td>
                          <td data-heading="##">
                            <button
                              onClick={(e) => handleOffer(e, allData.offerId)}
                              type="submit"
                              style={{
                                backgroundColor: "#fda94f",
                                color: "#000",
                                fontSize: "12px",
                                padding: "9px",
                              }}
                            >
                              Accept Offer
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          ""
        )}
      </div>
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
                      <form onSubmit={handleSubmit} className="pb-5">
                        {error !== null ? (
                          <Alert severity="error">{error}</Alert>
                        ) : (
                          ""
                        )}
                        <div className="d-flex justify-content-center mt-5">
                          <TextField
                            label="Enter Loan Amount"
                            type="number"
                            onChange={(e) => handleChange(e, "amount")}
                            value={getData["amount"]}
                            className={classes.textField}
                          />
                        </div>
                        <div className="d-flex justify-content-center mt-5">
                          <TextField
                            label="Enter Phone Number"
                            type="number"
                            onChange={(e) => handleChange(e, "phone")}
                            value={getData["phone"]}
                            className={classes.textField}
                          />
                        </div>
                        <div className="d-flex justify-content-center mt-5">
                          {/* <TextField
                            id="standard-select-currency"
                            select
                            label="Select"
                            value={getData["providerCode"] || ""}
                            onChange={(e) => handleChange(e, "providerCode")}
                            className={classes.textField}
                            helperText="Please select your Bank"
                          >
                            {Providers.providers === null
                              ? ""
                              : Providers.providers.providers.map((option) => (
                                  <MenuItem
                                    key={option.code}
                                    value={option.code}
                                  >
                                    {option.name}
                                  </MenuItem>
                                ))}
                          </TextField> */}
                          <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="grouped-native-select">
                              Grouping
                            </InputLabel>
                            <Select
                              native
                              className={classes.textField}
                              defaultValue=""
                              id="grouped-native-select"
                            >
                              <option aria-label="None" value="" />
                              {Providers.providers === null
                                ? ""
                                : Providers.providers.providers.map(
                                    (option) => (
                                      <option
                                        key={option.code}
                                        value={option.code}
                                      >
                                        {option.name}
                                      </option>
                                    )
                                  )}
                            </Select>
                          </FormControl>
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
  connect(null, {
    showLoader,
    hideLoader,
    someData,
    getOffer,
    getLoanData,
    someloanData,
  })(Property)
);
