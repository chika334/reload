import {
  PRODUCT_LOADING,
  PRODUCT_LOADED,
  PRODUCT_FAIL,
  GET_PRODUCT_FAIL,
  CLEAR_PRODUCTS,
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
      return {
        ...state,
        isLoading: true,
      };
    case PRODUCT_LOADED:
      return {
        ...state,
        isLoading: false,
        listProducts: action.payload,
      };
    case CLEAR_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        listProducts: null,
        catData: null,
        cat1: [],
        cat2: [],
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
