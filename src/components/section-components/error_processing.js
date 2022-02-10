import { Component } from "react";
import { Link } from "react-router-dom";

class Error_processing extends Component {
  render() {
    return (
      <div>
        <div className="error-page text-center">
          <div className="container">
            <div className="error-page-wrap d-inline-block">
              <Link to={`/${process.env.REACT_APP_RELOADNG}`}>Go Back</Link>
              {/* <h2>404</h2> */}
              <br />
              <div>
                  <p>SOMETHING WENT WRONG WHILE PROCESSING YOUR TRANSACTION</p>
                  <p>PLEASE CONTACT OUR CUSTOMER CARE VIA EMAIL</p>
                  <br />
                  <p>support@reload.ng or call 08035001523</p>
                  <p>you can also send us message via our live chat, Thank you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Error_processing;
