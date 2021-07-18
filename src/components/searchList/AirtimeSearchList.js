import React from "react";
import { connect, useSelector } from "react-redux";
import { TextField, Button } from "@material-ui/core";

export default function Airtime() {
  const getProducts = useSelector((state) => state.products);

  console.log(getProducts);
  return (
    <div>
      {getProducts.listProducts === null
        ? ""
        : getProducts.listProducts
            .filter((item) => [15, 16, 17, 18].includes(item.id))
            .map((listData, i) => (
              <div className="single-feature style-two">
                <div className="thumb">
                  <img src={listData.logoUrl} alt="img" />
                </div>
                <div className="details">
                  <div className="details-wrap">
                    <p className="author">
                      <i className="fa fa-user" /> {listData.id}
                    </p>
                    <h6 className="title readeal-top">{listData.title}</h6>
                    <TextField
                      className="mb-3"
                      fullWidth
                      id="filled-basic"
                      label="Email"
                      variant="filled"
                    />
                    <TextField
                      fullWidth
                      id="filled-basic"
                      label="Phone Number"
                      variant="filled"
                    />
                    <div className="d-flex align-item-center justify-content-center">
                      <Button
                        onClick={(e) =>
                          handlePay(e, {
                            productName: listData.title,
                          })
                        }
                        style={{
                          backgroundColor: "#FDC902",
                          fontSize: "12px",
                          padding: "10px",
                        }}
                      >
                        Pay
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
    </div>
  );
}
