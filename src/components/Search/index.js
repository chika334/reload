import React from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { SearchProducts } from "../../_action/searchAction";
import { withRouter, useHistory } from "react-router-dom";
import { hideLoader, showLoader } from "../../_action/loading";
import { someData } from "../../_action/passingData";
import OutsideAlerter from "./Outside";

function App(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const getProducts = useSelector((state) => state.products);
  const { options, onInputChange, searchStart, setSearchStart } = props;

  const handleClearSearch = (value) => {
    setSearchStart(value);
  };

  const handleMove = (details) => {
    if (
      details.otherData.productId.productname === "Smile Data" ||
      details.otherData.productId.productname === "Benin Electricity Prepaid" ||
      details.otherData.productId.productname === "Jamb Exams" ||
      details.otherData.productId.productname === "Waec Exams Registration"
    ) {
      setModal(true);
    } else {
      dispatch(showLoader());
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
  };

  return (
    <OutsideAlerter handleClearSearch={handleClearSearch}>
      <div className="banner-search-wrap">
        <div className="tab-content">
          <div className="tab-pane fade show active" id="tabs_1">
            <div className="mobileBanner">
              <div className="row">
                <div className="col-xl-12 col-lg-8 col-md-12">
                  <div className="search-bar-dropdown">
                    <div className="rld-main-search">
                      <input
                        id="search-bar"
                        type="text"
                        className="form-control p-2 w-100"
                        placeholder="Search for biller eg Mtn, Dstv…"
                        onChange={onInputChange}
                      />
                    </div>
                    {searchStart === true ? (
                      <ul
                        id="results"
                        className="list-group"
                        style={{ zIndex: 2 }}
                      >
                        {options.length !== 0 ? (
                          options.map((option, index) => {
                            return (
                              <div className="">
                                {/* {option.productId.billerCode ===
                                  "Smile-Data_BLACKSILICON" ||
                                option.productId.billerCode ===
                                  "Glo-Data_BLACKSILICON" ||
                                option.productId.billerCode ===
                                  "9mobile-Data_BLACKSILICON" ||
                                option.productId.billerCode ===
                                  "Airtel-Data_BLACKSILICON" ||
                                option.productId.billerCode ===
                                  "Mtn-Data_BLACKSILICON" ||
                                option.productId.billerCode === "GOTV" ||
                                option.productId.description === "Airtime" ? (
                                  <button
                                    type="button"
                                    key={index}
                                    onClick={(e) => {
                                      handleMove({
                                        otherData: option,
                                      });
                                    }}
                                    className="list-group-item list-group-item-action"
                                    disabled
                                  >
                                    <img
                                      width="60"
                                      src={option.productId.logourl}
                                      alt="..."
                                    />
                                    <span className="ml-5">
                                      Product Under Test
                                    </span>
                                  </button>
                                ) : (
                                  <> */}
                                {option.productId.billerCode === "STARTIMES" ||
                                option.productId.billerCode === "Smile-Data_BLACKSILICON" ||
                                option.productId.billerCode === "IBEDC_F" ||
                                option.productId.billerCode === null ? (
                                  <button
                                    type="button"
                                    key={index}
                                    onClick={(e) => {
                                      handleMove({
                                        otherData: option,
                                      });
                                    }}
                                    className="list-group-item list-group-item-action"
                                    disabled
                                  >
                                    <img
                                      width="60"
                                      src={option.productId.logourl}
                                      alt="..."
                                    />
                                    <span className="ml-5">Unavailable</span>
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    key={index}
                                    onClick={(e) => {
                                      handleMove({
                                        otherData: option,
                                      });
                                    }}
                                    className="list-group-item list-group-item-action"
                                  >
                                    <img
                                      width="40"
                                      src={option.productId.logourl}
                                      alt="..."
                                    />
                                    {option.productId.productname}
                                  </button>
                                )}
                                {/* </>
                                )} */}
                              </div>
                            );
                          })
                        ) : (
                          <div className="list-group-item list-group-item-action text-center">
                            No items found.
                          </div>
                        )}
                      </ul>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OutsideAlerter>
  );
}

function Index() {
  const seachDetails = useSelector((state) =>
    state.search.listProducts === null ? "" : state.search.listProducts.product
  );
  const dispatch = useDispatch();
  const [searchStart, setSearchStart] = React.useState(false);
  const onInputChange = (event) => {
    if (event.target.value.length === 0) {
      setSearchStart(false);
    } else if (event.target.value.length >= 3) {
      setSearchStart(true);
      const values = {
        searchValue: event.target.value,
      };
      dispatch(SearchProducts(values));
    }
  };

  return (
    <div>
      <App
        setSearchStart={setSearchStart}
        searchStart={searchStart}
        options={seachDetails}
        onInputChange={onInputChange}
      />
    </div>
  );
}

export default withRouter(
  connect(null, { hideLoader, showLoader, SearchProducts, someData })(Index)
);
