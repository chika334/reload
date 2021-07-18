import React, { Component } from "react";
// import sectiondata from "../../data/sections.json";
import { partner } from "../../data/partner";
import parse from "html-react-parser";

class OurPartner extends Component {
  render() {
    return (
      <div className="client-area pd-top-92 pd-bottom-100">
        <div className="container">
          <div className="section-title text-center">
            <h2 className="title">{partner.title}</h2>
          </div>
          <div className="rows">
            <div className="columns client-slider">
              {partner.items.map((item, i) => (
                <div key={i} className="item">
                  <div className="thumb vl">
                    <img
                      src={item.image}
                      style={{
                        filter: "grayscale(100%)",
                        height: "30px",
                        display: "fixed",
                      }}
                      width="30"
                      alt="client"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OurPartner;
