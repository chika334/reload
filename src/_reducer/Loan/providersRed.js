import { INTERSWITCH_PROVIDER, PROVIDERS_LOADING } from "../../_action/types";

const initialState = {
  loading: false,
  success: false,
  providers: null,
};

const Providers = (state = initialState, action) => {
  switch (action.type) {
    case PROVIDERS_LOADING:
      return {
        ...state,
      };
    case INTERSWITCH_PROVIDER:
      return {
        ...state,
        loading: false,
        success: true,
        providers: action.payload,
      };
    default:
      return state;
  }
};

export default Providers;
