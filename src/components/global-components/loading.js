import React, { useEffect } from "react";
import { useSelector, connect } from "react-redux";
// import "../../css/preloader.css";

export default function Loading() {
  const loading = useSelector((state) => state.loading.loading);

  // console.log(loading);
  return (
    <div>
      {loading && (
        <div className="preloader" id="preloader">
          <div className="preloader-inner">
            <div className="spinner">
              <div className="dot1"></div>
              <div className="dot2"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
