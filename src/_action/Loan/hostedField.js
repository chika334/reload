const { HOSTED_FIELD } = "../types.js";

export const hostedField = (value) => (dispatch) => {
  dispatch({
    type: HOSTED_FIELD,
    payload: { value },
  });
};
