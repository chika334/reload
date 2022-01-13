import React, { useRef, useEffect } from "react";

function useOutsideAlerter(ref, props) {
  useEffect(() => {
    
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        props.handleClearSearch(false);
        console.log(props);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props);

  return <div ref={wrapperRef}>{props.children}</div>;
}
