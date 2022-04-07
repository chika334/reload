import { PRODUCTLIST, PRODUCTLIST_error } from "../_action/types";

const initialState = {
  isLoading: false,
  ProductList: null,
  loaded: false,
  catData: null,
  cat1: [],
  cat2: [],
};

const productList = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTLIST:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        ProductList: action.payload,
      };
    case PRODUCTLIST_error:
      return {
        ...state,
        isLoading: false,
        ProductList: null,
        loaded: false,
      };
    default:
      return state;
  }
};

export default productList;
