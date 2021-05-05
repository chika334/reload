import React, { Component } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

class Property extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imagealt = "image";
    let data = sectiondata.property;

    return (
      <div className="property-area pd-top-100">
        <div className="container">
          <div className="row custom-gutter">
            <div className="col-lg-12">
              <div className="property-filter-menu-wrap">
                <div className="property-filter-menu portfolio-filter text-center">
                  <button data-filter="*" className="active">
                    All Properties
                  </button>
                  <button data-filter=".cat1">Electric</button>
                  <button data-filter=".cat2">Cable</button>
                  <button data-filter=".cat3">Airtime</button>
                  <button data-filter=".cat4">Data</button>
                </div>
              </div>
            </div>
          </div>
          {/*Property filter Start*/}
          <div className="property-filter-area row custom-gutter">
            <div className="gallery-sizer col-1" />
            {data.items.map((item, i) => (
              <div
                key={i}
                className={"rld-filter-item  col-lg-3 col-sm-6 " + item.cat}
              >
                <div className="single-feature">
                  <div className="d-flex align-items-center justify-content-center">
                    <img
                      src={publicUrl + item.icon}
                      style={{ width: "80%" }}
                      alt="img"
                    />
                  </div>
                  <div className="details">
                    <h3 className="author text-center">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Property;
