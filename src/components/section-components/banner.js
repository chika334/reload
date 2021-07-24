import React, { useState, useEffect } from "react";
import backgroundImage from "../../images/background.jpeg";
import { Button, Modal } from "@material-ui/core";
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

const SearchbarDropdown = (props) => {
  const classes = useStyles();
  const { options, onInputChange, searchStart } = props;
  const getProducts = useSelector((state) => state.products);
  const [saveData, setSaveData] = useState([]);
  const [modalStyle] = React.useState(getModalStyle);
  const [imgsLoaded, setImgsLoaded] = useState(false);
  const [modal, setModal] = useState(false);
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    Promise.all([first, second, third, fourth, fifth, sixth])
      .then((files) => {
        setTimeout(() => {
          setSaveData(files);
        }, 500);
      })
      .catch((err) => console.log(err));
  };

  const handleMove = (details) => {
    console.log(details);
    if (
      details.otherData.productId.productname === "Smile Data" ||
      details.otherData.productId.productname === "Dstv Cable" ||
      details.otherData.productId.productname === "Gotv Cable" ||
      details.otherData.productId.productname === "Startime Cable" ||
      details.otherData.productId.productname ===
        "Ibadan Electricity Prepaid" ||
      details.otherData.productId.productname === "Eko Electricity Prepaid" ||
      details.otherData.productId.productname === "Benin Electricity Prepaid" ||
      details.otherData.productId.productname ===
        "Kaduna Electricity Prepaid" ||
      details.otherData.productId.productname === "Jos Electricity Prepaid" ||
      details.otherData.productId.productname === "Kano Electricity Prepaid" ||
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
    <>
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <div className="banner-area" style={inlineStyle}>
        <div className="container">
          <div className="banner-inner-wrap">
            <div className="row">
              <div className="col-12">
                <div className="allnew">
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
                                    {options.length !== 0
                                      ? options.map((option, index) => {
                                          // console.log(option);
                                          return (
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
                                              {option.productId.productname}
                                            </button>
                                          );
                                        })
                                      : ""}
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
                      {/* </div> */}
                    </div>
                  </div>
                  <div className="banner-search-wrap">
                    <div className="tab-content">
                      <div className="tab-pane fade show active" id="tabs_1">
                        <div className="bannerAds mobileBanner">
                          <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <div className="search-bar-dropdown">
                                <Carousel style={{ position: "fixed" }}>
                                  {!saveData || !saveData.length ? (
                                    <img width="1000" src={first} />
                                  ) : (
                                    saveData.map((item, i) => (
                                      <img width="1000" key={i} src={item} />
                                    ))
                                  )}
                                </Carousel>
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
      </div>
    </>
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
  connect(null, { hideLoader, showLoader, SearchProducts, someData })(App)
);
