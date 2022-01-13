import React, { Component } from "react";
// import sectiondata from "../../data/sections.json";
import { faq } from "../../data/faq";
import parse from "html-react-parser";

class Process extends Component {
  render() {
    return (
      <div className="faq-area pd-top-100 pd-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="section-title">
                <h2
                  className="title"
                  dangerouslySetInnerHTML={{ __html: faq.title }}
                ></h2>
                <p>{faq.content}</p>
              </div>
              <div className="accordion" id="accordion">
                {/* single accordion */}
                <h5>{faq.subtitle}</h5>
                {faq.items.map((item, i) => (
                  <div key={i} className="single-accordion card">
                    <div className="card-header" id={"headingOne" + i}>
                      <h2 className="mb-0">
                        <button
                          className="btn-link"
                          type="button"
                          data-toggle="collapse"
                          data-target={"#collapseOne" + i}
                          aria-expanded="true"
                          aria-controls={"collapseOne" + i}
                        >
                          <p>Question:</p>{item.title}
                        </button>
                      </h2>
                    </div>
                    <div
                      id={"collapseOne" + i}
                      className={"collapse " + item.class}
                      aria-labelledby={"headingOne" + i}
                      data-parent="#accordion"
                    >
                      <p className="card-body">{item.content}</p>
                      <p className="card-body">{item.content1}</p>
                      <p className="card-body">{item.content2}</p>
                      <p className="card-body">{item.content3}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-xl-5 col-lg-6 offset-xl-1">
              <div className="shape-image-list-wrap">
                <div className="shape-image-list left-top">
                  <img src={faq.image} alt="faq" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Process;
