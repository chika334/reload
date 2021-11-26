import { Button } from "@material-ui/core";
import React from "react";

export default function LoanStatus(props) {
  const [message, setMessage] = React.useState(null);
  const [header, setHeader] = React.useState(null);

  React.useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const message = params.get("message");
    const headers = params.get("header");
    setMessage(message);
    setHeader(headers);
  }, [props.location]);

  const handleBack = () => {
    window.location.href = `/${process.env.REACT_APP_RELOADNG}/products`;
  };

  return (
    <div className="pd-bottom-100">
      <div className="d-flex justify-content-center">
        <div className="container mt-5 pd-top-100 text-center">
          <Button
            onClick={handleBack}
            style={{
              backgroundColor: "#fda94f",
              color: "#000",
              padding: "10px",
            }}
          >
            Go Back
          </Button>
          <h3
            className={`${
              header === "Error Message" ? "text-danger" : "text-success"
            }`}
          >
            {header === "Success Message" ? "Congratulations!" : header}
          </h3>
          <p>{header === "Success Message" ? "Your loan request has been approved, you should be credited shortly" : message}</p>
        </div>
      </div>
    </div>
  );
}
