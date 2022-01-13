import {
  PRODUCT_LOADING,
  PRODUCT_LOADED,
  PRODUCT_FAIL,
  // GET_PRODUCTBYID_LOADING,
  // GET_PRODUCT_BYID,
  GET_PRODUCT_FAIL,
} from "../_action/types";

const initialState = {
  isLoading: false,
  listProducts: null,
  catData: null,
  cat1: [],
  cat2: [],
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LOADING:
      // case GET_PRODUCTBYID_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case PRODUCT_LOADED:
      // case GET_PRODUCT_BYID:
      return {
        ...state,
        isLoading: false,
        listProducts: action.payload,
      };
    case PRODUCT_FAIL:
    case GET_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        listProducts: null,
      };
    default:
      return state;
  }
};

export default products;
