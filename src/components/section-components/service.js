import React, { useEffect, useState } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import { Link, withRouter, useHistory } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent, Button } from "@material-ui/core";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { exportButton } from "../../_action/exploreProducts";
import { connect, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../_action/loading";
// import { products } from "../../data/products";

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

function Service(props) {
  const getProducts = useSelector((state) => state.products);
  const history = useHistory();
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

  const handleMove = (detail) => {
    props.showLoader();
    // props.exportButton(detail.data.icon, detail.data.title);
    // localStorage.setItem("dataImage", detail.data.icon);
    // localStorage.setItem("dataTitle", detail.data.title);

    console.log(detail);

    setTimeout(() => {
      props.hideLoader();
    }, 2000);

    let path = `/reloadng/product-details`;
    history.push({
      pathname: path,
      search: `?product=${detail.data.productId.description}`,
      state: detail,
    });
  };

  console.log(getProducts);

  return (
    <div className="service-area h1-service-slider-area">
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
                                onClick={(e) => handleMove({ data: listData })}
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
