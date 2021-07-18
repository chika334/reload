import React, { useState, useRef } from "react";
import backgroundImage from "../../images/background.jpeg";
import { Button } from "@material-ui/core";
import searchLoading from "../../images/searchLoading.gif";
import { connect, useSelector, useDispatch } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { hideLoader, showLoader } from "../../_action/loading";
import { SearchProducts } from "../../_action/searchAction";
import "../../css/banner.css";
import first from "../../images/1.jpeg";
import second from "../../images/2.jpeg";
import third from "../../images/3.jpeg";
import fourth from "../../images/4.jpeg";
import fifth from "../../images/5.jpeg";
import sixth from "../../images/6.jpeg";
import Carousel from "react-material-ui-carousel";

var items = [
  {
    imgSrc: `${first}`,
  },
  {
    imgSrc: `${second}`,
  },
  {
    imgSrc: `${third}`,
  },
  {
    imgSrc: `${fourth}`,
  },
  {
    imgSrc: `${fifth}`,
  },
  {
    imgSrc: `${sixth}`,
  },
];

const SearchbarDropdown = (props) => {
  const { options, onInputChange, searchStart } = props;
  const getProducts = useSelector((state) => state.products);
  const history = useHistory();
  const dispatch = useDispatch();

  const inlineStyle = {
    backgroundImage: `url(${backgroundImage})`,
    height: "95vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
  };

  const handleMove = (details) => {
    dispatch(showLoader());
    // console.log(details.otherData.productId.id);
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
  };

  return (
    <div className="banner-area" style={inlineStyle}>
      <div className="container">
        <div className="banner-inner-wrap">
          <div className="row">
            <div className="col-12">
              <div className="allnew">
                <div className="banner-search-wrap">
                  <div className="tab-content">
                    {/* <div className="tab-content"> */}
                    <div className="tab-pane fade show active" id="tabs_1">
                      <div className="rld-main-search mobileBanner">
                        <div className="row">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="search-bar-dropdown">
                              <Carousel>
                                {items.map((item, i) => (
                                  <img key={i} src={item.imgSrc} />
                                ))}
                              </Carousel>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
                <div className="banner-search-wrap">
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="tabs_1">
                      <div className="rld-main-search mobileBanner">
                        <div className="row">
                          <div className="col-xl-9 col-lg-8 col-md-6">
                            <div className="search-bar-dropdown">
                              <input
                                id="search-bar"
                                type="text"
                                className="form-control p-2"
                                placeholder="Search"
                                onChange={onInputChange}
                              />
                              {searchStart === true ? (
                                <ul
                                  id="results"
                                  className="list-group"
                                  // ref={ulRef}
                                  style={{ zIndex: 2 }}
                                >
                                  {options !== "" &&
                                    options.map((option, index) => {
                                      return (
                                        <button
                                          type="button"
                                          key={index}
                                          onClick={(e) => {
                                            handleMove({
                                              // data: option.productId.productname,
                                              otherData: option,
                                            });
                                          }}
                                          className="list-group-item list-group-item-action"
                                        >
                                          {option.productId.productname}
                                        </button>
                                      );
                                    })}
                                </ul>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-4 readeal-top">
                            <Button
                              style={{
                                backgroundColor: "#fda94f",
                                color: "#000",
                                fontSize: "12px",
                                padding: "10px",
                              }}
                              className="buttonSearch"
                              // className="btn btn-yellow buttonSearch"
                              fullWidth
                              disabled={searchStart}
                            >
                              {searchStart === true ? (
                                <img
                                  src={searchLoading}
                                  width="30"
                                  alt="search..."
                                />
                              ) : (
                                "View"
                              )}
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
    </div>
  );
};

function App() {
  const seachDetails = useSelector((state) =>
    state.search.listProducts === null ? "" : state.search.listProducts.product
  );
  // const [options, setOptions] = useState(seachDetails);
  const dispatch = useDispatch();
  const [searchStart, setSearchStart] = useState(false);
  const onInputChange = (event) => {
    if (event.target.value.length === 0) {
      setSearchStart(false);
      // setOptions([]);
    } else if (event.target.value.length >= 3) {
      setSearchStart(true);
      const values = {
        searchValue: event.target.value,
      };
      dispatch(SearchProducts(values));
      // setOptions(
      //   defaultOptions.filter((option) =>
      //     option
      //       .toLocaleLowerCase()
      //       .includes(event.target.value.toLocaleLowerCase())
      //   )
      // );
    }
  };

  return (
    <div>
      <SearchbarDropdown
        searchStart={searchStart}
        options={seachDetails}
        onInputChange={onInputChange}
      />
      {/* <br /> */}
      {/* <button className="btn btn-primary">Search</button> */}
    </div>
  );
}

export default withRouter(
  connect(null, { hideLoader, showLoader, SearchProducts })(App)
);
