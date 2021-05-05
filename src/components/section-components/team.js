import React, { Component } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";

class Team extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imagealt = "image";
    let data = sectiondata.team;

    return (
      <div className="team-area bg-gray mg-top-70 pd-top-90 pd-bottom-70">
        <div className="container">
          <div className="section-title text-center">
            <h2 className="title">{data.title}</h2>
          </div>
          <div className="row">
            {data.items.map((item, i) => (
              <div key={i} className="col-lg-3 col-sm-6">
                <div className="single-team">
                  <div className="thumb">
                    <img
                      src={publicUrl + item.image}
                      style={{ width: "100%", height: "30vh" }}
                      alt="team"
                    />
                  </div>
                  <div className="team-details">
                    <h4>{item.name}</h4>
                    <span>{item.designation}</span>
                    <ul>
                      {item.social.map((social, i) => (
                        <li key={i}>
                          <a href={social.url}>
                            <i className={social.icon} />
                          </a>
                        </li>
                      ))}
                    </ul>
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

export default Team;
