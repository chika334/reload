import React, { useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { Button, Modal, Grid } from "@material-ui/core";
import { showLoader, hideLoader } from "../../_action/loading";
import { someData } from "../../_action/passingData";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Property(props) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [modalStyle] = React.useState(getModalStyle);
  const [modal, setModal] = useState(false);
  const getProducts = useSelector((state) => state.products);
  const user = useSelector((state) => state.authUser.user);
  const [productData, setProductData] = useState(
    getProducts.listProducts === null ? "" : getProducts.listProducts
  );

  const handlePay = (details) => {
    console.log(details);
    if (details.otherData.billerCode === null) {
      setModal(true);
    } else {
      if (
        details.otherData.productId.productname ===
          "Ibadan Electricity Prepaid" ||
        details.otherData.productId.productname === "Jamb Exams" ||
        details.otherData.productId.productname === "Waec Exams Registration" ||
        details.otherData.productId.productname === "Benin Electricity Prepaid"
      ) {
        setModal(true);
      } else {
        props.showLoader();
        setTimeout(() => {
          props.hideLoader();
        }, 3000);
        const data =
          getProducts.listProducts === null
            ? ""
            : getProducts.listProducts.forEach((detail) => {
                if (
                  details.otherData.productId.productname ===
                  detail.productId.productname
                ) {
                  setTimeout(() => {
                    dispatch(hideLoader());
                  }, 2000);
                  const data = {
                    detail,
                    productname: detail.productId.description,
                    productId: details.otherData.productId.id,
                    billerCode: detail.billerCode,
                  };
                  dispatch(someData(data));
                  let path = `/${process.env.REACT_APP_RELOADNG}/product-details`;
                  history.push({
                    pathname: path,
                  });
                }
              });
      }
    }
  };

  const handleClose = () => {
    setModal(false);
  };

  const handleBtn = (e) => {
    let word = e.target.value;

    if (word === "") {
      setProductData(
        getProducts.listProducts === null ? "" : getProducts.listProducts
      );
    } else if (word === "Airtime") {
      const filtered =
        getProducts.listProducts === null
          ? []
          : getProducts.listProducts.filter(
              (item) => item.productId.description === "Airtime"
            );
      setProductData(filtered);
    } else if (word === "Data") {
      const filtered =
        getProducts.listProducts === null
          ? []
          : getProducts.listProducts.filter(
              (item) => item.productId.description === "Data"
            );
      setProductData(filtered);
    } else if (word === "Cable") {
      const filtered =
        getProducts.listProducts === null
          ? []
          : getProducts.listProducts.filter(
              (item) => item.productId.description === "Cable"
            );
      setProductData(filtered);
    } else if (word === "Electricity") {
      const filtered =
        getProducts.listProducts === null
          ? []
          : getProducts.listProducts.filter(
              (item) =>
                item.productId.description === "Electricity Prepaid (IKEDC)" ||
                item.productId.description === "Electricity Prepaid (EKEDC)" ||
                item.productId.description === "Electricity Prepaid (AEDC)" ||
                item.productId.description === "Electricity Prepaid (KAEDCO)" ||
                item.productId.description === "Electricity Prepaid (phed)" ||
                item.productId.description === "Electricity Prepaid (JED)" ||
                item.productId.description === "Electricity (KEDCO)" ||
                item.productId.description === "Electricity (EEDC)"
            );
      setProductData(filtered);
    } else if (word === "Loan") {
      // setModal(true);
      if (user === null) {
        history.push(`/${process.env.REACT_APP_RELOADNG}/registration`);
      } else {
        window.location.href = `/${process.env.REACT_APP_RELOADNG}/loan`;
      }
    } else if (word === "Exams") {
      const filtered =
        getProducts.listProducts === null
          ? []
          : getProducts.listProducts.filter(
              (item) => item.productId.description === "Exams"
            );
      setProductData(filtered);
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="p-5">
        <h4>Product not available at the moment</h4>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      {/* <div className=""> */}
      <div className="property-area pd-top-100">
        <div className="container">
          <div className="row custom-gutter">
            <div className="col-lg-12">
              <div className="property-filter-menu-wrap">
                <div className="property-filter-menu portfolio-filter text-center">
                  <button
                    style={{ backgroundColor: "#fda94f", color: "#000" }}
                    value=""
                    onClick={handleBtn}
                    className="active"
                  >
                    All Products
                  </button>
                  <button
                    style={{ backgroundColor: "#fda94f", color: "#000" }}
                    value="Airtime"
                    onClick={handleBtn}
                  >
                    Airtime
                  </button>
                  <button
                    style={{ backgroundColor: "#fda94f", color: "#000" }}
                    value="Data"
                    onClick={handleBtn}
                  >
                    Data
                  </button>
                  <button
                    style={{ backgroundColor: "#fda94f", color: "#000" }}
                    value="Cable"
                    onClick={handleBtn}
                  >
                    Cable
                  </button>
                  <button
                    style={{ backgroundColor: "#fda94f", color: "#000" }}
                    value="Electricity"
                    onClick={handleBtn}
                  >
                    Electricity
                  </button>
                  <button
                    style={{ backgroundColor: "#fda94f", color: "#000" }}
                    value="Loan"
                    onClick={handleBtn}
                  >
                    Loan
                  </button>
                  <button
                    style={{ backgroundColor: "#fda94f", color: "#000" }}
                    value="Exams"
                    onClick={handleBtn}
                  >
                    Exams
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/*Products filter Start*/}
          <div className="desktop-products">
            <div className="property-filter-area row custom-gutter">
              {productData !== "" &&
                productData.map((item, i) => (
                  <div
                    key={i}
                    className={
                      item.billerCode === "9mobiledata1"
                        ? "disabledCardProduct col-lg-3 col-sm-6"
                        : "rld-filter-item  col-lg-3 col-sm-6 " +
                          item.productId.description
                    }
                  >
                    <div className="single-feature">
                      <div className="details">
                        <img
                          src={item.productId.logourl}
                          style={{ width: "30%" }}
                          alt="img"
                        />
                        <h6 className="title readeal-top">
                          <Button
                            disabled
                            style={{ color: "#fda94f" }}
                            to={item.url}
                          >
                            {item.productId.productname}
                          </Button>
                        </h6>

                        <ul className="info-list">
                          <li></li>
                        </ul>
                        <ul className="contact-list">
                          <li className="readeal-top">
                            {item.billerCode === "STARTIMES_BASIC" ||
                            item.billerCode === "IBEDC_F" ||
                            item.billerCode === "KEDCO" ||
                            item.billerCode === "JAMB" ||
                            item.billerCode === "NTELBundle" ||
                            item.billerCode === "SPECTRANET" ||
                            // item.billerCode === "Smile-Data_BLACKSILICON" ||
                            item.billerCode === null ? (
                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  border: "2px solid #fff",
                                  color: "#000",
                                }}
                                disabled
                              >
                                Product not available
                              </button>
                            ) : (
                              <Button
                                onClick={(e) => handlePay({ otherData: item })}
                                style={{
                                  backgroundColor: "#fda94f",
                                  color: "#000",
                                }}
                              >
                                Buy
                              </Button>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="mobileProducts">
            <div className="">
              <div className="rows">
                <Grid container item xs={12} spacing={3}>
                  {productData !== "" &&
                    productData.map((item, i) => (
                      <div key={i} className="columns p-3">
                        <div>
                          {item.billerCode === "STARTIMES_BASIC" ||
                          item.billerCode === "IBEDC_F" ||
                          item.billerCode === "KEDCO" ||
                          // item.billerCode === "Smile-Data_BLACKSILICON" ||
                          item.billerCode === "JAMB" ||
                          item.billerCode === "NTELBundle" ||
                          item.billerCode === "SPECTRANET" ||
                          item.billerCode === null ? (
                            <>
                              <img
                                src={item.productId.logourl}
                                style={{
                                  maxWidth: "70px",
                                  backgroundAttachment: "fixed",
                                  overflow: "hidden",
                                  filter: "blur(2px)",
                                }}
                                alt="img"
                              />
                              <p style={{ fontSize: "15px" }}>Under Test</p>
                            </>
                          ) : (
                            <>
                              {item.billerCode === "STARTIMES_BASIC" ||
                              item.billerCode === "KEDCO" ||
                              item.billerCode === "JAMB" ||
                              item.billerCode === "SPECTRANET" ||
                              item.billerCode === "NTELBundle" ||
                              item.billerCode === null ? (
                                <Button
                                  disabled
                                  onClick={(e) =>
                                    handlePay({ otherData: item })
                                  }
                                >
                                  <div>
                                    <img
                                      src={item.productId.logourl}
                                      style={{
                                        maxWidth: "70px",
                                        backgroundAttachment: "fixed",
                                        overflow: "hidden",
                                        filter: "blur(2px)",
                                      }}
                                      alt="img"
                                    />
                                    <span>Unavailable</span>
                                  </div>
                                </Button>
                              ) : (
                                <Button
                                  onClick={(e) =>
                                    handlePay({ otherData: item })
                                  }
                                >
                                  <img
                                    src={item.productId.logourl}
                                    style={{ maxWidth: "80px" }}
                                    alt="img"
                                  />
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(
  connect(null, { showLoader, hideLoader, someData })(Property)
);
