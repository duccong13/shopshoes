import axios from "axios";
import { API_BASE_URL, api } from "../../Config/apiConfig";
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

export const register = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, reqData);
    const user = response.data;
    if (user.result.token) {
      localStorage.setItem("jwt", user.result.token);
      dispatch({ type: REGISTER_SUCCESS, payload: user });
    }
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
  }
};

export const login = (reqData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, reqData);
    const user = response.data;
    if (user.result.token) {
      localStorage.setItem("jwt", user.result.token);
      dispatch({ type: LOGIN_SUCCESS, payload: user });
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const res = await fetch(`${API_BASE_URL}/users/profile`, {
      method:"GET",
      headers:{
      'Authorization': `Bearer ${jwt}`,
        'Content-Type': "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // Đảm bảo phản hồi có nội dung
    const text = await res.text();
    if (!text) {
      throw new Error("Empty response");
    }

    // Chuyển đổi văn bản thành JSON
    const data = JSON.parse(text);
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error.message });
  }
};

export const getAllUser = () => async (dispatch) => {
  dispatch({ type: GET_ALL_USER_REQUEST });
  try {
    const data = await axios.get(`${API_BASE_URL}/users`);
    dispatch({ type: GET_ALL_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_USER_FAILURE, payload: error.message });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });
  localStorage.clear();
  window.location.href = 'http://localhost:5173'
};

export const updateProfile = (reqData) => async (dispatch) => {
  console.log("Data",reqData)
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const {data} = await api.put("/users/profile/update", reqData);
    // console.log(data)
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
    // toast.success('🦄 Cập nhật thông tin thành công!');
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
  }
};

export const updateStatus = () => async (dispatch) => {
  dispatch({ type: UPDATE_STATUS_REQUEST });
  try {
    const {data} = await api.put("/users/profile/update/status");
    // console.log("Data",data)
    dispatch({ type: UPDATE_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_STATUS_FAILURE, payload: error.message });
  }
};


