import React from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { SearchProducts } from "../../_action/searchAction";
import { withRouter, useHistory } from "react-router-dom";
import { hideLoader, showLoader } from "../../_action/loading";
import { someData } from "../../_action/passingData";

function App(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const getProducts = useSelector((state) => state.products);
  const { options, onInputChange, searchStart } = props;

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
    <div className="banner-search-wrap">
      <div className="tab-content">
        <div className="tab-pane fade show active" id="tabs_1">
          <div className="rld-main-search mobileBanner">
            <div className="row">
              <div className="col-xl-12 col-lg-8 col-md-12">
                <div className="search-bar-dropdown">
                  <input
                    id="search-bar"
                    type="text"
                    className="form-control p-2"
                    placeholder="Search for biller eg Mtn, Dstv…"
                    onChange={onInputChange}
                  />
                  {searchStart === true ? (
                    <ul
                      id="results"
                      className="list-group"
                      style={{ zIndex: 2 }}
                    >
                      {options.length !== 0 ? (
                        options.map((option, index) => {
                          console.log(option);
                          return (
                            <div className="">
                              {option.productId.billerCode === "STARTIMES" ||
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
  );
}

function Index() {
  const seachDetails = useSelector((state) =>
    state.search.listProducts === null ? "" : state.search.listProducts.product
  );
  // const [options, setOptions] = useState(seachDetails);
  const dispatch = useDispatch();
  const [searchStart, setSearchStart] = React.useState(false);
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
    }
  };

  return (
    <div>
      <App
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
