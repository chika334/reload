import React, { Component } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";

class OurPartner extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imagealt = "image";
    let data = sectiondata.partner;

    return (
      <div className="client-area pd-top-92 pd-bottom-100">
        <div className="container">
          <div className="section-title text-center">
            <h2 className="title">{data.title}</h2>
          </div>
          <div className="client-slider">
            {data.items.map((item, i) => (
              <div key={i} className="item">
                <div className="thumb vl">
                  <img
                    src={publicUrl + item.image}
                    style={{ filter: "grayscale(100%)", height: "5vh" }}
                    width="30"
                    alt="client"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default OurPartner;
