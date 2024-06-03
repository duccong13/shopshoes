// import {
//   UPDATE_USER_FAILURE,
//   UPDATE_USER_REQUEST,
//   UPDATE_USER_SUCCESS,
// } from "./ActionType";

// const init = {
//   user: null,
//   loading: false,
//   error: null,
// };

// export const profileReducer = (state = init, action) => {
//   switch (action.type) {
//     case UPDATE_USER_REQUEST:
//       return { ...state, loading: true, error: null };
//     case UPDATE_USER_SUCCESS:
//       return { ...state, loading: false, user: action.payload };
//     case UPDATE_USER_FAILURE:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
