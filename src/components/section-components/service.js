import React, { useEffect, useState } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import { Link, withRouter, useHistory } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { Card, CardContent, Button, Modal } from "@material-ui/core";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { exportButton } from "../../_action/exploreProducts";
import { connect, useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../_action/loading";
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

function SliderArrowPrev(props) {
  const { className, onClick } = props;
  return (
    <div onClick={onClick}>
      <FaArrowCircleLeft className={className} />
    </div>
  );
}

function SliderArrowNext(props) {
  const { className, onClick } = props;
  return (
    <div onClick={onClick}>
      <FaArrowCircleRight className={className} />
    </div>
  );
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

function Service(props) {
  const getProducts = useSelector((state) => state.products);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  // let publicUrl = process.env.PUBLIC_URL + "/";
  // let imagealt = "image";
  let data = sectiondata.services;

  const marketingTestimonials1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    autoplay: true,
    slidesToScroll: 1,
    cssEase: "linear",
    className: "slides",
    nextArrow: <SliderArrowNext />,
    prevArrow: <SliderArrowPrev />,
    responsive: [
      {
        breakpoint: 599,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };
  const handleMove = (details) => {
    console.log(details);
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
        details.otherData.billerCode === "SMILE"
      ) {
        setModal(true);
      } else {
        props.showLoader();
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
                let path = `/reloadng/product-details`;
                history.push({
                  pathname: path,
                  search: `?product=${detail.productId.description}`,
                  state: {
                    data: detail,
                    productName: detail.productId.description,
                    productId: details.otherData.productId.id,
                    billerCode: detail.billerCode,
                  },
                });
              }
            });
      }
    }
  };

  const handleClose = () => {
    setModal(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="p-5">
        <h4>Product not available at the moment</h4>
      </div>
    </div>
  );

  return (
    <div className="service-area h1-service-slider-area">
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <div className="container">
        <Slider
          {...marketingTestimonials1}
          className="row slider-arrows-outside slider-arrows-dark slider-dots-outside"
        >
          {getProducts.listProducts === null
            ? ""
            : getProducts.listProducts
                .filter((item) => ![12, 15, 21, 23, 32].includes(item.id))
                .map((listData, i) => (
                  <div key={i}>
                    <Card style={{ height: "300px" }} className="m-4">
                      <CardContent>
                        <div className="text-center">
                          <div style={{ height: "140px" }}>
                            <div
                              style={{ height: "100px" }}
                              onClick={(e) =>
                                handleMove({ otherData: listData })
                              }
                              style={{ cursor: "pointer" }}
                              className="d-flex justify-content-center"
                            >
                              <img
                                src={listData.productId.logourl}
                                style={{
                                  width: "100px",
                                }}
                                alt="..."
                              />
                            </div>
                            <hr className="pb-3" />
                            <div className="details readeal-top">
                              <h5 className="pb-2" style={{ fontSize: "15px" }}>
                                {listData.productId.productname}
                              </h5>
                              <hr />
                              <Button
                                className="readmore-btn"
                                style={{
                                  backgroundColor: "#fda94f",
                                  color: "#000",
                                  fontSize: "12px",
                                  padding: "10px",
                                }}
                                onClick={(e) =>
                                  handleMove({ otherData: listData })
                                }
                              >
                                {/* {listData.btntxt} */}
                                Explore
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
        </Slider>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  exploreProducts: state.exploreProducts,
});

export default withRouter(
  connect(mapStateToProps, { exportButton, showLoader, hideLoader })(Service)
);
