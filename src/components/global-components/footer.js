import React, { Component } from "react";
import { Link } from "react-router-dom";
import footerdata from "../../data/footerdata.json";
import logo from "../../images/logo.png";
// import OurPartner from "../section-components/our-partner";
import { partner } from "../../data/partner";

class Footer_v1 extends Component {
  render() {
    return (
      <footer className="footer-area">
        <div className="container">
          <div className="footer-top">
            <div className="row">
              <div className="col-sm-12 p-0">
                <div className="text-sm-right">
                  <b>OUR PARTNERS</b>
                  <ul className="social-icon">
                    {partner.items.map((item, i) => (
                      <li key={i} className="item">
                        <img
                          src={item.image}
                          style={{
                            filter: "grayscale(100%)",
                            height: "25px",
                          }}
                          alt="client"
                        />

                        <p style={{ fontSize: "10px" }}>{item.title}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="row">
              <div className="col-lg-4 col-sm-6">
                <div className="widget widget_nav_menu">
                  <div className="widget widget_nav_menu">
                    <div className="col-sm-4">
                      <a
                        className="footer-logo d-flex justify-content-center"
                        href="#"
                      >
                        <img src={logo} alt="..." />
                      </a>
                    </div>
                    <p className="readeal-top">
                      {footerdata.popularserces.links}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="widget widget_nav_menu">
                  <h4 className="widget-title">{footerdata.Homepress.title}</h4>
                  <ul>
                    {footerdata.Homepress.links.map((item, i) => (
                      <li className="readeal-top" key={i}>
                        <a href={item.url}>{item.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="widget widget_nav_menu">
                  <h4 className="widget-title">{footerdata.quicklink.title}</h4>
                  <p className="readeal-top">{footerdata.quicklink.links}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="footer-social text-sm-center">
              <span>FOLLOW US</span>
              <ul className="social-icon">
                {footerdata.socialicon.map((item, i) => (
                  <li key={i}>
                    <a href="#" target="_blank">
                      <i className={item.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className="copy-right text-center"
            dangerouslySetInnerHTML={{ __html: footerdata.copyrighttext }}
          ></div>
        </div>
      </footer>
    );
  }
}

export default Footer_v1;
