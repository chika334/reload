import React, { Component } from "react";
import parse from "html-react-parser";
import { Card, CardContent } from "@material-ui/core";

class Help extends Component {
  render() {
    return (
      <div className="user-list-area pd-top-100 pd-bottom-70">
        <div className="container">
          <div className="row">
            <Card>
              <CardContent>
                <p>help@reload.ng to log complaints</p>
                <p>
                  help@reload.ng to log unauthorised login to clients reload.ng
                  accounts reported by client either due to loss of device etc.
                </p>
                <p>help@reload.ng to communicated changes, notices etc.</p>
                <p>support@reload.ng to report failed transactions.</p>
                <p>
                  privacy@reload.ng for communicating issues surrounding privacy
                  policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Help;
