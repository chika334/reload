import React, { useState, useEffect } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import { withRouter, Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { hideLoader } from "../../_action/loading";
import { Button } from "@material-ui/core";
import ProductTable from "./productDetails/productTable";
import { products } from "../../data/products";
// import imageDstv from "";

function PropertyDetails(props) {
  const exploreProducts = useSelector((state) => state.exploreProducts);
  const dispatch = useDispatch();
  const [pay, setPay] = useState(false);
  const [productData, setProductData] = useState();

  // useEffect(() => {
  //   if (exploreProducts.productDisplay === true) {
  //     // setValues({ ...values, title: title, image: image });
  //     props.hideLoader();
  //   }
  // }, [exploreProducts]);

  const handlePay = (e) => {
    e.preventDefault();
    setPay(true);
  };

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const productKey = params.get("product");
    setProductData(products[productKey]);
  }, [props.location]);

  return (
    <div className="property-details-area">
      <div className="bg-gray pd-top-100 pd-bottom-90">
        {!productData ? null : (
          <div className="container">
            <div className="row">
              <div className="col-lg-8 contact-form-wrap">
                <div className="item">
                  <div className="d-flex align-item-center justify-content-center">
                    <img
                      width="200"
                      // className=""
                      src={`${productData ? productData.icon : ""}`}
                      alt="image"
                    />
                  </div>
                </div>
                <div className="property-details-slider-info">
                  {/* <ProductTable dataTitle={productData} /> */}
                  <div className="d-flex align-item-center justify-content-center">
                    <div className="mt-5">
                      <div>
                        <label className="pr-3">Smart Card Number:</label>
                        <input type="number" placeholder="Enter IUC number" />
                      </div>
                      <div className="pt-3">
                        <label style={{ paddingRight: "95px" }}>
                          Price List:{" "}
                        </label>
                        <select style={{ width: "202px" }}>
                          <option>Select Amount</option>
                          <option>1000</option>
                          <option>2000</option>
                          <option>3000</option>
                          <option>4000</option>
                          <option>5000</option>
                          <option>6000</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-xl-2 col-lg-4 col-md-4 readeal-top"> */}
                <div className="d-flex align-item-center justify-content-center">
                  <Button
                    style={{ backgroundColor: "#fda94f", color: "#fff" }}
                    className="btn btn-yellow mt-5"
                    onClick={(e) => handlePay(e)}
                  >
                    Proceed to payment
                  </Button>
                </div>
              </div>
              {pay === true && (
                <div className="col-lg-4">
                  <form className="contact-form-wrap contact-form-bg">
                    <h4>Payment Process</h4>
                    <div className="rld-single-input">
                      <input type="text" placeholder="Name" />
                    </div>
                    <div className="rld-single-input">
                      <input type="text" placeholder="Phone" />
                    </div>
                    <div className="rld-single-input">
                      <input type="text" placeholder="Phone" />
                    </div>
                    <div className="rld-single-input">
                      <textarea
                        rows={10}
                        placeholder="Message"
                        defaultValue={""}
                      />
                    </div>
                    <div className="btn-wrap text-center">
                      <button className="btn btn-yellow">Pay</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  exploreProducts: state.exploreProducts,
});

export default withRouter(
  connect(mapStateToProps, { hideLoader })(PropertyDetails)
);
