// import axios from "axios";
// import { FLUTTER } from "../types";

// export const finalPayment = (ref) => (getState, dispatch) => {
//   axios
//     .post(`localhost:8000/api/flutterwave`, ref, secondTokenConfig(getState))
//     .then((res) =>
//       dispatch({
//         type: FLUTTER,
//         payload: res.data,
//       })
//     )
//     .catch((err) => {
//       dispatch(
//         returnErrors(err.response, err.response.status, "FLUTTER_ERROR")
//       );
//       dispatch({
//         type: FLUTTER_ERROR,
//         payload: err.response,
//       });
//     });
// };
