import React, { useState, useEffect } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import { Link, withRouter } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { products, searchProducts } from "../../data/products";
import { connect, useSelector } from "react-redux";
import AirtimeSearchList from "../searchList/AirtimeSearchList";
import DataSearchList from "../searchList/DataSearchList";
import CableSearchList from "../searchList/CableSearchList";
import ElectricSearchList from '../searchList/ElectricSearchList'
import ExamsSearchList from '../searchList/ExamsSearchList'

function SearchList(props) {
  const getProducts = useSelector((state) => state.products);
  const [productData, setProductData] = useState();
  const [searchproductData, setSearchProductData] = useState();
  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const productKey = params.get("product");
    setSearchProductData(searchProducts[productKey]);
  }, [props.location]);

  // let publicUrl = process.env.PUBLIC_URL + "/";
  // let imagealt = "image";
  let data = sectiondata.searchlist;

  const handlePay = (e, props) => {
    e.preventDefault();
    // console.log("good", props);
  };

  // console.log(getProducts);
  // console.log(props.location.search === "?product=Data");

  return (
    <div className="search-page-wrap pd-top-100 pd-bottom-70">
      <div className="search-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-3 sitebar">
              <form className="widget widget-sidebar-search-wrap mt-4">
                <div className="">
                  Reload's data consist of Airtel, Mtn, Glo, Etisalat and Smile
                  network provider
                </div>
                <div className="btn-wrap text-center">
                  <Link to="/reloadng/about" className="btn btn-yellow">
                    Read more
                  </Link>
                </div>
              </form>
            </div>
            <div className="col-xl-8 col-lg-8">
              <div className="row mb-2">
                <div className="col-md-9 col-sm-8">
                  <h6 className="filter-title mt-3 mb-lg-0"></h6>
                </div>
              </div>

              {props.location.search === "?product=Airtime" && (
                <AirtimeSearchList />
              )}
              {props.location.search === "?product=Data" && <DataSearchList />}
              {props.location.search === "?product=Cable" && (
                <CableSearchList />
              )}
              {props.location.search === "?product=Electric" && (
                <ElectricSearchList />
              )}
              {props.location.search === "?product=Exams" && (
                <ExamsSearchList />
              )}

              {/* {getProducts.listProducts === null
                ? ""
                : getProducts.listProducts.products.map((allData, index) => (
                    <div className="single-feature style-two">
                      <div className="thumb">
                        <img src={allData.icon} alt="img" />
                      </div>
                      <div className="details">
                        <div className="details-wrap">
                          <p className="author">
                            <i className="fa fa-user" /> {allData.id}
                          </p>
                          <h6 className="title readeal-top">{allData.title}</h6>
                          <TextField
                            className="mb-3"
                            fullWidth
                            id="filled-basic"
                            label="Email"
                            variant="filled"
                          />
                          <TextField
                            fullWidth
                            id="filled-basic"
                            label="Phone Number"
                            variant="filled"
                          />
                          <div className="d-flex align-item-center justify-content-center">
                            <Button
                              onClick={(e) =>
                                handlePay(e, {
                                  productName: allData.title,
                                })
                              }
                              style={{
                                backgroundColor: "#fda94f",
                                color: "#fff",
                                marginTop: "10px",
                              }}
                            >
                              Pay
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SearchList);
