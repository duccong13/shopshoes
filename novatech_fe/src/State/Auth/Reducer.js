import {
  GET_ALL_USER_FAILURE,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_STATUS_FAILURE,
  UPDATE_STATUS_REQUEST,
  UPDATE_STATUS_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "./ActionType";

const init = {
  users: [],
  user: null,
  loading: false,
  error: null,
  jwt: null,
  role: null,
};

export const authReducer = (state = init, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_ALL_USER_REQUEST:
    case GET_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case UPDATE_STATUS_REQUEST:
      return { ...state, loading: true, error: null };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, loading: false, jwt: action.payload, error: null };
    case GET_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case GET_ALL_USER_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case UPDATE_USER_SUCCESS:
    case UPDATE_STATUS_SUCCESS:
        return { ...state, loading: false, user: action.payload };
    case UPDATE_USER_FAILURE:
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_ALL_USER_FAILURE:
    case GET_USER_FAILURE:
    case UPDATE_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return {...init};
    default:
      return state;
  }
};
