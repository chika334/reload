import React, { useState } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import { Link, useHistory, withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { Button, Modal } from "@material-ui/core";
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
  // const someData
  const [productData, setProductData] = useState(
    getProducts.listProducts === null ? "" : getProducts.listProducts
  );

  const handlePay = (details) => {
    // console.log(details.otherData.billerCode);
    if (details.otherData.billerCode === null) {
      setModal(true);
    } else {
      if (
        details.otherData.billerCode === "DSTV2" ||
        details.otherData.billerCode === "startimes" ||
        details.otherData.billerCode === "GOTV2" ||
        details.otherData.billerCode === "KADUNA_PREPAID" ||
        details.otherData.billerCode === "KANO_PREPAID" ||
        details.otherData.billerCode === "ekdc prepaid" ||
        details.otherData.billerCode === "JOS_PREPAID" ||
        details.otherData.billerCode === "SMILE"
      ) {
        setModal(true);
      } else {
        props.showLoader();
        setTimeout(() => {
          props.hideLoader();
        }, 3000);
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
                // let path = `/reloadng/product-details`;
                // history.push({
                //   pathname: path,
                //   search: `?product=${detail.productId.description}`,
                //   state: {
                //     data: detail,
                //     productName: detail.productId.description,
                //     productId: details.otherData.productId.id,
                //     billerCode: detail.billerCode,
                //   },
                // });
                const data = {
                  detail,
                  productname: detail.productId.description,
                  productId: details.otherData.productId.id,
                  billerCode: detail.billerCode,
                };
                dispatch(someData(data));
                let path = `/reloadng/product-details`;
                history.push({
                  pathname: path,
                  search: `product=${detail.productId.description}`,
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

    if (word === "*") {
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
                item.productId.description === "Electricity Prepaid (KEDCO)" ||
                item.productId.description === "Electricity Prepaid (phed)" ||
                item.productId.description === "Electricity Prepaid (JED)"
            );
      setProductData(filtered);
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
      <div className="property-area pd-top-100">
        <div className="container">
          <div className="row custom-gutter">
            <div className="col-lg-12">
              <div className="property-filter-menu-wrap">
                <div className="property-filter-menu portfolio-filter text-center">
                  <button
                    style={{ backgroundColor: "#fda94f", color: "#000" }}
                    value="*"
                    onClick={handleBtn}
                    className="active"
                  >
                    All Properties
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
          <div className="property-filter-area row custom-gutter">
            {/* <div className="gallery-sizer col-1" /> */}
            {productData !== "" &&
              productData.map((item, i) => (
                // console.log(item)
                <div
                  key={i}
                  className={
                    "rld-filter-item  col-lg-3 col-sm-6 " +
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
                          <Button
                            onClick={(e) => handlePay({ otherData: item })}
                            style={{
                              backgroundColor: "#fda94f",
                              color: "#000",
                            }}
                          >
                            Buy
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(
  connect(null, { showLoader, hideLoader, someData })(Property)
);
