import React from 'react';
import { useModal } from "react-simple-hook-modal";
export var useUSSD = function () {
    var ussdRef = React.useRef();
    var _a = useModal(), closeModal = _a.closeModal, openModal = _a.openModal, isModalOpen = _a.isModalOpen;
    React.useEffect(function () {
        ussdRef.current = true;
        return function () {
            ussdRef.current = false;
        };
    }, []);
    var toggleIt = function () {
        if (isModalOpen) {
            closeModal();
        }
        else {
            openModal();
        }
    };
    return { isModalOpen: isModalOpen, toggleIt: toggleIt };
};
//# sourceMappingURL=useToggle.js.map