import {
  CANCELED_ORDERS_FAILURE,
  CANCELED_ORDERS_REQUEST,
  CANCELED_ORDERS_SUCCESS,
  CONFIRMED_ORDERS_FAILURE,
  CONFIRMED_ORDERS_REQUEST,
  CONFIRMED_ORDERS_SUCCESS,
  DELETE_ORDERS_FAILURE,
  DELETE_ORDERS_REQUEST,
  DELETE_ORDERS_SUCCESS,
  DELIVERED_ORDERS_FAILURE,
  DELIVERED_ORDERS_REQUEST,
  DELIVERED_ORDERS_SUCCESS,
  FIND_ORDERS_STATUS_FAILURE,
  FIND_ORDERS_STATUS_REQUEST,
  FIND_ORDERS_STATUS_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  PLACED_ORDERS_FAILURE,
  PLACED_ORDERS_REQUEST,
  PLACED_ORDERS_SUCCESS,
  SHIPPED_ORDERS_FAILURE,
  SHIPPED_ORDERS_REQUEST,
  SHIPPED_ORDERS_SUCCESS,
} from "./ActionType";

const initialState = {
  loading: false,
  orders: [],
  error: "",
};

export const adminOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return { ...state, loading: true };
    case GET_ORDERS_SUCCESS:
    case FIND_ORDERS_STATUS_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case FIND_ORDERS_STATUS_FAILURE:
    case GET_ORDERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case PLACED_ORDERS_REQUEST:
    case CONFIRMED_ORDERS_REQUEST:
    case SHIPPED_ORDERS_REQUEST:
    case DELIVERED_ORDERS_REQUEST:
    case CANCELED_ORDERS_REQUEST:
    case FIND_ORDERS_STATUS_REQUEST:
      return { ...state, loading: true };
    case PLACED_ORDERS_SUCCESS:
      return { ...state, placed: action.payload, loading: false };
    case CONFIRMED_ORDERS_SUCCESS:
      return { ...state, confirmed: action.payload, loading: false };
    case SHIPPED_ORDERS_SUCCESS:
      return { ...state, shipped: action.payload, loading: false };
    case DELIVERED_ORDERS_SUCCESS:
      return { ...state, delivered: action.payload, loading: false };
    case CANCELED_ORDERS_SUCCESS:
      return { ...state, canceled: action.payload, loading: false };
    case CONFIRMED_ORDERS_FAILURE:
    case PLACED_ORDERS_FAILURE:
    case SHIPPED_ORDERS_FAILURE:
    case DELIVERED_ORDERS_FAILURE:
    case CANCELED_ORDERS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case DELETE_ORDERS_REQUEST:
      return { ...state, loading: true };
    case DELETE_ORDERS_SUCCESS:
      return { ...state, loading: false, deletedOrder: action.payload };
    case DELETE_ORDERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
