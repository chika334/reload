import React, { useState } from "react";
import Banner from "./banner";

const defaultOptions = [];
for (let i = 0; i < 10; i++) {
  defaultOptions.push(`option ${i}`);
  defaultOptions.push(`suggesstion ${i}`);
  defaultOptions.push(`advice ${i}`);
}

export function ExportBanner() {
  const [options, setOptions] = useState([]);
  const onInputChange = (event) => {
    setOptions(
      defaultOptions.filter((option) => option.includes(event.target.value))
    );
  };
  return (
    <div className="App mt-2 mb-3">
      {/* <Banner options={options} onInputChange={onInputChange} /> */}
      {/* <button className="btn btn-primary">Search</button> */}
      <br />
    </div>
  );
}

export default ExportBanner;
