import React, { Component } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import meeting from '../../images/meeting.jpg'

class AboutUs extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imagealt = "image";
    let data = sectiondata.aboutus;

    return (
      <div className="about-area pd-bottom-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="shape-image-list-wrap">
                <div className="shape-image-list left-top">
                  <img
                    className="shadow-img"
                    src={meeting}
                    alt={imagealt}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 align-self-center">
              <div className="section-title pd-left mb-0">
                <h5 className="sub-title">{data.subtitle}</h5>
                <p>{data.content}</p>
                <p>{data.secondContent}</p>
                <p>{data.thirdContent}</p>
                <p>{data.fourthContent}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;
