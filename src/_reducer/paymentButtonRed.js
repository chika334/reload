import { BUTTON_CLICKED } from "../_action/types.js";
// import { FIELD_SET } from "../_action/Payment/paymentButtons";


const initialState = {
  name: "",
  onclick: false,
  // labels: [],
};
// const fieldSel = (key, data) => {
//   switch (key) {
//     case "airtel-data":
//       return (labels = JSON.parse(data).field2.options);

//     case "glo-data":
//       return (labels = JSON.parse(data));

//     default:
//       return null;
//   }
// };

function paymentButton(state = initialState, action) {
  switch (action.type) {
    case BUTTON_CLICKED:
      return {
        name: action.payload.name,
        onclick: action.payload.onclick,
      };
    // case FIELD_SET:
    //   return {
    //     ...state,
    //     labels: fieldSel(action.key, action.data),
    //   };
    default:
      return state;
  }
}

export default paymentButton;
