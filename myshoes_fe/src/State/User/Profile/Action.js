// import { api } from "../../../Config/apiConfig";
// import {
//   UPDATE_USER_FAILURE,
//   UPDATE_USER_REQUEST,
//   UPDATE_USER_SUCCESS,
// } from "./ActionType";

// export const updateProfile = (reqData) => (dispatch) => {
//   dispatch({ type: UPDATE_USER_REQUEST });
//   try {
//     const data = api.put("/users/profile/update", reqData);
//     dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
//   }
// };
