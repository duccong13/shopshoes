import {
  CREATE_ADDRESS_FAILURE,
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  GET_ADDRESS_FAILURE,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
} from "./ActionType";

const init = {
  addresses: [],
  address: null,
  loading: false,
  error: null,
};

export const addressReducer = (state = init, action) => {
  switch (action.type) {
    case CREATE_ADDRESS_REQUEST:
    case UPDATE_ADDRESS_REQUEST:
    case DELETE_ADDRESS_REQUEST:
    case GET_ADDRESS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ADDRESS_SUCCESS:
      return {...state, loading: false, addresses: action.payload}
    case CREATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        address: action.payload,
        error: null,
      };
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        updateAddresses: action.payload,
        error: null,
      };
    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteAddresses: action.payload,
        error: null,
      };
    case CREATE_ADDRESS_FAILURE:
    case UPDATE_ADDRESS_FAILURE:
    case DELETE_ADDRESS_FAILURE:
    case GET_ADDRESS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
