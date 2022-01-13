// import { EXPLORE_BUTTON } from "../_action/types";

// const initialState = {
//   productDisplay: false,
//   title: null,
//   image: null,
// };

// const exploreProducts = (state = initialState, action) => {
//   switch (action.type) {
//     case EXPLORE_BUTTON:
//       if (action.payload.title === "Ikeja Electric Distribution Company") {
//         return {
//           ...state,
//           productDisplay: true,
//           // title: action.payload.title,
//           // image: action.payload.image,
//           title: localStorage.getItem("dataTitle"),
//           image: localStorage.getItem("dataImage"),
//         };
//       }
//     case EXPLORE_BUTTON:
//       if (action.payload.title === "Eko Electric Distribution Company") {
//         return {
//           ...state,
//           productDisplay: true,
//           // title: action.payload.title,
//           // image: action.payload.image,
//           title: localStorage.getItem("dataTitle"),
//           image: localStorage.getItem("dataImage"),
//         };
//       }
//     // case 'assets/img/DStv-Logoso.jpg':
//     //   return {
//     //     ...state,
//     //     image: 'assets/img/DStv-Logoso.jpg',
//     //   }
//     // case HIDE_LOADER:
//     //   return {
//     //     ...state,
//     //     loading: false,
//     //   }
//     default:
//       return state;
//   }
// };

// export default exploreProducts;
