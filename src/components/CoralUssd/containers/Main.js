import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal, ModalTransition } from "react-simple-hook-modal";
import Footer from "./Footer";
import InfoBoard from "./InfoBoard";
import MessageBoard from "./MessageBoard";
import "react-typewriting-effect/dist/index.css";
import Select from "./Select/Select";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Main = function (_a) {
    var isModalOpen = _a.isModalOpen, openModal = _a.openModal, closeModal = _a.closeModal, value = _a.value, toggle = _a.toggle, message = _a.message, setStart = _a.setStart, queryData = _a.queryData, response = _a.response, start = _a.start, result = _a.result, toggleModal = _a.toggleModal;
    var style = { color: "orange", marginTop: "10px", border: " 0.2px dashed" };
    return (_jsx("div", { children: _jsxs(Modal, __assign({ id: "any-unique-identifier", isOpen: isModalOpen, transition: ModalTransition.BOTTOM_UP }, { children: [_jsx("div", __assign({ style: {
                        position: "relative",
                        textAlign: "end",
                    } }, { children: _jsx("button", __assign({ onClick: closeModal }, { children: "Close " }), void 0) }), void 0),
                _jsxs("div", __assign({ style: { minHeight: "400px" } }, { children: [_jsx(MessageBoard, { response: response, value: value }, void 0),
                        _jsx("div", { style: { marginBottom: "10px" } }, void 0),
                        _jsx(Select, { value: value, toggle: toggle }, void 0),
                        _jsx("hr", { style: style }, void 0),
                        _jsx(InfoBoard, { heading: "Transaction Id", value: (response === null || response === void 0 ? void 0 : response.TransactionID) || "" }, void 0),
                        _jsx("hr", { style: style }, void 0),
                        _jsx(InfoBoard, { heading: "Amount", value: "N " + ((response === null || response === void 0 ? void 0 : response.Amount) || 0) }, void 0),
                        _jsx("hr", { style: style }, void 0),
                        _jsx("div", __assign({ style: { textAlign: "center" } }, { children: (result === null || result === void 0 ? void 0 : result.responseCode) === "00" ? (_jsx("span", __assign({ style: { color: "#ff0000" } }, { children: message }), void 0)) : (_jsx("span", __assign({ style: { color: "#ff0000" } }, { children: message }), void 0)) }), void 0)] }), void 0),
                _jsx(Footer, { setStart: setStart, start: start }, void 0)] }), void 0) }, void 0));
};
export default Main;
//# sourceMappingURL=Main.js.map