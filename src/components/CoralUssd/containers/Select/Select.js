import { jsx as _jsx } from "react/jsx-runtime";
import Select from "react-select";
import data from "./data.json";
var SelectInput = function (_a) {
    var value = _a.value, toggle = _a.toggle;
    return (_jsx(Select, { value: value, onChange: toggle, name: "Banks...", placeholder: "Banks...", className: "basic-single", classNamePrefix: "select", options: data, defaultValue: data[0] }, void 0));
};
export default SelectInput;
//# sourceMappingURL=Select.js.map