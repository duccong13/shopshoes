import {
  CREATE_REVIEW_FAILURE,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  GET_REVIEW_FAILURE,
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
  UPDATE_REVIEW_FAILURE,
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
} from "./ActionType";

const init = {
  reviews: [],
  review: null,
  loading: false,
  error: null,
};

export const reviewReducer = (state = init, action) => {
  switch (action.type) {
    case GET_REVIEW_REQUEST:
    case CREATE_REVIEW_REQUEST:
    case UPDATE_REVIEW_REQUEST:
    case DELETE_REVIEW_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_REVIEW_SUCCESS:
      return { ...state, loading: false, reviews: action.payload, error: null };
    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        review: action.payload,
        error: null,
      };
    case UPDATE_REVIEW_SUCCESS:
      return { ...state, loading: false, updateReviews: action.payload };
    case DELETE_REVIEW_SUCCESS:
      return { ...state, loading: false, deleteReviews: action.payload };
    case GET_REVIEW_FAILURE:
    case CREATE_REVIEW_FAILURE:
    case UPDATE_REVIEW_FAILURE:
    case DELETE_REVIEW_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
