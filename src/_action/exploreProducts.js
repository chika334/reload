import { EXPLORE_BUTTON, REMOVE_EXPLORE } from "./types";

// export const exportButton = (image, title) => {
//   return {
//     type: EXPLORE_BUTTON,
//     payload: { image, title },
//   };
// };

export const exportButton = (image, title) => (dispatch) => {
  dispatch({
    type: EXPLORE_BUTTON,
    payload: { image, title },
  });
};

export const removeExplore = () => {
  return {
    type: REMOVE_EXPLORE,
  };
};
