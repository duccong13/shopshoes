import {
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCTS_BY_NAME_FAILURE,
  GET_PRODUCTS_BY_NAME_REQUEST,
  GET_PRODUCTS_BY_NAME_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
} from "./ActionType";

const inti = {
  products: [],
  product: null,
  searchproducts: [],
  loading: false,
  error: null,
};

export const userProductReducer = (state = inti, action) => {
  switch (action.type) {
    case FIND_PRODUCT_BY_ID_REQUEST:
    case FIND_PRODUCTS_REQUEST:
    case GET_PRODUCTS_REQUEST:
    case GET_PRODUCTS_BY_NAME_REQUEST:
      return { ...state, loading: true, error: null };
    case FIND_PRODUCTS_SUCCESS:
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };
    case GET_PRODUCTS_BY_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        searchproducts: action.payload,
        error: null,
      };
    case FIND_PRODUCT_BY_ID_SUCCESS:
      return { ...state, loading: false, product: action.payload, error: null };
    case GET_PRODUCTS_FAILURE:
    case FIND_PRODUCTS_FAILURE:
    case FIND_PRODUCT_BY_ID_FAILURE:
    case GET_PRODUCTS_BY_NAME_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
