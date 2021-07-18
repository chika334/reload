import React from "react";
import Navbar from "./global-components/navbar";
import PageHeader from "./global-components/page-header";
import FaqSection from "./section-components/faq";
import Footer from "./global-components/footer";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <PageHeader headertitle="Contact" />
      <div className="contact-area pd-top-100 pd-bottom-65">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="contact-page-map">
                {/* <iframe
                  className="w-100"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d60021.82409444856!2d-122.40118071595978!3d37.7546723469594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1577786376747!5m2!1sen!2sbd"
                  style={{ border: 0 }}
                  allowFullScreen
                /> */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.616843371345!2d7.026638014135285!3d4.835670841820404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cdbff089160f%3A0x5d5c8b9d5cdecd86!2s42%20Old%20Aba%20Rd%2C%20Rumuola%2C%20Port%20Harcourt!5e0!3m2!1sen!2sng!4v1624004172286!5m2!1sen!2sng"
                  // width="600"
                  // height="450"
                  className="w-100"
                  style={{ border: 0 }}
                  allowfullscreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            <div className="col-lg-4">
              <form className="contact-form-wrap contact-form-bg">
                <h4>Contact Now</h4>
                <div className="rld-single-input">
                  <input type="text" placeholder="Name" />
                </div>
                <div className="rld-single-input">
                  <input type="text" placeholder="Phone" />
                </div>
                <div className="rld-single-input">
                  <input type="text" placeholder="Phone" />
                </div>
                <div className="rld-single-input">
                  <textarea rows={10} placeholder="Message" defaultValue={""} />
                </div>
                <div className="btn-wrap text-center">
                  <Button
                    style={{
                      backgroundColor: "#fda94f",
                      color: "#000",
                      fontSize: "11px",
                      padding: "10px",
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="row pd-top-92">
            <div className="col-xl-3 col-sm-6">
              <div className="single-contact-info">
                <p>
                  <i className="fa fa-phone" />
                  Call Us:
                </p>
                <h5>08035001523</h5>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="single-contact-info">
                <p>
                  <i className="fa fa-envelope" />
                  Have any Question?
                </p>
                <h5>support@reload.ng</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
