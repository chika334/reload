import React, { Component } from "react";
import sectiondata from "../../data/sections.json";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@material-ui/core";
import { connect, useSelector } from "react-redux";

function RecentProperties() {
  const getProducts = useSelector((state) => state.products);
  // let publicUrl = process.env.PUBLIC_URL + "/";
  // let imagealt = "image";
  let data = sectiondata.recentproperties;

  return (
    <div className="properties-area pd-top-92">
      <div className="container">
        <div className="section-title">
          <h2 className="title">Our Other Products</h2>
          <Link className="btn-view-all" to="/products">
            View All
          </Link>
        </div>
        <div className="row">
          {getProducts.listProducts === null
            ? ""
            : getProducts.listProducts
                .filter((item) => [12, 15, 21, 23, 32].includes(item.id))
                .map((listData, i) => (
                  <div key={i} className="col-sm-3 col-md-3 col-lg-3">
                    <div className="single-feature">
                      <div className="thumb" style={{ textAlign: "center" }}>
                        <img
                          src={listData.logoUrl}
                          style={{
                            width: 100,
                            textAlign: "center",
                            height: 100,
                          }}
                          alt="img"
                        />
                      </div>
                      <div className="details">
                        <h3 className="author text-center">{listData.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
        </div>
      </div>
    </div>
  );
}

export default RecentProperties;
