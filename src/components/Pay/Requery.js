import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requery } from "../../_action/requery";
import { useHistory } from "react-router-dom";

export default function Requery(props) {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const requeryData = useSelector((state) => state.reloadReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const [pay, setPay] = useState(false);

  const params = new URLSearchParams(props.location.search);

  useEffect(() => {
    const productKey = params.get("transRef");

    const value = {
      transRef: productKey,
    };

    dispatch(requery(value));
  }, [props.location]);

  useEffect(() => {
    if (requeryData.requerySuccess === true) {
      setLoading(false);
      history.push({
        pathname: `/${process.env.REACT_APP_RELOADNG}/requery/receipt`,
        // search: `?query=abc`,
        state: { data: props.location, pay },
      });
    }
  }, [requeryData.requerySuccess === true]);

  return (
    <div className="pd-top-100 pd-bottom-90 d-flex justify-content-center">
      <div className="property-details-area">
        {loading === true ? (
          <div className="preloader" id="preloader">
            <div className="preloader-inner">
              <div className="spinner">
                <div className="dot1"></div>
                <div className="dot2"></div>
              </div>
            </div>
          </div>
        ) : (
          <h2 className="text-center">Requery in progress</h2>
        )}
      </div>
    </div>
  );
}
