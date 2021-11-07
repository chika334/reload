import React, { useState, useEffect } from "react";
import backgroundImage from "../../images/background.jpeg";
import { Modal } from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { hideLoader, showLoader } from "../../_action/loading";
import { SearchProducts } from "../../_action/searchAction";
import "../../css/banner.css";
import Carousel from "react-material-ui-carousel";
import { someData } from "../../_action/passingData";
import { makeStyles } from "@material-ui/core/styles";
import "react-lazy-load-image-component/src/effects/blur.css";
import first from "../../images/1.jpeg";
import second from "../../images/2.jpeg";
import third from "../../images/3.jpeg";
import fourth from "../../images/4.jpeg";
import fifth from "../../images/5.jpeg";
import sixth from "../../images/6.jpeg";
import Index from "../Search";

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
  const [bgImgArray] = useState([
    "1.jpeg",
    "2.jpeg",
    "3.jpeg",
    "4.jpeg",
    "5.jpeg",
    "6.jpeg",
  ]);
  const [saveData, setSaveData] = useState([]);
  const [modalStyle] = React.useState(getModalStyle);
  const [modal, setModal] = useState(false);
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
        <div className="mr-5 container">
          <div className="banner-inner-wrap">
            <div className="row">
              <div className="col-12 mt-3" style={{ color: "#fff" }}>
                <div className="banner-inner">
                  <h3 className="text-light text-center">
                    Reload, swift payment.
                  </h3>
                  <h5 className="text-light text-center">
                    Buy Airtime, Cable, Electricity...
                  </h5>
                </div>
              </div>
              <div className="allnewMobile">
                <div className="banner-search-wrap">
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="tabs_1">
                      <div className="bannerAds mobileBanner">
                        <div className="row">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="search-bar-dropdown">
                              <Carousel style={{ position: "fixed" }}>
                                {!saveData || !saveData.length ? (
                                  <img
                                    src={first}
                                    alt="..."
                                    style={{
                                      webkitTransition: "5s ease-in-out",
                                      transition: "5s ease-in-out",
                                    }}
                                  />
                                ) : (
                                  saveData.map((item, i) => (
                                    <img
                                      src={item}
                                      alt="..."
                                      style={{
                                        webkitTransition: "5s ease-in-out",
                                        transition: "5s ease-in-out",
                                      }}
                                    />
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
                <Index /> {/*  the search banner */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(
  connect(null, { hideLoader, showLoader, SearchProducts, someData })(
    SearchbarDropdown
  )
);
