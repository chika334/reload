import React from "react";
import "rodal/lib/rodal.css";
import Modal from "react-modal";
var customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#realdeal");
var App = function (_a) {
  var visible = _a.visible,
    toggle = _a.toggle,
    children = _a.children;
  return React.createElement(
    "div",
    null,
    React.createElement(
      Modal,
      {
        isOpen: visible,
        //onAfterOpen={afterOpenModal}
        onRequestClose: toggle,
        style: customStyles,
        contentLabel: "Example Modal",
      },
      children
    )
  );
};
export default App;
//# sourceMappingURL=Modal.js.map
