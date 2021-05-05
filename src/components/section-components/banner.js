import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import backgroundImage from "../../images/background.jpeg";
import NamesContainer from "./Name/NameContainer";
import { product2, product } from "../jsonData/Data";
import Select from "react-select";
// import imageback from "../../images/imageback.jpg";

function Banner(props) {
  let history = useHistory();
  const [name, setNames] = useState(["Airtime", "Data", "Electric", "Cable"]);
  const [values, setValues] = useState({
    select: "",
    secondSelect: "",
    thirdSelect: "",
    searchTerm: "",
    productName: {},
    done: false,
  });
  const options = [
    { value: "Airtime", label: "Airtime" },
    { value: "Data", label: "Data" },
    { value: "Cable", label: "Cable" },
    { value: "Electric", label: "Electric" },
  ];
  const [lists, setList] = useState([]);
  const [amount, setAmount] = useState([]);
  const [product1, setProduct] = useState([]);

  const { select, searchTerm, productName, secondSelect, done } = values;

  const Submit = (selectedOption) => {
    // console.log(selectedOption);
    setValues({ ...values, select: selectedOption });
    setList(product2(selectedOption.value));
    setAmount(product2(selectedOption.value));
  };

  const thirdSubmit = (e) => {
    console.log("select");
  };

  const SecondSubmit = (e) => {
    setValues({ ...values, secondSelect: e.target.value, done: true });
    setProduct(product(e.target.value));
  };

  let publicUrl = process.env.PUBLIC_URL + "/";
  let imagealt = "image";
  let data = sectiondata.banner;

  const inlineStyle = {
    backgroundImage:
      "url(" + `${backgroundImage}` + "../../images/background.jpeg)",
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (select === "") {
      return null;
    } else {
      // let path = `search-list?product=${detail.data.key}`;
      const data = select.value.toLowerCase();
      let path = `search-list?product=${select.value}`;
      history.push(path);
    }
  };

  return (
    <div className="banner-area jarallax hero-image">
      <div className="container">
        <div className="banner-inner-wrap">
          <div className="row" style={{ width: "100%" }}>
            <div className="col-12">
              <div className="banner-search-wrap">
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="tabs_1">
                    <div className="rld-main-search">
                      <div className="row">
                        <div className="col-xl-9 col-lg-8 col-md-6">
                          <Select
                            value={select}
                            onChange={Submit}
                            options={options}
                            placeholder="Search..."
                          />
                        </div>
                        {/* <div className="col-xl-3 col-lg-6 col-md-6">
                          <div className="rld-single-select">
                            <select
                              style={{
                                height: "48px",
                                lineHeight: "47px",
                                width: "100%",
                                padding: "0 34px 0 20px",
                                marginBottom: "15px",
                                backgroundColor: "#fff",
                                position: "relative",
                                borderRadius: "4px",
                                border: `1px solid var(--main-color-one)`,
                              }}
                              onChange={SecondSubmit}
                            >
                              <option>Select Product Type</option>
                              {select.value === ""
                                ? null
                                : lists.length > 0
                                ? lists.map((l, i) => {
                                    return (
                                      <>
                                        <option key={i} value={l.firstProduct}>
                                          {l.firstProduct}
                                        </option>
                                      </>
                                    );
                                  })
                                : null}
                            </select>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                          <div className="rld-single-select">
                            {select.value === "Cable" ||
                            select.value === "Electric" ? (
                              <div className="rld-single-input">
                                <input placeholder="Enter Amount" type="text" />
                              </div>
                            ) : (
                              <select
                                onChange={thirdSubmit}
                                className="select single-select"
                              >
                                <option>Select Product Type</option>
                                {select.value === ""
                                  ? null
                                  : product1.length > 0
                                  ? product1.map((p, i) => {
                                      return (
                                        <>
                                          <option key={i} value={p.price}>
                                            {p.price}
                                          </option>
                                        </>
                                      );
                                    })
                                  : null}
                              </select>
                            )}
                          </div>
                        </div> */}
                        <div className="col-xl-3 col-lg-4 col-md-4 readeal-top">
                          {/* <Link className="btn btn-yellow" to="/search-list">
                            view products
                          </Link> */}
                          <Button
                            style={{
                              backgroundColor: "#fda94f",
                              color: "#fff",
                            }}
                            fullWidth
                            onClick={(e) => handleSearch(e)}
                          >
                            View Products
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // }
}

export default Banner;
